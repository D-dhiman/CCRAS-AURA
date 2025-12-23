from app.services.dosha_engine import calculate_today_dosha

def get_food_advice():
    dosha = calculate_today_dosha()

    if dosha == "Pitta":
        return {
            "today_dosha": dosha,
            "foods_to_prefer": ["Rice", "Curd", "Fruits", "Coconut water"],
            "foods_to_avoid": ["Spicy food", "Fried food"],
            "eating_habits": [
                "Eat on time",
                "Avoid late-night meals"
            ],
            "reason": "High heat increases Pitta"
        }

    return {}
