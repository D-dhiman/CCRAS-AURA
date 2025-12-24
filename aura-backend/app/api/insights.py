from fastapi import APIRouter
from app.services.insights_engine import get_insights

router = APIRouter()

@router.get("/insights")
def insights():
    return get_insights()
from fastapi import APIRouter
from app.agents.orchestrator import AuraOrchestrator

router = APIRouter()

@router.post("/chat")
def aura_chat(payload: dict):
    orchestrator = AuraOrchestrator()

    user_profile = payload.get("user_profile", {})
    context = payload.get("context", {})

    response = orchestrator.run(user_profile, context)
    return response
