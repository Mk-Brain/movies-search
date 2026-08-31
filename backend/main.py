from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

from model.Movie import Movie
from database.database import Base, engine, SessionLocal

from function.importdata import update_popular_movies_job
from fastapi.middleware.cors import CORSMiddleware
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
    "http://localhost:5173",  # Port par défaut de Vite / React en dev
    "http://127.0.0.1:5173",
    # "https://mon-app.vercel.app",  # Ajoutez l'URL de prod de votre front ici
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
    # Retourne uniquement le contenu du JSON brut
    return [movie.raw_data for movie in movies]

@app.post("/movies/refresh-now")
async def trigger_refresh():
    # Endpoint manuel pour forcer la mise à jour sans attendre le cron
    await update_popular_movies_job()
    return {"status": "Mise à jour lancée"}