from fastapi import APIRouter
from schemas.api_schemas import HealthResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="Healthy", version="1.0.0")
