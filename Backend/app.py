from flask import Flask, jsonify, request
from flask_cors import CORS
from gemini_service import generate_maintenance_guide

app = Flask(__name__)

# Allow requests from frontend
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "Gym Maintenance AI backend is running"
    })

@app.route("/generate-guide", methods=["POST"])
def generate_guide():

    data = request.get_json(silent=True) or {}

    equipment = str(data.get("equipmentName", "")).strip()
    usage = str(data.get("usageFrequency", "")).strip()
    notes = str(data.get("notes", "")).strip()

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

        return jsonify({
            "success": True,
            "result": ai_response
        })

    except RuntimeError as error:
        return jsonify({
            "success": False,
            "error": str(error)
        }), 503

    except Exception as error:
        app.logger.exception("Guide generation failed")

        return jsonify({
            "success": False,
            "error": str(error)
        }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)