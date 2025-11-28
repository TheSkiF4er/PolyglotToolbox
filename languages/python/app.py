from fastapi import FastAPI
from pydantic import BaseModel
import hashlib, re
from typing import List, Dict

app = FastAPI()

class TextIn(BaseModel):
    text: str

def stats_from_text(text: str) -> Dict:
    words = re.findall(r"\b[0-9a-zA-Zа-яёА-ЯЁ']+\b", text.lower())
    counts = {}
    for w in words: counts[w] = counts.get(w, 0) + 1
    top = sorted(counts.items(), key=lambda x: x[1], reverse=True)[:5]
    return {"words": len(words), "top": [{"word": w, "count": c} for w, c in top], "sha256": hashlib.sha256(text.encode()).hexdigest()}

@app.get("/health")
def health():
    return {"status":"ok"}

@app.get("/fib")
def fib(n: int = 10):
    def f(n):
        return n if n < 2 else f(n-1) + f(n-2)
    return {"n": n, "value": f(n)}

@app.post("/stats")
def stats(inp: TextIn):
    return stats_from_text(inp.text)
  
