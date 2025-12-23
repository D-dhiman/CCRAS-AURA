from fastapi import APIRouter
from app.services.insights_engine import get_insights

router = APIRouter()

@router.get("/insights")
def insights():
    return get_insights()
