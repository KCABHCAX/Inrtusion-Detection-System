from pydantic import BaseModel
from typing import Dict, List, Optional

class ClassProbability(BaseModel):
    label: str
    probability: float

class FlowAnalysisResponse(BaseModel):
    traffic_type: str
    risk_level: str
    confidence: float
    confidence_level: str
    priority: str
    anomaly_status: str
    description: str
    dos: List[str]
    donts: List[str]
    class_probabilities: Dict[str, float]
    raw_confidence: float
    calibrated_confidence: float
    timestamp: str

class ModelMetricsResponse(BaseModel):
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    confusion_matrix: List[List[int]]
    per_model_comparison: Dict[str, float]
    
class HealthResponse(BaseModel):
    status: str
    version: str
