from fastapi import FastAPI

from app.api.dashboard import router as dashboard_router
from app.api.food import router as food_router
from app.api.health import router as health_router
from app.api.yoga import router as yoga_router
from app.api.insights import router as insights_router

app = FastAPI(title="AURA Backend")

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(dashboard_router)
app.include_router(food_router)
app.include_router(health_router)
app.include_router(yoga_router)
app.include_router(insights_router)
