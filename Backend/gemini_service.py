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
        },
        "schedule": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "task": {"type": "string"},
                    "frequency": {"type": "string"}
                },
                "required": ["task", "frequency"]
            }
        }
    },
    "required": ["cleaning", "maintenance", "safety", "service", "schedule"]
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
professional service scheduling. Also return a maintenance schedule table with
task and frequency fields. Each category must contain at least one short
recommendation."""

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

    for section in ["cleaning", "maintenance", "safety", "service"]:
        values = guide.get(section)
        if not isinstance(values, list) or not values:
            raise RuntimeError("Gemini returned an incomplete guide")
        if any(not isinstance(item, str) or not item.strip() for item in values):
            raise RuntimeError("Gemini returned an invalid guide item")

    schedule = guide.get("schedule")
    if not isinstance(schedule, list) or not schedule:
        raise RuntimeError("Gemini returned an incomplete schedule")

    cleaned_schedule = []
    for item in schedule:
        if not isinstance(item, dict):
            raise RuntimeError("Gemini returned an invalid schedule item")
        task = str(item.get("task", "")).strip()
        frequency = str(item.get("frequency", "")).strip()
        if not task or not frequency:
            raise RuntimeError("Gemini returned an invalid schedule item")
        cleaned_schedule.append({"task": task, "frequency": frequency})

    guide = {
        section: [item.strip() for item in guide[section]]
        for section in ["cleaning", "maintenance", "safety", "service"]
    }
    guide["schedule"] = cleaned_schedule

    return guide


def ask_ai_assistant(question):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("The AI assistant is not configured yet. Please try again later.")

    client = genai.Client(api_key=api_key)

    prompt = f"""You are a professional Gym Equipment Maintenance Assistant.

Answer clearly and simply. Keep the answer practical, safe, and focused on gym
equipment cleaning, inspection, maintenance, troubleshooting, or service
scheduling. If the question is outside gym equipment maintenance, politely guide
the user back to equipment care.

Question:
{question}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
    except Exception as error:
        raise RuntimeError(
            "The AI assistant is temporarily unavailable. Please try again in a moment."
        ) from error

    if not response.text:
        raise RuntimeError("The AI assistant returned an empty answer. Please try again.")

    return response.text.strip()
