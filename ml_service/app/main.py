from fastapi import FastAPI
from app.routers import trained_model

app = FastAPI()

app.include_router(trained_model.router)
