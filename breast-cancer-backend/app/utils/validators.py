from app.services.prediction_service import FEATURE_NAMES

REQUIRED_FEATURES = [f for f in FEATURE_NAMES if f != "id"]


def validate_prediction_input(data: dict):
    """
    Validate incoming prediction request data.

    Returns:
        (is_valid: bool, error_message: str | None, parsed_features: dict | None)
    """
    if "features" not in data:
        return False, "Missing 'features' key in request body", None

    features = data["features"]

    if not isinstance(features, dict):
        return False, "'features' must be a JSON object (dict)", None

    # Check all required features are present
    missing = [f for f in REQUIRED_FEATURES if f not in features]
    if missing:
        return False, f"Missing required features: {', '.join(missing)}", None

    # Validate all values are numeric
    parsed = {}
    for key, value in features.items():
        if key not in FEATURE_NAMES:
            continue  # silently ignore unknown keys
        if not isinstance(value, (int, float)):
            return False, f"Feature '{key}' must be a number, got: {type(value).__name__}", None
        parsed[key] = float(value)

    return True, None, parsed
