from app.services.dosha_engine import calculate_today_dosha

def get_yoga_advice():
    dosha = calculate_today_dosha()

    if dosha == "Pitta":
        return {
            "today_dosha": dosha,
            "recommended_yoga": [
                "Shavasana",
                "Sheetali Pranayama",
                "Balasana"
            ],
            "activity_level": "Light to Moderate",
            "sleep_advice": "Sleep before 11 PM"
        }

    return {}
