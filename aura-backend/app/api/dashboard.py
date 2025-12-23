from fastapi import APIRouter
from app.services.dosha_engine import calculate_today_dosha

router = APIRouter()

@router.get("/dashboard")
def dashboard():
    dosha = calculate_today_dosha()

    return {
        "today_dosha": dosha,
        "weather": {
            "temperature": 36,
            "humidity": 60,
            "aqi": 120
        },
        "wellness_score": 78
    }
