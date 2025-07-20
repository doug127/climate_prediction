from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime

class TrainedModel(Base):
    __tablename__ = "trained_model"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.now)
    tp = Column(Integer)
    tn = Column(Integer)
    fp = Column(Integer)
    fn = Column(Integer)
    rain_precision = Column(Float)
    rain_recall = Column(Float)
    rain_f1_score = Column(Float)
    no_rain_precision = Column(Float)
    no_rain_recall = Column(Float)
    no_rain_f1_score = Column(Float)
    predict_models = relationship("PredictModel", back_populates="trained_model")

class PredictModel(Base):
    __tablename__ = "predict_model"

    id = Column(Integer, primary_key=True, index=True)
    trained_model_id = Column(Integer, ForeignKey("trained_model.id"))
    prediction_rain = Column(Boolean)
    probability = Column(Float)
    trust = Column(Float)
    trained_model = relationship("TrainedModel", back_populates="predict_models")