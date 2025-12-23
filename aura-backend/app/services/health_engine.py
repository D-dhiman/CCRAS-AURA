from app.services.dosha_engine import calculate_today_dosha

def get_health_risks():
    dosha = calculate_today_dosha()

    if dosha == "Pitta":
        return {
            "today_dosha": dosha,
            "possible_issues": [
                {
                    "issue": "Acidity",
                    "reason": "Excess heat due to high Pitta",
                    "solution": "Avoid spicy and oily foods"
                },
                {
                    "issue": "Headache",
                    "reason": "Heat and dehydration",
                    "solution": "Stay hydrated and rest"
                }
            ],
            "disclaimer": "Wellness guidance only"
        }

    return {}
