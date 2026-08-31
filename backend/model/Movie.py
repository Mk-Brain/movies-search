from sqlalchemy import Column, String, JSON

from database.database import Base


class Movie(Base):
    __tablename__ = "movies"

    imdb_id = Column(String, primary_key=True, index=True)
    # Stocke l'intégralité de la réponse OMDb sous forme de JSON
    raw_data = Column(JSON, nullable=False)