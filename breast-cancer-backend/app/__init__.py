from flask import Flask, jsonify
from flask_cors import CORS
from config.settings import get_config


def create_app():
    app = Flask(__name__)

    cfg = get_config()
    app.config.from_object(cfg)

    # Enable CORS for all API routes
    CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})

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
