from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv
from groq import Groq

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Ticket(BaseModel):
    title: str
    description: str

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.get("/")
def home():
    return {"message": "API running"}

@app.post("/ticket")
def create_ticket(ticket: Ticket):

    text = (ticket.title + " " + ticket.description).lower()

    # ✅ RULE BASED (FAST + RELIABLE)
    if "login" in text or "password" in text:
        category = "Access"
        severity = "Medium"
    elif "payment" in text or "salary" in text:
        category = "Billing"
        severity = "High"
    elif "error" in text or "crash" in text or "not working" in text:
        category = "Bug"
        severity = "High"
    else:
        category = "Other"
        severity = "Low"

    summary = "System issue"

    # AI ONLY FOR SUMMARY
    try:
        prompt = f"""
Summarize this in max 10 words:

{ticket.title} - {ticket.description}
"""
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}]
        )
        summary = response.choices[0].message.content.strip()
    except:
        pass

    return {
        "status": "processed",
        "ticket": ticket,
        "ai": f"Category: {category}\nSeverity: {severity}\nSummary: {summary}"
    }