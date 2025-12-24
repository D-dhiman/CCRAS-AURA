# app/agents/orchestrator.py

from app.services.dosha_engine import calculate_today_dosha
from app.services.food_engine import get_food_advice
from app.services.yoga_engine import get_yoga_advice
from app.services.health_engine import get_health_risks
from app.services.insights_engine import get_insights


class AuraOrchestrator:
    """
    Central brain that coordinates all wellness agents
    """

    def run(self, user_profile: dict, context: dict) -> dict:
        """
        user_profile: prakriti, gender, age, health data
        context: weather, time of day, season, stress, sleep
        """

        # 1️⃣ Dosha Analysis
        dosha_state = calculate_today_dosha(user_profile, context)

        # 2️⃣ Food Recommendations
        food = get_food_advice(dosha_state, context)

        # 3️⃣ Yoga Suggestions
        yoga = get_yoga_advice(dosha_state, context)

        # 4️⃣ Health Advice
        health = get_health_risks(user_profile, dosha_state)

        # 5️⃣ Daily Insight (human-like guidance)
        insight = get_insights(
            user_profile=user_profile,
            dosha_state=dosha_state,
            context=context
        )

        # 6️⃣ Merge everything
        return {
            "dosha_state": dosha_state,
            "food": food,
            "yoga": yoga,
            "health": health,
            "daily_insight": insight
        }
