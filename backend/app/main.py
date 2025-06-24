"""
# Etapa 8 - Cria a aplicação FastAPI e inclui as rotas definidas em 'routes.py'.
# Este arquivo é o ponto de entrada para rodar o servidor com uvicorn.
"""

"""
# Etapa 9 - Rodar o servidor para expor a API
uvicorn app.main:app --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import router

app = FastAPI()
app.include_router(router)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # pode usar ["*"] para todos, mas evite em prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
