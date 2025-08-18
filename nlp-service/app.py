# nlp-service/app.py
from fastapi import FastAPI, Request
from model import analyze_sentiment

app = FastAPI()

@app.post("/analyze")
async def analyze(request: Request):
    data = await request.json()
    text = data.get("message", "")
    result = analyze_sentiment(text)
    return {"sentiment": result}
