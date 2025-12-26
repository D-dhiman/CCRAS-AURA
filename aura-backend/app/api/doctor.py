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