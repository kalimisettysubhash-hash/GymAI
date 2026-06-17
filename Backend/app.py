import os

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
try:
    from .gemini_service import ask_ai_assistant, generate_maintenance_guide
    from .pdf_service import create_pdf
except ImportError:
    from gemini_service import ask_ai_assistant, generate_maintenance_guide
    from pdf_service import create_pdf

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=True
)

@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "Gym Maintenance AI backend is running"
    })

@app.route("/health")
def health():
    return jsonify({
        "success": True,
        "status": "healthy",
        "geminiConfigured": bool(os.getenv("GEMINI_API_KEY"))
    })

@app.route("/chat", methods=["GET", "POST"])
@app.route("/chat/", methods=["GET", "POST"])
def chat():
    if request.method == "GET":
        return jsonify({
            "success": True,
            "message": "Send a POST request with JSON: {\"question\": \"...\"}"
        })

    if not request.is_json:
        return jsonify({
            "success": False,
            "error": "Request body must be valid JSON"
        }), 400

    data = request.get_json(silent=True) or {}
    question = str(data.get("question", "")).strip()

    if not question:
        return jsonify({
            "success": False,
            "error": "Question is required"
        }), 400

    try:
        answer = ask_ai_assistant(question)
    except RuntimeError as error:
        app.logger.warning("AI assistant request failed: %s", error)
        return jsonify({
            "success": False,
            "error": str(error)
        }), 503
    except Exception:
        app.logger.exception("Unexpected AI assistant error")
        return jsonify({
            "success": False,
            "error": "The AI assistant could not answer right now. Please try again shortly."
        }), 500

    return jsonify({
        "success": True,
        "answer": answer
    })


@app.route("/generate-guide", methods=["POST"])
def generate_guide():
    if not request.is_json:
        return jsonify({
            "success": False,
            "error": "Request body must be valid JSON"
        }), 400

    data = request.get_json(silent=True) or {}

    customer = str(data.get("customerName", "")).strip()
    equipment = str(data.get("equipmentName", "")).strip()
    usage = str(data.get("usageFrequency", "")).strip()
    notes = str(data.get("notes", "")).strip()
    allowed_usage = {"Light", "Moderate", "Heavy"}

    if not customer or not equipment or not usage:
        return jsonify({
            "success": False,
            "error": "customerName, equipmentName, and usageFrequency are required"
        }), 400

    if usage not in allowed_usage:
        return jsonify({
            "success": False,
            "error": "usageFrequency must be Light, Moderate, or Heavy"
        }), 400

    try:
        ai_response = generate_maintenance_guide(
            customer,
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

@app.route("/generate-pdf", methods=["POST"])
@app.route("/download-pdf", methods=["POST"])
@app.route("/api/generate-pdf", methods=["POST"])
@app.route("/api/download-pdf", methods=["POST"])
def generate_pdf():
    if not request.is_json:
        return jsonify({
            "success": False,
            "error": "Request body must be valid JSON"
        }), 400

    data = request.get_json(silent=True) or {}
    if not data.get("customerName") or not (data.get("equipmentName") or data.get("equipment")):
        return jsonify({
            "success": False,
            "error": "customerName and equipmentName are required to generate a PDF"
        }), 400

    try:
        pdf_buffer = create_pdf(data)

        equipment_name = str(
            data.get("equipmentName") or data.get("equipment") or "maintenance"
        ).replace(" ", "_").lower()
        filename = f"{equipment_name}_guide.pdf"

        return send_file(
            pdf_buffer,
            as_attachment=True,
            download_name=filename,
            mimetype="application/pdf"
        )
    except Exception as error:
        app.logger.exception("PDF generation failed")
        return jsonify({
            "success": False,
            "error": str(error)
        }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
