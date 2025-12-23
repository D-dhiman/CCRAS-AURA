from fastapi import APIRouter
from app.services.yoga_engine import get_yoga_advice

router = APIRouter()

@router.get("/yoga-advice")
def yoga_advice():
    return get_yoga_advice()
