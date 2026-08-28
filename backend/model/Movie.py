from datetime import datetime
from sqlalchemy import Column, DateTime, Float, String
from database.database import Base

class Movie(Base):
    __tablename__ = "movies"

    imdb_id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    year = Column(String)
    poster = Column(String)
    rating = Column(Float)
    plot = Column(String)
    updated_at = Column(DateTime, default=datetime.utcnow)