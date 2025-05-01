import os, json
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
from sqlalchemy import Column, Integer, String, Float, Date, DateTime
from sqlalchemy.sql import func
from sqlalchemy import Enum as SQLEnum
import enum
from datetime import datetime, date
import requests
from groq import Groq
from dotenv import load_dotenv
from fastapi.responses import StreamingResponse
from typing import AsyncGenerator
load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class TransactionType(str, enum.Enum):
    income = "income"
    expense = "expense"

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    userid = Column(String(50), index=True)
    date = Column(Date)
    description = Column(String(255))
    category = Column(String(100))
    amount = Column(Float)
    type = Column(SQLEnum(TransactionType))

# Budget model
class Budget(Base):
    __tablename__ = "budgets"
    id = Column(Integer, primary_key=True, index=True)
    userid = Column(String(50), index=True)
    category = Column(String(100), index=True, unique=True)
    amount = Column(Float)
    period = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

router = APIRouter(prefix="/analytics-api")

class InsightResponse(BaseModel):
    insights: list[str]


def serialize_tx(tx: Transaction) -> dict:
    return {
        "id":           tx.id,
        "userid":       tx.userid,
        "date":         tx.date.isoformat(),
        "description":  tx.description,
        "category":     tx.category,
        "amount":       tx.amount,
    }

def serialize_bg(bg: Budget) -> dict:
    return {
        "id":           bg.id,
        "userid":       bg.userid,
        "category":     bg.category,
        "amount":       bg.amount,
        "period":       bg.period,
        "created_at":   bg.created_at.isoformat(),
    }

@router.get("/insights/{user_id}", include_in_schema=False)
@router.get("/insights/{user_id}/")
async def get_insights(userid: str):
    db = SessionLocal()
    try:
        txs = db.query(Transaction).filter(Transaction.userid == userid).all()
        bgs = db.query(Budget).filter(Budget.userid == userid).all()
        if not txs:
            raise HTTPException(404, "No transactions for this user")

        tx_list = [serialize_tx(t) for t in txs]
        bg_list = [serialize_bg(b) for b in bgs]

        prompt = (
            f"Here are the transactions: {json.dumps(tx_list)} "
            f"and budgets: {json.dumps(bg_list)}. Please provide insights."
        )

        system_message = {
            "role": "system",
            "content": (
                "You are an expert financial analyst. "
                "Your task is to provide insights based on the transactions and budgets provided."
                "You should analyze the data and provide actionable insights, "
                "suggestions for budget adjustments, and any other relevant information."         
                "Focus on the expenses and budgets to provide a comprehensive analysis."
                "Identify trends, patterns, and anomalies in the spending habits of the user. "  
                "Also provide a summary of the user's financial health, "    
                "including spending patterns, savings opportunities, and any potential risks."
                "Give tips on how to improve their financial situation, "
                "such as reducing unnecessary expenses, increasing savings, or investing wisely." 
                "Give user suggestions to invest in stocks, bonds, or other financial instruments "
                "that align with their financial goals and risk tolerance."
            ),
        }

        completion = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                system_message,
                {"role": "user", "content": prompt}
            ],
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=True,
        )

        async def insight_stream():
            for chunk in completion:
                yield chunk.choices[0].delta.content or ""

        return StreamingResponse(insight_stream(), media_type="text/plain")

    finally:
        db.close()
