import csv
import gzip
import io
import os
import urllib.request
import httpx
from sqlalchemy.orm import Session
from model.Movie import Movie
from database.database import SessionLocal


BASICS_URL = "https://datasets.imdbws.com/title.basics.tsv.gz"
RATINGS_URL = "https://datasets.imdbws.com/title.ratings.tsv.gz"
OMDB_API_KEY = os.getenv("OMDB_API_KEY")  # À remplacer

def fetch_top_imdb_ids(limit: int = 20) -> list[str]:
    headers = {"User-Agent": "Mozilla/5.0"}
    movie_ids = set()

    # 1. Filtrage basics (films récents)
    req_basics = urllib.request.Request(BASICS_URL, headers=headers)
    with urllib.request.urlopen(req_basics) as response:
        with gzip.GzipFile(fileobj=response) as gz:
            reader = csv.DictReader(io.TextIOWrapper(gz, encoding="utf-8"), delimiter="\t")
            for row in reader:
                if (row["titleType"] == "movie" and row["isAdult"] == "0" 
                    and row["startYear"].isdigit() and int(row["startYear"]) >= 2023):
                    movie_ids.add(row["tconst"])

    # 2. Filtrage ratings (popularité)
    req_ratings = urllib.request.Request(RATINGS_URL, headers=headers)
    candidates = []
    with urllib.request.urlopen(req_ratings) as response:
        with gzip.GzipFile(fileobj=response) as gz:
            reader = csv.DictReader(io.TextIOWrapper(gz, encoding="utf-8"), delimiter="\t")
            for row in reader:
                if row["tconst"] in movie_ids:
                    votes = int(row["numVotes"]) if row["numVotes"].isdigit() else 0
                    if votes >= 10000:
                        candidates.append({"tconst": row["tconst"], "votes": votes})

    candidates.sort(key=lambda x: x["votes"], reverse=True)
    return [c["tconst"] for c in candidates[:limit]]

async def update_popular_movies_job():
    print("Début du rafraîchissement des films populaires...")
    imdb_ids = fetch_top_imdb_ids(limit=20)
    
    db: Session = SessionLocal()
    async with httpx.AsyncClient() as client:
        for imdb_id in imdb_ids:
            resp = await client.get(f"https://www.omdbapi.com/?i={imdb_id}&apikey={OMDB_API_KEY}")
            if resp.status_code == 200:
                data = resp.json()
                if data.get("Response") == "True":
                    movie = Movie(
                        imdb_id=imdb_id,
                        title=data.get("Title"),
                        year=data.get("Year"),
                        poster=data.get("Poster"),
                        rating=float(data.get("imdbRating", 0)) if data.get("imdbRating") != "N/A" else 0.0,
                        plot=data.get("Plot")
                    )
                    db.merge(movie) # Insère ou met à jour si la clé existe déjà
        db.commit()
    db.close()
    print("Mise à jour terminée avec succès !")