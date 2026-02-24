from fastapi import APIRouter
from schemas.api_schemas import ModelMetricsResponse

router = APIRouter()

@router.get("/model-metrics", response_model=ModelMetricsResponse)
async def get_model_metrics():
    # Mock return for now. Should load from a saved json or database.
    return ModelMetricsResponse(
        accuracy=0.985,
        precision=0.980,
        recall=0.990,
        f1_score=0.985,
        confusion_matrix=[
            [500, 10],
            [5, 485]
        ],
        per_model_comparison={
            "Random Forest": 0.985,
            "XGBoost": 0.982,
            "LSTM": 0.975,
            "Transformer": 0.970
        }
    )
