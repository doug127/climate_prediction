from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.trained_model import TrainedModelCreate, TrainedModelRead
from app.controllers import trained_model as controller
from app.core.database import get_db

router = APIRouter(prefix="/trained_models", tags=["trained_models"])

@router.post("/", response_model=TrainedModelRead)
def create_trained_model(
    trained_model: TrainedModelCreate,
    db: Session = Depends(get_db)
):
    return controller.create_trained_model(db, trained_model)

@router.get("/{model_id}", response_model=TrainedModelRead)
def read_trained_model(
    model_id: int,
    db: Session = Depends(get_db)
):
    db_model = controller.get_trained_model(db, model_id)
    if not db_model:
        raise HTTPException(status_code=404, detail="TrainedModel not found")
    return db_model

@router.get("/", response_model=List[TrainedModelRead])
def list_trained_models(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    return controller.get_trained_models(db, skip=skip, limit=limit)
