from flask import Flask, jsonify, request
from flask_cors import CORS
from gemini_service import generate_maintenance_guide

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "message": "Gym Maintenance AI backend is running",
        "guide_url": "http://127.0.0.1:5000/generate-guide"
    })

@app.route("/generate-guide", methods=["POST"])
def generate_guide():

    data = request.get_json(silent=True) or {}

    equipment = str(data.get("equipmentName") or "").strip()
    usage = str(data.get("usageFrequency") or "").strip()
    notes = str(data.get("notes") or "").strip()

    if not equipment or not usage:
        return jsonify({
            "success": False,
            "error": "equipmentName and usageFrequency are required"
        }), 400

    try:
        ai_response = generate_maintenance_guide(
            equipment,
            usage,
            notes
        )
    except RuntimeError as error:
        return jsonify({
            "success": False,
            "error": str(error)
        }), 503
    except Exception:
        app.logger.exception("Failed to generate maintenance guide")
        return jsonify({
            "success": False,
            "error": "The AI service could not generate a guide. Please try again."
        }), 502

    return jsonify({
        "success": True,
        "result": ai_response
    })

if __name__ == "__main__":
    app.run(debug=True)
