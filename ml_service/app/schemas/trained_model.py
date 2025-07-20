from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TrainedModelBase(BaseModel):
    tp: int
    tn: int
    fp: int
    fn: int
    rain_precision: float
    rain_recall: float
    rain_f1_score: float
    no_rain_precision: float
    no_rain_recall: float
    no_rain_f1_score: float

class TrainedModelCreate(TrainedModelBase):
    pass

class TrainedModelRead(TrainedModelBase):
    id: int
    date: datetime

    class Config:
        orm_mode = True
