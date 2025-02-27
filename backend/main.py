import os
import enum
from datetime import datetime, date
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Float, Date, DateTime, Enum as SQLEnum
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from sqlalchemy.sql import func
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Transaction-related code (unchanged)
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

# Create all tables if they don't exist
Base.metadata.create_all(bind=engine)

# Transaction Schemas
class TransactionCreate(BaseModel):
    userid: str
    date: date
    description: str
    category: str
    amount: float
    type: TransactionType

class TransactionUpdate(BaseModel):
    date: str | None = None
    description: str | None = None
    category: str | None = None
    amount: float | None = None
    type: TransactionType | None = None

class TransactionResponse(BaseModel):
    id: int
    date: date
    description: str
    category: str
    amount: float
    type: TransactionType

    class Config:
        orm_mode = True

# Budget Schemas
class BudgetBase(BaseModel):
    category: str
    amount: float
    period: str
    userid: str

class BudgetCreate(BudgetBase):
    pass


class BudgetUpdate(BaseModel):
    category: str | None = None
    amount: float | None = None
    period: str | None = None
    userid: str | None = None

class BudgetResponse(BudgetBase):
    id: int
    userid: str
    created_at: datetime

    class Config:
        orm_mode = True

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# FastAPI application instance
app = FastAPI(title="Finance Manager Backend", version="1.0")

origins = [
    os.getenv("FRONTEND_URL"),
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Transaction Endpoints
@app.post("/transactions/", response_model=TransactionResponse)
def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    db_transaction = Transaction(
        userid=transaction.userid,
        date=transaction.date,
        description=transaction.description,
        category=transaction.category,
        amount=transaction.amount,
        type=transaction.type,
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.get("/transactions/", response_model=list[TransactionResponse])
def read_transactions(userid: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    transactions = db.query(Transaction).filter(Transaction.userid == userid).offset(skip).limit(limit).all()
    return transactions

@app.get("/transactions/{transaction_id}", response_model=TransactionResponse)
def read_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@app.put("/transactions/{transaction_id}", response_model=TransactionResponse)
def update_transaction(transaction_id: int, transaction: TransactionUpdate, db: Session = Depends(get_db)):
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if db_transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    update_data = transaction.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_transaction, key, value)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.delete("/transactions/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if db_transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db.delete(db_transaction)
    db.commit()
    return {"detail": "Transaction deleted"}

# Budget Endpoints
@app.post("/budgets/", response_model=BudgetResponse)
def create_budget(budget: BudgetCreate, db: Session = Depends(get_db)):
    db_budget = Budget(**budget.dict())
    print(db_budget)
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget

@app.get("/budgets/", response_model=list[BudgetResponse])
def read_budgets(userid: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    budgets = db.query(Budget).filter(Budget.userid == userid).offset(skip).limit(limit).all()
    return budgets

@app.get("/budgets/{budget_id}", response_model=BudgetResponse)
def read_budget(budget_id: int, db: Session = Depends(get_db)):
    budget = db.query(Budget).filter(Budget.id == budget_id).first()
    if budget is None:
        raise HTTPException(status_code=404, detail="Budget not found")
    return budget

@app.put("/budgets/{budget_id}", response_model=BudgetResponse)
def update_budget(budget_id: int, budget: BudgetUpdate, db: Session = Depends(get_db)):
    db_budget = db.query(Budget).filter(Budget.id == budget_id).first()
    if db_budget is None:
        raise HTTPException(status_code=404, detail="Budget not found")
    update_data = budget.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_budget, key, value)
    db.commit()
    db.refresh(db_budget)
    return db_budget

@app.delete("/budgets/{budget_id}")
def delete_budget(budget_id: int, db: Session = Depends(get_db)):
    db_budget = db.query(Budget).filter(Budget.id == budget_id).first()
    if db_budget is None:
        raise HTTPException(status_code=404, detail="Budget not found")
    db.delete(db_budget)
    db.commit()
    return {"detail": "Budget deleted"}

@app.get("/summary/{userid}", response_model=dict)
def get_summary(userid: str, db: Session = Depends(get_db)):
    total_income = db.query(Transaction).filter(Transaction.userid == userid, Transaction.category == "income").with_entities(func.sum(Transaction.amount)).scalar() or 0
    total_expenses = db.query(Transaction).filter(Transaction.userid == userid, Transaction.category != "income").with_entities(func.sum(Transaction.amount)).scalar() or 0
    total_balance = total_income - total_expenses
    return {
        "total_income": total_income,
        "total_expenses": total_expenses,
        "total_balance": total_balance
    }
