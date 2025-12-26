from fastapi import APIRouter

router= APIRouter(prefix="/doctor", tags= ["Doctor"])

@router.get("/dashboard")
def doctor_dashboard():
    return{
        "total_patients": 12,
        "appointments_today": 5,
        "alerts": [
            "High Pitta cases due to heatwave",
            "Air quality affecting respiratory patients"
        ]
    }
@router.get("/patient/{patient_id}")
def get_patient_overview(patient_id: str):
    return {
        "patient_id": patient_id,
        "name": "Demo Patient",
        "prakriti": "Vata-Pitta",
        "current_dosha": "Pitta",
        "wellness_score": 78,
        "flags": [
            "Irregular sleep",
            "High stress"
        ]
    }
@router.get("/patient/{patient_id}/aura-profile")
def export_aura_profile(patient_id: str):
    return {
        "patient_id": patient_id,
        "prakriti": "Vata-Pitta",
        "ritu": "Grishma",
        "kaal": "Afternoon",
        "environment": {
            "temperature": 36,
            "humidity": 60,
            "aqi": 120
        },
        "recommendations": {
            "food": ["Cooling foods", "Avoid spicy"],
            "lifestyle": ["Early sleep", "Breathing exercises"]
        }
    }
@router.get("/patient/{patient_id}/treatment-advisory")
def treatment_advisory(patient_id: str):
    """
    Clinical decision support for doctors.
    Provides context-aware Ayurvedic considerations.
    """

    # ---- Mocked inputs (later will come from agents / DB) ----
    dosha_state = "Pitta"
    ritu = "Grishma"        # Summer
    kaal = "Afternoon"
    weather = "Hot & Dry"

    # ---- Rule-based advisory logic ----
    suitability = "Suitable"
    recommended_focus = []
    avoid = []
    notes = []

    if dosha_state == "Pitta" and ritu == "Grishma":
        suitability = "Proceed with caution"
        recommended_focus = [
            "Cooling therapies",
            "Hydration support",
            "Stress reduction"
        ]
        avoid = [
            "Heat-inducing procedures",
            "Intensive detox therapies"
        ]
        notes.append(
            "Pitta aggravation likely due to seasonal heat."
        )

    if kaal == "Afternoon":
        notes.append(
            "Consider scheduling intensive procedures in early morning."
        )

    # ---- Response ----
    return {
        "patient_id": patient_id,
        "context": {
            "dosha_state": dosha_state,
            "ritu": ritu,
            "kaal": kaal,
            "weather": weather
        },
        "advisory": {
            "suitability": suitability,
            "recommended_focus": recommended_focus,
            "avoid": avoid,
            "notes_for_doctor": notes
        },
        "disclaimer": (
            "This advisory is based on Ayurvedic principles and is intended "
            "to support clinical decision-making. Final treatment decisions "
            "rest with the practitioner."
        )
    }
