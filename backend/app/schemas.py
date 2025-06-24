"""
# Etapa 6 - Define os modelos de resposta (Pydantic) que a API vai retornar.
# Esses schemas validam os dados e controlam o que é exposto na API.
"""

"""
schemas.py

Este arquivo define os **schemas** Pydantic usados pela API.

Função principal:
-----------------
Os schemas servem para VALIDAR e FORMATAR os dados que entram e saem da API,
garantindo que estão no formato correto, com tipos esperados e que não faltam campos obrigatórios.

Separação de responsabilidades:
-------------------------------
- models.py  => Define o modelo de banco de dados (usado com SQLAlchemy)
- schemas.py => Define o modelo de dados da API (usado com Pydantic)

Por que usar schemas?
---------------------
Validação automática dos dados de entrada (ex: POST/PUT)
Garantia de formato nos dados de saída (ex: GET)
Documentação automática na interface Swagger (FastAPI Docs)
Segurança e limpeza na arquitetura do código

Nota:
-----
Use `orm_mode = True` na classe `Config` para que o Pydantic saiba
como ler os objetos do SQLAlchemy (vindo do banco).
"""


from typing import Dict, List, Optional

from pydantic import BaseModel


class TarotCardSchema(BaseModel):
    id: int
    name: str
    number: Optional[str]
    arcana: Optional[str]
    suit: Optional[str]
    img: Optional[str]
    fortune_telling: Optional[List[str]]
    keywords: Optional[List[str]]
    meanings: Optional[Dict[str, List[str]]]
    archetype: Optional[str]
    hebrew_alphabet: Optional[str]
    numerology: Optional[str]
    elemental: Optional[str]
    mythical_spiritual: Optional[str]
    questions_to_ask: Optional[List[str]]

    class Config:
        orm_mode = True
