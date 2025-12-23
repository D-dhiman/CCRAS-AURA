from fastapi import APIRouter

router = APIRouter()

from app.services.food_engine import get_food_advice

@router.get("/food-advice")
def food_advice():
    return get_food_advice()
