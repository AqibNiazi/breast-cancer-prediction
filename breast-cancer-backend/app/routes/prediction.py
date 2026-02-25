from flask import Blueprint, request
from app.services.prediction_service import get_prediction, get_sample, get_features
from app.utils.validators import validate_prediction_input
from app.utils.response_helpers import success_response, error_response

prediction_bp = Blueprint("prediction", __name__)


@prediction_bp.route("/predict", methods=["POST"])
def predict():
    body = request.get_json(silent=True)
    if not body:
        return error_response("Request body is required", 400)

    is_valid, error_message, parsed_features = validate_prediction_input(body)
    if not is_valid:
        return error_response(error_message, 422)

    result = get_prediction(parsed_features)
    return success_response(result)


@prediction_bp.route("/features", methods=["GET"])
def features():
    return success_response({"features": get_features()})


@prediction_bp.route("/sample", methods=["GET"])
def sample():
    """
    Returns a random sample case.

    Optional query parameter:
      ?type=any        → random from all 6 samples (default)
      ?type=benign     → random from the 3 benign samples
      ?type=malignant  → random from the 3 malignant samples
    """
    diagnosis_type = request.args.get("type", "any")
    sample_data = get_sample(diagnosis_type)
    return success_response({"sample": sample_data})