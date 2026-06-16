import json
import os
from pathlib import Path

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv(Path(__file__).resolve().parent / ".env")

GUIDE_SCHEMA = {
    "type": "object",
    "properties": {
        "cleaning": {
            "type": "array",
            "items": {"type": "string"}
        },
        "maintenance": {
            "type": "array",
            "items": {"type": "string"}
        },
        "safety": {
            "type": "array",
            "items": {"type": "string"}
        },
        "service": {
            "type": "array",
            "items": {"type": "string"}
        }
    },
    "required": ["cleaning", "maintenance", "safety", "service"]
}


def generate_maintenance_guide(
    equipment,
    usage_frequency,
    notes
):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured")

    client = genai.Client(api_key=api_key)
    prompt = f"""Create a concise gym equipment maintenance guide.

Equipment: {equipment}
Usage Frequency: {usage_frequency}
Notes: {notes or "None"}

Return practical recommendations for cleaning, maintenance, safety, and
professional service scheduling. Each category must contain at least one
short recommendation."""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=GUIDE_SCHEMA
        )
    )

    if not response.text:
        raise RuntimeError("Gemini returned an empty response")

    try:
        guide = json.loads(response.text)
    except json.JSONDecodeError as error:
        raise RuntimeError("Gemini returned an invalid response") from error

    if any(not guide.get(section) for section in GUIDE_SCHEMA["required"]):
        raise RuntimeError("Gemini returned an incomplete guide")

    return guide
