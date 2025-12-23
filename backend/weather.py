from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from typing import Dict, Optional
from cachetools import TTLCache
from geopy.geocoders import Nominatim
import re

app = FastAPI(title="Weather Dosha API - Open Meteo")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
OPEN_METEO_API_URL = "https://api.open-meteo.com/v1/forecast"
CACHE_TIMEOUT = 300

# Cache setup
weather_cache = TTLCache(maxsize=100, ttl=CACHE_TIMEOUT)

# Initialize geolocator
geolocator = Nominatim(user_agent="weather_dosha_app")


class WeatherResponse(BaseModel):
    city: str
    country: str
    temp: float
    humidity: int
    wind_speed: float
    condition: str
    description: str


class DoshaResponse(BaseModel):
    vata: int
    pitta: int
    kapha: int
    dominant: str
    characteristics: str
    effects: str
    recommendations: str


class WeatherDoshaResponse(BaseModel):
    weather: WeatherResponse
    dosha: DoshaResponse


def validate_location(location: str) -> tuple:
    if not location or len(location.strip()) == 0:
        return False, "Location cannot be empty"
    if len(location) > 100:
        return False, "Location name too long"
    pattern = r'^[a-zA-Z\s,.-]{2,100}$'
    if not re.match(pattern, location.strip()):
        return False, "Invalid location format"
    return True, "Valid"


def get_coordinates(location: str) -> Optional[Dict]:
    try:
        loc = geolocator.geocode(location, timeout=10)
        if loc:
            return {
                "latitude": loc.latitude,
                "longitude": loc.longitude,
                "city": location.split(",")[0].strip()
            }
    except Exception:
        pass
    return None


async def fetch_open_meteo_weather(latitude: float, longitude: float) -> Optional[Dict]:
    try:
        async with httpx.AsyncClient() as client:
            params = {
                "latitude": latitude,
                "longitude": longitude,
                "current_weather": True,
                "hourly": "relative_humidity_2m",
                "temperature_unit": "celsius",
                "windspeed_unit": "kmh"
            }
            res = await client.get(OPEN_METEO_API_URL, params=params, timeout=15.0)
            if res.status_code == 200:
                return res.json()
    except Exception:
        pass
    return None


def extract_weather_from_open_meteo(raw: Dict, city: str) -> Optional[Dict]:
    try:
        current = raw.get("current_weather")
        hourly = raw.get("hourly")
        if not current or not hourly:
            return None

        weather_code = current.get("weathercode", 0)
        condition_map = {
            0: "Clear",
            1: "Mainly Clear",
            2: "Partly Cloudy",
            3: "Cloudy",
            45: "Fog",
            48: "Fog",
            51: "Drizzle",
            61: "Rain",
            71: "Snow",
            80: "Rain Showers",
            95: "Thunderstorm"
        }

        condition = condition_map.get(weather_code, "Clear")

        return {
            "city": city,
            "country": "IN",
            "temp": float(current["temperature"]),
            "humidity": int(hourly["relative_humidity_2m"][0]),
            "wind_speed": float(current["windspeed"]),
            "condition": condition,
            "description": condition.lower()
        }
    except Exception:
        return None


def calculate_dosha(temp: float, humidity: int, wind_speed: float, condition: str) -> Dict:
    vata = pitta = kapha = 0

    if temp < 10:
        vata += 40; kapha += 20
    elif temp < 25:
        kapha += 40; vata += 10
    elif temp < 35:
        pitta += 40; vata += 10
    else:
        pitta += 50; vata += 20

    if humidity < 30:
        vata += 30
    elif humidity < 60:
        pitta += 20
    else:
        kapha += 30

    if wind_speed > 20:
        vata += 30
    elif wind_speed > 10:
        vata += 15; pitta += 10
    else:
        kapha += 20

    c = condition.lower()
    if "rain" in c:
        kapha += 20; vata = max(0, vata - 10)
    elif "cloud" in c:
        kapha += 15
    elif "clear" in c or "sun" in c:
        pitta += 20
    elif "storm" in c or "wind" in c:
        vata += 20

    total = vata + pitta + kapha
    vata = round((vata / total) * 100)
    pitta = round((pitta / total) * 100)
    kapha = round((kapha / total) * 100)

    doshas = {"Vata": vata, "Pitta": pitta, "Kapha": kapha}
    dominant = max(doshas, key=doshas.get)

    info = {
        "Vata": ("Dry, cold, windy", "Anxiety, dryness", "Warm food, grounding"),
        "Pitta": ("Hot, sharp", "Irritation, heat", "Cooling foods, rest"),
        "Kapha": ("Cool, moist, heavy", "Sluggishness", "Light food, exercise")
    }

    return {
        "vata": vata,
        "pitta": pitta,
        "kapha": kapha,
        "dominant": dominant,
        "characteristics": info[dominant][0],
        "effects": info[dominant][1],
        "recommendations": info[dominant][2]
    }


@app.get("/weather/{location}", response_model=WeatherDoshaResponse)
async def get_weather_dosha(location: str):
    valid, msg = validate_location(location)
    if not valid:
        raise HTTPException(status_code=400, detail=msg)

    key = location.lower().strip()
    if key in weather_cache:
        return weather_cache[key]

    coords = get_coordinates(location)
    if not coords:
        raise HTTPException(status_code=404, detail="Location not found")

    raw = await fetch_open_meteo_weather(coords["latitude"], coords["longitude"])
    if not raw:
        raise HTTPException(status_code=502, detail="Weather service unavailable")

    weather = extract_weather_from_open_meteo(raw, coords["city"])
    if not weather:
        raise HTTPException(status_code=500, detail="Failed to parse weather data")

    dosha = calculate_dosha(
        weather["temp"],
        weather["humidity"],
        weather["wind_speed"],
        weather["condition"]
    )

    result = {"weather": weather, "dosha": dosha}
    weather_cache[key] = result
    return result


@app.get("/health")
async def health():
    return {"status": "healthy", "cache_size": len(weather_cache)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)