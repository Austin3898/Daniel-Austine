from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os

OLLAMA_URL = os.getenv("OLLAMA_HOST", "http://ollama:11434")

GEN_PROMPT = """
ONLY Generate an idea Dockerfile for {language} with best practices. Do not provide any description
Include:
- Base image
- Installing dependencies
- Setting working directory 
- Adding source code 
- Running the application
{additional_args}
"""

EXP_PROMPT = """
Explain the following Dockerfile line by line.

For each instruction explain:
- what it does
- why it is used

Dockerfile:
{dockerfile}
"""

class GenerateRequest(BaseModel):
    language: str
    additional_args: str

class ExplainRequest(BaseModel):
    dockerfile: str

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World!"}

@app.post("/generate/")
async def generate_dockerfile(req: GenerateRequest):
    response = requests.post(
        f"{OLLAMA_URL}/api/generate",
        json={
            "model": "llama3.2:1b",
            "prompt": GEN_PROMPT.format(
                language=req.language,
                additional_args=req.additional_args
            ),
            "stream": False
        }
    )
    return response.json()

@app.post("/explain/")
async def explain_dockerfile(req: ExplainRequest):
    response = requests.post(
        f"{OLLAMA_URL}/api/generate",
        json={
            "model": "llama3.2:1b",
            "prompt": EXP_PROMPT.format(dockerfile=req.dockerfile),
            "stream": False
        }
    )
    return response.json()
