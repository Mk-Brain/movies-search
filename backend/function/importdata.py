import csv
import gzip
import io
import os
from pathlib import Path
import time
import urllib.request

import httpx
from sqlalchemy.orm import Session
from model.Movie import Movie
from database.database import SessionLocal


BASICS_URL = "https://datasets.imdbws.com/title.basics.tsv.gz"
RATINGS_URL = "https://datasets.imdbws.com/title.ratings.tsv.gz"
OMDB_API_KEY = os.getenv("OMDB_API_KEY")  

TEMP_DIR = Path("./temp_imdb")


def download_file_with_cache(url: str, dest_path: Path, max_age_hours: int = 24):
    """Télécharge le fichier uniquement s'il est absent ou plus vieux que max_age_hours."""
    dest_path.parent.mkdir(parents=True, exist_ok=True)

    # 1. Vérification de l'existence et de l'âge du fichier en cache
    if dest_path.exists():
        file_age_seconds = time.time() - dest_path.stat().st_mtime
        file_age_hours = file_age_seconds / 3600

        if file_age_hours < max_age_hours:
            print(f" Cache utilisé : {dest_path.name} (âgé de {file_age_hours:.1f}h)")
            return

    # 2. Téléchargement si le cache est absent ou périmé
    print(f" Téléchargement en cours : {url}")
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    timeout = httpx.Timeout(60.0, connect=60.0)

    with httpx.Client(timeout=timeout, follow_redirects=True) as client:
        with client.stream("GET", url, headers=headers) as response:
            response.raise_for_status()
            total_bytes = 0
            with open(dest_path, "wb") as out_file:
                for chunk in response.iter_bytes(chunk_size=1024 * 1024):
                    out_file.write(chunk)
                    total_bytes += len(chunk)
                    print(f"Téléchargé : {total_bytes / (1024 * 1024):.1f} Mo...", end="\r")

    print(f"\nTéléchargement terminé : {dest_path.name}")

def fetch_top_imdb_ids(limit: int = 20) -> list[str]:
    basics_file = TEMP_DIR / "title.basics.tsv.gz"
    ratings_file = TEMP_DIR / "title.ratings.tsv.gz"

    # Récupération avec cache de 24 heures (ajustable)
    download_file_with_cache(BASICS_URL, basics_file, max_age_hours=24)
    download_file_with_cache(RATINGS_URL, ratings_file, max_age_hours=24)

    movie_ids = set()

    print("Traitement de title.basics...")
    with gzip.open(basics_file, mode="rt", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="\t")
        for row in reader:
            if (
                row["titleType"] == "movie"
                and row["isAdult"] == "0"
                and row["startYear"].isdigit()
                and int(row["startYear"]) >= 2023
            ):
                movie_ids.add(row["tconst"])

    print("Traitement de title.ratings...")
    candidates = []
    with gzip.open(ratings_file, mode="rt", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="\t")
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
    print(f"Nombre d'IDs récupérés depuis IMDb : {len(imdb_ids)}")
    db: Session = SessionLocal()
    async with httpx.AsyncClient() as client:
        for imdb_id in imdb_ids:
            try:
                resp = await client.get(f"https://www.omdbapi.com/?i={imdb_id}&apikey={OMDB_API_KEY}")
                data = resp.json()

                if data.get("Response") == "True":
                    movie = Movie(imdb_id=imdb_id, raw_data=data)
                    db.merge(movie)
                    db.commit() # Commit à chaque film pour sauvegarder au fur et mésure
                    print(f"✅ Film ajouté : {data.get('Title')}")
                else:
                    print(f"❌ Erreur OMDb pour {imdb_id} : {data.get('Error')}")

            except Exception as e:
                print(f"⚠️ Erreur lors de la récupération de {imdb_id} : {e}")
                db.rollback()
    db.close()
    print("Mise à jour terminée avec succès !")