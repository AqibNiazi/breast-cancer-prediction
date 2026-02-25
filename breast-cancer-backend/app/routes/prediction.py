from flask import Blueprint, request, jsonify
from app.services.prediction_service import PredictionService
from app.utils.validators import validate_prediction_input
from app.utils.response_helpers import success_response, error_response

prediction_bp = Blueprint("prediction", __name__)
prediction_service = PredictionService()


@prediction_bp.route("/predict", methods=["POST"])
def predict():
    """
    Predict breast cancer from input features.

    Expects JSON body with a 'features' key containing 31 numerical values.

    Example:
    {
        "features": {
            "radius_mean": 17.99,
            "texture_mean": 10.38,
            ...
        }
    }
    """
    data = request.get_json()

    if not data:
        return error_response("Request body is required", 400)

    is_valid, error_message, parsed_features = validate_prediction_input(data)
    if not is_valid:
        return error_response(error_message, 422)

    result = prediction_service.predict(parsed_features)

    if not result["success"]:
        return error_response(result["error"], 500)

    return success_response({
        "prediction": result["prediction"],
        "label": result["label"],
        "confidence": result["confidence"],
        "probabilities": result["probabilities"]
    })


@prediction_bp.route("/features", methods=["GET"])
def get_features():
    """Return the list of expected input features with descriptions."""
    features = prediction_service.get_feature_info()
    return success_response({"features": features})


@prediction_bp.route("/sample", methods=["GET"])
def get_sample():
    """Return a sample input (malignant case) for testing purposes."""
    sample = prediction_service.get_sample_input()
    return success_response({"sample": sample})
