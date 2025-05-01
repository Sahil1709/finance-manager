from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .analytics import router as analytics_router
import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="Analytics Service", root_path="/analytics-api")
app.add_middleware(
  CORSMiddleware,
  allow_origins=[os.getenv("FRONTEND_URL")],
  allow_methods=["GET"],
  allow_headers=["*"],
)
app.include_router(analytics_router)
