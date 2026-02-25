from flask import Flask, jsonify, request
from flask_cors import CORS
from config.settings import get_config


def create_app():
    app = Flask(__name__)

    cfg = get_config()
    app.config.from_object(cfg)

    # Get allowed origins from config
    allowed_origins = app.config.get("CORS_ORIGINS", [])

    # Flask-CORS setup
    CORS(
        app,
        resources={r"/*": {"origins": allowed_origins}},
        supports_credentials=False,
        allow_headers=["Content-Type", "Authorization", "Accept"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    )

    # Manual CORS handler — Vercel serverless needs this to reliably
    # inject Access-Control-Allow-Origin on every single response
    @app.after_request
    def apply_cors(response):
        origin = request.headers.get("Origin", "")

        # Allow the request origin if it's in our whitelist
        if origin in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
        elif "*" in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = "*"

        response.headers["Access-Control-Allow-Methods"] = (
            "GET, POST, PUT, DELETE, OPTIONS"
        )
        response.headers["Access-Control-Allow-Headers"] = (
            "Content-Type, Authorization, Accept"
        )
        response.headers["Access-Control-Max-Age"] = "3600"
        return response

    # Handle preflight OPTIONS requests globally
    @app.before_request
    def handle_preflight():
        if request.method == "OPTIONS":
            response = jsonify({"status": "ok"})
            origin = request.headers.get("Origin", "")
            if origin in allowed_origins:
                response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Methods"] = (
                "GET, POST, PUT, DELETE, OPTIONS"
            )
            response.headers["Access-Control-Allow-Headers"] = (
                "Content-Type, Authorization, Accept"
            )
            response.headers["Access-Control-Max-Age"] = "3600"
            response.status_code = 200
            return response

    # Root route
    @app.route("/")
    def index():
        return jsonify({
            "message": "Breast Cancer Prediction API",
            "version": "1.0.0",
            "endpoints": {
                "health": "/api/health",
                "features": "/api/v1/features",
                "sample": "/api/v1/sample",
                "predict": "/api/v1/predict  [POST]"
            }
        })

    # Register blueprints
    from app.routes.health import health_bp
    from app.routes.prediction import prediction_bp

    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(prediction_bp, url_prefix="/api/v1")

    return app
