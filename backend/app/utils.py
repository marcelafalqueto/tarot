"""
# Etapa 5 - Cria a função 'get_db' que será usada pelas rotas para acessar o banco.
# Define a conexão com o banco de dados e o gerenciador de sessão (SessionLocal).
"""

import os

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/tarot"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
