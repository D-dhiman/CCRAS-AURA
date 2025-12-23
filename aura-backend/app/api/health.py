from fastapi import APIRouter
from app.services.health_engine import get_health_risks

router = APIRouter()

@router.get("/health-risks")
def health_risks():
    return get_health_risks()
