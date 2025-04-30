import os
DATABASE_URL = "sqlite:///./test.db"
os.environ["DATABASE_URL"] = DATABASE_URL
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app, Base, get_db, Transaction, Budget


engine = create_engine(DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="module")
def client():
    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c

def test_create_transaction(client):
    response = client.post("/transactions/", json={
        "userid": "user1",
        "date": "2023-10-01",
        "description": "Test transaction",
        "category": "income",
        "amount": 100.0,
        "type": "income"
    })
    assert response.status_code == 200
    assert response.json()["amount"] == 100.0

def test_read_transactions(client):
    response = client.get("/transactions/?userid=user1")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_read_transaction(client):
    response = client.get("/transactions/1")
    assert response.status_code == 200
    assert response.json()["id"] == 1

def test_update_transaction(client):
    response = client.put("/transactions/1", json={
        "description": "Updated transaction"
    })
    assert response.status_code == 200
    assert response.json()["description"] == "Updated transaction"

def test_delete_transaction(client):
    response = client.delete("/transactions/1")
    assert response.status_code == 200
    assert response.json()["detail"] == "Transaction deleted"

def test_create_budget(client):
    response = client.post("/budgets/", json={
        "category": "Food",
        "amount": 200.0,
        "period": "monthly",
        "userid": "user1"
    })
    assert response.status_code == 200
    assert response.json()["category"] == "Food"

def test_read_budgets(client):
    response = client.get("/budgets/?userid=user1")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_read_budget(client):
    response = client.get("/budgets/1")
    assert response.status_code == 200
    assert response.json()["id"] == 1

def test_update_budget(client):
    response = client.put("/budgets/1", json={
        "amount": 250.0
    })
    assert response.status_code == 200
    assert response.json()["amount"] == 250.0

def test_delete_budget(client):
    response = client.delete("/budgets/1")
    assert response.status_code == 200
    assert response.json()["detail"] == "Budget deleted"

def test_get_summary(client):
    response = client.get("/summary/user1")
    assert response.status_code == 200
    assert "total_income" in response.json()
    assert "total_expenses" in response.json()
    assert "total_balance" in response.json()