from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from apscheduler.schedulers.asyncio import AsyncIOScheduler


from model.Movie import Movie
from database.database import Base, engine, SessionLocal

from function.importdata import update_popular_movies_job

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

app = FastAPI(title="Popular Movies API", lifespan=lifespan)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/movies/popular")
def get_popular_movies(db: Session = Depends(get_db)):
    # Réponse rapide en lisant directement la BDD locale
    return db.query(Movie).order_by(Movie.rating.desc()).all()

@app.post("/movies/refresh-now")
async def trigger_refresh():
    # Endpoint manuel pour forcer la mise à jour sans attendre le cron
    await update_popular_movies_job()
    return {"status": "Mise à jour lancée"}