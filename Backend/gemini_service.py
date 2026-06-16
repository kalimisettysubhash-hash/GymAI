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


def generate_maintenance_guide(customer_name, equipment, usage_frequency, notes):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured")

    client = genai.Client(api_key=api_key)
    prompt = f"""Create a concise gym equipment maintenance guide.

Customer: {customer_name}
Equipment: {equipment}
Usage Frequency: {usage_frequency}
Notes: {notes or "None"}

Return practical recommendations for cleaning, maintenance, safety, and
professional service scheduling. Each category must contain at least one
short recommendation."""

    try:
        response = client.models.generate_content(
            model=os.getenv("GEMINI_MODEL", "gemini-2.5-flash"),
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=GUIDE_SCHEMA
            )
        )
    except Exception as error:
        raise RuntimeError("Gemini API request failed. Please try again later.") from error

    if not response.text:
        raise RuntimeError("Gemini returned an empty response")

    try:
        guide = json.loads(response.text)
    except json.JSONDecodeError as error:
        raise RuntimeError("Gemini returned an invalid response") from error

    for section in GUIDE_SCHEMA["required"]:
        values = guide.get(section)
        if not isinstance(values, list) or not values:
            raise RuntimeError("Gemini returned an incomplete guide")
        if any(not isinstance(item, str) or not item.strip() for item in values):
            raise RuntimeError("Gemini returned an invalid guide item")

    guide = {
        section: [item.strip() for item in guide[section]]
        for section in GUIDE_SCHEMA["required"]
    }

    return guide
