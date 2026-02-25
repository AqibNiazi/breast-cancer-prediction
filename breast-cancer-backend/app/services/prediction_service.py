import os
import pickle
import numpy as np
from flask import current_app


FEATURE_NAMES = [
    "id",
    "radius_mean", "texture_mean", "perimeter_mean", "area_mean",
    "smoothness_mean", "compactness_mean", "concavity_mean", "concave_points_mean",
    "symmetry_mean", "fractal_dimension_mean",
    "radius_se", "texture_se", "perimeter_se", "area_se",
    "smoothness_se", "compactness_se", "concavity_se", "concave_points_se",
    "symmetry_se", "fractal_dimension_se",
    "radius_worst", "texture_worst", "perimeter_worst", "area_worst",
    "smoothness_worst", "compactness_worst", "concavity_worst", "concave_points_worst",
    "symmetry_worst", "fractal_dimension_worst",
]

FEATURE_DESCRIPTIONS = {
    "id": "Patient ID (any integer)",
    "radius_mean": "Mean of distances from center to points on the perimeter",
    "texture_mean": "Standard deviation of gray-scale values",
    "perimeter_mean": "Mean size of the core tumor",
    "area_mean": "Mean area of the tumor",
    "smoothness_mean": "Mean of local variation in radius lengths",
    "compactness_mean": "Mean of perimeter² / area - 1.0",
    "concavity_mean": "Mean severity of concave portions of the contour",
    "concave_points_mean": "Mean number of concave portions of the contour",
    "symmetry_mean": "Mean symmetry",
    "fractal_dimension_mean": "Mean coastline approximation - 1",
    "radius_se": "Standard error for the mean of distances from center to points on the perimeter",
    "texture_se": "Standard error for standard deviation of gray-scale values",
    "perimeter_se": "Standard error for size of the core tumor",
    "area_se": "Standard error for area",
    "smoothness_se": "Standard error for local variation in radius lengths",
    "compactness_se": "Standard error for perimeter² / area - 1.0",
    "concavity_se": "Standard error for severity of concave portions",
    "concave_points_se": "Standard error for number of concave portions",
    "symmetry_se": "Standard error for symmetry",
    "fractal_dimension_se": "Standard error for coastline approximation",
    "radius_worst": "Worst (largest) mean value for distances from center to perimeter points",
    "texture_worst": "Worst standard deviation of gray-scale values",
    "perimeter_worst": "Worst perimeter",
    "area_worst": "Worst area",
    "smoothness_worst": "Worst local variation in radius lengths",
    "compactness_worst": "Worst perimeter² / area - 1.0",
    "concavity_worst": "Worst severity of concave portions",
    "concave_points_worst": "Worst number of concave portions",
    "symmetry_worst": "Worst symmetry",
    "fractal_dimension_worst": "Worst coastline approximation",
}

SAMPLE_MALIGNANT = {
    "id": 842302,
    "radius_mean": 17.99, "texture_mean": 10.38, "perimeter_mean": 122.80, "area_mean": 1001.0,
    "smoothness_mean": 0.1184, "compactness_mean": 0.2776, "concavity_mean": 0.3001,
    "concave_points_mean": 0.1471, "symmetry_mean": 0.2419, "fractal_dimension_mean": 0.07871,
    "radius_se": 1.095, "texture_se": 0.9053, "perimeter_se": 8.589, "area_se": 153.4,
    "smoothness_se": 0.006399, "compactness_se": 0.04904, "concavity_se": 0.05373,
    "concave_points_se": 0.01587, "symmetry_se": 0.03003, "fractal_dimension_se": 0.006193,
    "radius_worst": 25.38, "texture_worst": 17.33, "perimeter_worst": 184.6, "area_worst": 2019.0,
    "smoothness_worst": 0.1622, "compactness_worst": 0.6656, "concavity_worst": 0.7119,
    "concave_points_worst": 0.2654, "symmetry_worst": 0.4601, "fractal_dimension_worst": 0.1189,
}


class PredictionService:
    _model = None
    _scaler = None

    def _load_model(self):
        if self._model is None:
            model_path = current_app.config.get("MODEL_PATH", "app/models/model.pkl")
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at: {model_path}")
            with open(model_path, "rb") as f:
                self._model = pickle.load(f)

    def _load_scaler(self):
        if self._scaler is None:
            scaler_path = current_app.config.get("SCALER_PATH", "app/models/scaler.pkl")
            if not os.path.exists(scaler_path):
                raise FileNotFoundError(f"Scaler file not found at: {scaler_path}")
            with open(scaler_path, "rb") as f:
                self._scaler = pickle.load(f)

    def predict(self, features: dict) -> dict:
        """
        Run prediction on input feature dictionary.
        Returns prediction result with confidence scores.
        """
        try:
            self._load_model()
            self._load_scaler()

            # Build feature array in correct order (all 31 features including id)
            feature_values = [features.get(name, 0) for name in FEATURE_NAMES]
            input_array = np.array(feature_values).reshape(1, -1)

            # Scale the input
            input_scaled = self._scaler.transform(input_array)

            # Predict
            prediction = int(self._model.predict(input_scaled)[0])
            probabilities = self._model.predict_proba(input_scaled)[0].tolist()
            confidence = float(max(probabilities))

            return {
                "success": True,
                "prediction": prediction,
                "label": "Malignant" if prediction == 1 else "Benign",
                "confidence": round(confidence * 100, 2),
                "probabilities": {
                    "benign": round(probabilities[0] * 100, 2),
                    "malignant": round(probabilities[1] * 100, 2),
                }
            }

        except FileNotFoundError as e:
            return {"success": False, "error": str(e)}
        except Exception as e:
            return {"success": False, "error": f"Prediction failed: {str(e)}"}

    def get_feature_info(self) -> list:
        """Return feature names with descriptions."""
        return [
            {
                "name": name,
                "display_name": name.replace("_", " ").title(),
                "description": FEATURE_DESCRIPTIONS.get(name, ""),
            }
            for name in FEATURE_NAMES
        ]

    def get_sample_input(self) -> dict:
        """Return a sample malignant input for testing."""
        return SAMPLE_MALIGNANT
