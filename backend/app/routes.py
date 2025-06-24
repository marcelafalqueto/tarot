"""
# Etapa 7 - Define os endpoints (rotas) da API.
# Usa os models (para buscar no banco), os schemas (para formatar resposta) e o get_db (para acesso ao banco).
"""

import random
from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.agno_agent import gerar_leitura_tarot
from app.models import TarotCard
from app.schemas import TarotCardSchema
from app.utils import get_db

router = APIRouter()


@router.get("/cards", response_model=List[TarotCardSchema])
def get_cards(db: Session = Depends(get_db)):
    cards = db.query(TarotCard).all()
    selected_cards = random.sample(cards, 3)
    return selected_cards


@router.get("/leitura", tags=["Tarot"])
def get_leitura_tarot():
    """
    Retorna 3 cartas aleatórias e uma leitura gerada por um agente do Agno.
    """
    return gerar_leitura_tarot()
