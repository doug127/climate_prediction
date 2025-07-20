from sqlalchemy.orm import Session
from app.models.models import TrainedModel
from app.schemas.trained_model import TrainedModelCreate

def create_trained_model(db: Session, trained_model: TrainedModelCreate):
    db_model = TrainedModel(**trained_model.dict())
    db.add(db_model)
    db.commit()
    db.refresh(db_model)
    return db_model

def get_trained_model(db: Session, model_id: int):
    return db.query(TrainedModel).filter(TrainedModel.id == model_id).first()

def get_trained_models(db: Session, skip: int = 0, limit: int = 100):
    return db.query(TrainedModel).offset(skip).limit(limit).all()