import ollama
from fastapi import FastAPI

GEN_PROMPT = """
ONLY Generate an idea Dockerfile for {langugage} with best practices. Do not provide any description
Include:
- Base image
- Installing dependencies
- Setting working directory 
- Adding source code 
- Running the application
{additional_args}
"""

EXP_PROMPT = """
Given a line by line explanation of the following dockerfile
{dockerfile} 
"""

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World!"}

@app.post("/generate")
async def generate_dockerfile(language, additional_args):
    response = ollama.chat(model='llama3.2:1b', messages = [{'role': 'user', 'content': GEN_PROMPT.format(langugage=langugage, additional_args=additional_args)}])
    return response['message']['content']

@app.post("/explain")
async def explain_dockerfile(dockerfile):
    response = ollama.chat(model='llama3.2:1b', messages = [{'role': 'user', 'content': EXP_PROMPT.format(langugage=langugage, additional_args=additional_args)}])
    return response['message']['content']
