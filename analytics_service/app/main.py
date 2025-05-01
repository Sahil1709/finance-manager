from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .analytics import router as analytics_router
import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(
    title="Analytics Service",
    docs_url="/analytics-api/docs",
    openapi_url="/analytics-api/openapi.json",
    redirect_slashes=False,
)
app.add_middleware(
  CORSMiddleware,
  allow_origins=[os.getenv("FRONTEND_URL")],
  allow_methods=["GET"],
  allow_headers=["*"],
)
app.include_router(analytics_router)
