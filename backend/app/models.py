"""
# Etapa 1 - Definir os modelos (ORM) do banco de dados com SQLAlchemy
# Este arquivo define a estrutura da tabela 'tarot_cards' no PostgreSQL.
# Usamos o SQLAlchemy ORM para que a estrutura possa ser usada por Python diretamente.
"""

from sqlalchemy import JSON, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class TarotCard(Base):
    """Modelo para representar uma carta de tarô."""

    __tablename__ = "tarot_cards"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    number = Column(String, nullable=True)
    arcana = Column(String, nullable=True)
    suit = Column(String, nullable=True)
    img = Column(String, nullable=True)
    fortune_telling = Column(JSON, nullable=True)
    keywords = Column(JSON, nullable=True)
    meanings = Column(JSON, nullable=True)  # dicionário com "light" e "shadow"
    archetype = Column(String, nullable=True)
    hebrew_alphabet = Column(String, nullable=True)
    numerology = Column(String, nullable=True)
    elemental = Column(String, nullable=True)
    mythical_spiritual = Column(Text, nullable=True)
    questions_to_ask = Column(JSON, nullable=True)
