import os


import httpx
from sqlalchemy.orm import Session
from model.movie import Movie
from database.database import SessionLocal



TMDB_API_KEY = os.getenv("TMDB_API_KEY")

async def fetch_full_movie_details(client: httpx.AsyncClient, movie_id: int):
    """Récupère la fiche complète d'un film avec son casting et son équipe."""
    url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "fr-FR",
        "append_to_response": "credits"  # Injecte les acteurs et le réalisateur
    }
    response = await client.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    return None

async def refresh_popular_movies_complete(db: Session):
    async with httpx.AsyncClient() as client:
        # 1. Récupérer la liste des films populaires (résumé)
        popular_url = "https://api.themoviedb.org/3/movie/popular"
        resp = await client.get(popular_url, params={"api_key": TMDB_API_KEY, "language": "fr-FR"})
        
        if resp.status_code != 200:
            return []

        results = resp.json().get("results", [])

        print(len(results))
        
        # 2. Pour chaque film, aller chercher la fiche détaillée
        for item in results:
            details = await fetch_full_movie_details(client, item["id"])
            if details:
                movie = Movie(
                    imdb_id=str(details["id"]),
                    raw_data=details  # Stocke l'objet enrichi complet
                )
                db.merge(movie)
        
        db.commit()
        print(f"✅ {len(results)} films complets enregistrés !")

async def update_popular_movies_job():
    print("Début du rafraîchissement des films populaires...")
    db: Session = SessionLocal()
    await refresh_popular_movies_complete(db)