"""
# Etapa 3 - Script para criar a tabela e popular o banco de dados com os dados do JSON.
# Executa a criação da tabela definida em 'models.py' e insere os dados do arquivo 'tarot.json'.
"""

"""
# Etapa 4 - 
# Esse é um pré-requisito prático. 
Criou o banco no PostgreSQL com comandos SQL.
Conferiu com PgAdmin que os dados foram inseridos corretamente.
"""

import json
import os

from app.models import Base, TarotCard
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# ajuste sua URL do banco de dados conforme necessário
DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/tarot"
)


engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Cria as tabelas
Base.metadata.create_all(engine)

# Carrega o JSON
with open("tarot.json", encoding="utf-8") as f:
    data = json.load(f)

cards = data["cards"]

# Popula o banco
for card_data in cards:
    card = TarotCard(
        name=card_data.get("name"),
        number=card_data.get("number"),
        arcana=card_data.get("arcana"),
        suit=card_data.get("suit"),
        img=card_data.get("img"),
        fortune_telling=card_data.get("fortune_telling"),
        keywords=card_data.get("keywords"),
        meanings=card_data.get("meanings"),
        archetype=card_data.get("Archetype"),
        hebrew_alphabet=card_data.get("Hebrew Alphabet"),
        numerology=card_data.get("Numerology"),
        elemental=card_data.get("Elemental"),
        mythical_spiritual=card_data.get("Mythical/Spiritual"),
        questions_to_ask=card_data.get("Questions to Ask"),
    )
    session.add(card)

session.commit()
session.close()
