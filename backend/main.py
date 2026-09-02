from contextlib import asynccontextmanager
import os
from fastapi import FastAPI, Depends, HTTPException, Query
import httpx
from sqlalchemy.orm import Session
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

from model.movie import Movie
from database.database import Base, engine, SessionLocal

from function.importdata import update_popular_movies_job
from fastapi.middleware.cors import CORSMiddleware


TMDB_API_KEY = os.getenv("TMDB_API_KEY")

# Création des tables SQLite au démarrage
Base.metadata.create_all(bind=engine)

# Initialisation du planificateur d'arrière-plan
scheduler = AsyncIOScheduler()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Exécution automatique une fois par jour à 03:00
    scheduler.add_job(update_popular_movies_job, "cron", hour=3, minute=0)
    scheduler.start()
    yield
    scheduler.shutdown()

origins = [
    "http://localhost:5173",  
    "https://cine-explorer-omega.vercel.app",  
]



app = FastAPI(title="Popular Movies API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Domaines autorisés à faire des requêtes
    allow_credentials=True,           # Autorise l'envoi de cookies / headers d'auth
    allow_methods=["*"],              # Autorise toutes les méthodes HTTP (GET, POST, etc.)
    allow_headers=["*"],              # Autorise tous les en-têtes HTTP
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def check_health():
    return {"message": "bienvenue sur l'api popular movies pour recupér les films les plus populaire selon datasets.imdbws.com"}

@app.get("/movies/popular")
def get_popular_movies(db: Session = Depends(get_db)):
    movies = db.query(Movie).all()
    print(len(movies))
    return [movie.raw_data for movie in movies]

@app.post("/movies/refresh-now")
async def trigger_refresh():
    # Endpoint manuel pour forcer la mise à jour sans attendre le cron
    await update_popular_movies_job()
    return {"status": "Mise à jour lancée"}

@app.get("/movies/search")
async def search_movies(query: str):
    url = "https://api.themoviedb.org/3/search/movie"
    params = {"api_key": TMDB_API_KEY, "query": query, "language": "fr-FR"}
    
    timeout_config = httpx.Timeout(10.0, connect=10.0)

    try:
        async with httpx.AsyncClient(timeout=timeout_config) as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json().get("results", [])

    except httpx.ConnectTimeout:
        # L'API TMDB est inaccessible ou trop lente à répondre
        raise HTTPException(
            status_code=504, 
            detail="Impossible de joindre TMDB : le délai d'attente de connexion a été dépassé."
        )
    except httpx.RequestError as exc:
        # Attrape les autres erreurs réseau (DNS, coupure internet, etc.)
        raise HTTPException(
            status_code=503, 
            detail=f"Erreur réseau lors de la communication avec TMDB: {exc}"
        )