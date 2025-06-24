import os

import requests
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from dotenv import load_dotenv

load_dotenv()  # Carrega variáveis de ambiente do arquivo .env

# api_key = os.getenv("AGNO_API_KEY")
api_url = os.getenv("API_URL")


def fetch_cards():
    response = requests.get(api_url + "/cards", timeout=10)
    response.raise_for_status()
    return response.json()


def montar_prompt(cartas):
    prompt = "You are an intuitive tarot reader. Based on the cards below, write an empathic, spiritual and reflective reading for the person who drew:\n\n"
    for i, carta in enumerate(cartas, 1):
        nome = carta["name"]
        significado = ", ".join(carta["meanings"]["light"])
        prompt += f"{i}. {nome} — {significado}\n"
    prompt += "\nNow do a reading interpreting all of these cards. Use a sensitive and spiritual tone. Don't use mardown formatting, just plain text.\n\n"
    return prompt


def gerar_leitura_tarot():
    cartas = fetch_cards()
    prompt = montar_prompt(cartas)

    agent = Agent(
        model=OpenAIChat(id="gpt-3.5-turbo-0125"),
        description="You are an experienced and intuitive tarot reader.",
        markdown=True,
    )

    resposta = agent.run(prompt)
    return resposta.content
