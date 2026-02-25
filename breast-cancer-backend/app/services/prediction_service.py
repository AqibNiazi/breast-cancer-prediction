import pickle
import numpy as np
import random
from flask import current_app

# ─── Model singleton ──────────────────────────────────────────────────────────
_model = None
_scaler = None

FEATURE_NAMES = [
    "radius_mean", "texture_mean", "perimeter_mean", "area_mean",
    "smoothness_mean", "compactness_mean", "concavity_mean",
    "concave points_mean", "symmetry_mean", "fractal_dimension_mean",
    "radius_se", "texture_se", "perimeter_se", "area_se",
    "smoothness_se", "compactness_se", "concavity_se",
    "concave points_se", "symmetry_se", "fractal_dimension_se",
    "radius_worst", "texture_worst", "perimeter_worst", "area_worst",
    "smoothness_worst", "compactness_worst", "concavity_worst",
    "concave points_worst", "symmetry_worst", "fractal_dimension_worst",
]

FEATURE_DESCRIPTIONS = {
    "radius_mean": "Mean of distances from center to points on the perimeter",
    "texture_mean": "Standard deviation of gray-scale values",
    "perimeter_mean": "Mean size of the core tumor",
    "area_mean": "Mean area of the core tumor",
    "smoothness_mean": "Mean of local variation in radius lengths",
    "compactness_mean": "Mean of perimeter² / area - 1.0",
    "concavity_mean": "Mean severity of concave portions of the contour",
    "concave points_mean": "Mean number of concave portions of the contour",
    "symmetry_mean": "Mean symmetry",
    "fractal_dimension_mean": "Mean for coastline approximation - 1",
    "radius_se": "Standard error for the mean of distances from center to perimeter",
    "texture_se": "Standard error for standard deviation of gray-scale values",
    "perimeter_se": "Standard error for core tumor perimeter",
    "area_se": "Standard error for core tumor area",
    "smoothness_se": "Standard error for local variation in radius lengths",
    "compactness_se": "Standard error for perimeter² / area - 1.0",
    "concavity_se": "Standard error for severity of concave portions",
    "concave points_se": "Standard error for number of concave portions",
    "symmetry_se": "Standard error for symmetry",
    "fractal_dimension_se": "Standard error for coastline approximation - 1",
    "radius_worst": "Worst mean of distances from center to perimeter",
    "texture_worst": "Worst standard deviation of gray-scale values",
    "perimeter_worst": "Worst core tumor perimeter",
    "area_worst": "Worst core tumor area",
    "smoothness_worst": "Worst local variation in radius lengths",
    "compactness_worst": "Worst perimeter² / area - 1.0",
    "concavity_worst": "Worst severity of concave portions",
    "concave points_worst": "Worst number of concave portions",
    "symmetry_worst": "Worst symmetry",
    "fractal_dimension_worst": "Worst coastline approximation - 1",
}

# ─── Sample cases (3 Malignant + 3 Benign) ────────────────────────────────────
SAMPLE_CASES = [
    {
        "id": 842302,
        "diagnosis": "M",
        "radius_mean": 17.99, "texture_mean": 10.38, "perimeter_mean": 122.8,
        "area_mean": 1001.0, "smoothness_mean": 0.1184, "compactness_mean": 0.2776,
        "concavity_mean": 0.3001, "concave points_mean": 0.1471, "symmetry_mean": 0.2419,
        "fractal_dimension_mean": 0.07871, "radius_se": 1.095, "texture_se": 0.9053,
        "perimeter_se": 8.589, "area_se": 153.4, "smoothness_se": 0.006399,
        "compactness_se": 0.04904, "concavity_se": 0.05373, "concave points_se": 0.01587,
        "symmetry_se": 0.03003, "fractal_dimension_se": 0.006193, "radius_worst": 25.38,
        "texture_worst": 17.33, "perimeter_worst": 184.6, "area_worst": 2019.0,
        "smoothness_worst": 0.1622, "compactness_worst": 0.6656, "concavity_worst": 0.7119,
        "concave points_worst": 0.2654, "symmetry_worst": 0.4601,
        "fractal_dimension_worst": 0.1189,
    },
    {
        "id": 84300903,
        "diagnosis": "M",
        "radius_mean": 20.57, "texture_mean": 17.77, "perimeter_mean": 132.9,
        "area_mean": 1326.0, "smoothness_mean": 0.08474, "compactness_mean": 0.07864,
        "concavity_mean": 0.0869, "concave points_mean": 0.07017, "symmetry_mean": 0.1812,
        "fractal_dimension_mean": 0.05667, "radius_se": 0.5435, "texture_se": 0.7339,
        "perimeter_se": 3.398, "area_se": 74.08, "smoothness_se": 0.005225,
        "compactness_se": 0.01308, "concavity_se": 0.0186, "concave points_se": 0.0134,
        "symmetry_se": 0.01389, "fractal_dimension_se": 0.003532, "radius_worst": 24.99,
        "texture_worst": 23.41, "perimeter_worst": 158.8, "area_worst": 1956.0,
        "smoothness_worst": 0.1238, "compactness_worst": 0.1866, "concavity_worst": 0.2416,
        "concave points_worst": 0.186, "symmetry_worst": 0.275,
        "fractal_dimension_worst": 0.08902,
    },
    {
        "id": 843786,
        "diagnosis": "M",
        "radius_mean": 12.46, "texture_mean": 24.04, "perimeter_mean": 83.97,
        "area_mean": 475.9, "smoothness_mean": 0.1186, "compactness_mean": 0.2396,
        "concavity_mean": 0.2273, "concave points_mean": 0.08543, "symmetry_mean": 0.203,
        "fractal_dimension_mean": 0.08243, "radius_se": 0.2976, "texture_se": 1.599,
        "perimeter_se": 2.039, "area_se": 27.9, "smoothness_se": 0.009259,
        "compactness_se": 0.05372, "concavity_se": 0.05526, "concave points_se": 0.01781,
        "symmetry_se": 0.05166, "fractal_dimension_se": 0.004957, "radius_worst": 15.09,
        "texture_worst": 40.68, "perimeter_worst": 97.65, "area_worst": 711.4,
        "smoothness_worst": 0.1853, "compactness_worst": 1.058, "concavity_worst": 1.105,
        "concave points_worst": 0.221, "symmetry_worst": 0.4366,
        "fractal_dimension_worst": 0.2075,
    },
    {
        "id": 8510426,
        "diagnosis": "B",
        "radius_mean": 13.54, "texture_mean": 14.36, "perimeter_mean": 87.46,
        "area_mean": 566.3, "smoothness_mean": 0.09779, "compactness_mean": 0.08129,
        "concavity_mean": 0.06664, "concave points_mean": 0.04781, "symmetry_mean": 0.1885,
        "fractal_dimension_mean": 0.05766, "radius_se": 0.2699, "texture_se": 0.7886,
        "perimeter_se": 2.058, "area_se": 23.56, "smoothness_se": 0.008462,
        "compactness_se": 0.0146, "concavity_se": 0.02387, "concave points_se": 0.01315,
        "symmetry_se": 0.0198, "fractal_dimension_se": 0.0023, "radius_worst": 15.11,
        "texture_worst": 19.26, "perimeter_worst": 99.7, "area_worst": 711.2,
        "smoothness_worst": 0.144, "compactness_worst": 0.1773, "concavity_worst": 0.239,
        "concave points_worst": 0.1288, "symmetry_worst": 0.2977,
        "fractal_dimension_worst": 0.07259,
    },
    {
        "id": 857010,
        "diagnosis": "B",
        "radius_mean": 9.504, "texture_mean": 12.44, "perimeter_mean": 60.34,
        "area_mean": 273.9, "smoothness_mean": 0.1024, "compactness_mean": 0.06492,
        "concavity_mean": 0.02956, "concave points_mean": 0.02076, "symmetry_mean": 0.1815,
        "fractal_dimension_mean": 0.06905, "radius_se": 0.2773, "texture_se": 0.9768,
        "perimeter_se": 1.909, "area_se": 15.7, "smoothness_se": 0.009606,
        "compactness_se": 0.01432, "concavity_se": 0.01985, "concave points_se": 0.01421,
        "symmetry_se": 0.02027, "fractal_dimension_se": 0.002968, "radius_worst": 10.23,
        "texture_worst": 15.66, "perimeter_worst": 65.13, "area_worst": 314.9,
        "smoothness_worst": 0.1324, "compactness_worst": 0.1148, "concavity_worst": 0.08867,
        "concave points_worst": 0.06227, "symmetry_worst": 0.245,
        "fractal_dimension_worst": 0.07773,
    },
    {
        "id": 8670,
        "diagnosis": "B",
        "radius_mean": 11.74, "texture_mean": 14.02, "perimeter_mean": 74.24,
        "area_mean": 427.3, "smoothness_mean": 0.07373, "compactness_mean": 0.0283,
        "concavity_mean": 0.0, "concave points_mean": 0.0, "symmetry_mean": 0.1695,
        "fractal_dimension_mean": 0.05898, "radius_se": 0.2526, "texture_se": 0.8737,
        "perimeter_se": 1.573, "area_se": 17.41, "smoothness_se": 0.005168,
        "compactness_se": 0.006187, "concavity_se": 0.0, "concave points_se": 0.0,
        "symmetry_se": 0.01855, "fractal_dimension_se": 0.002015, "radius_worst": 12.5,
        "texture_worst": 16.05, "perimeter_worst": 79.07, "area_worst": 484.1,
        "smoothness_worst": 0.0842, "compactness_worst": 0.04635, "concavity_worst": 0.0,
        "concave points_worst": 0.0, "symmetry_worst": 0.2185,
        "fractal_dimension_worst": 0.0658,
    },
]


def _load_model():
    global _model, _scaler
    if _model is None:
        model_path = current_app.config.get("MODEL_PATH", "app/models/model.pkl")
        scaler_path = current_app.config.get("SCALER_PATH", "app/models/scaler.pkl")
        with open(model_path, "rb") as f:
            _model = pickle.load(f)
        with open(scaler_path, "rb") as f:
            _scaler = pickle.load(f)


def get_prediction(features: dict):
    _load_model()
    values = np.array([[features[name] for name in FEATURE_NAMES]])
    scaled = _scaler.transform(values)
    prediction = int(_model.predict(scaled)[0])
    probabilities = _model.predict_proba(scaled)[0]
    label = "Malignant" if prediction == 1 else "Benign"
    confidence = round(float(probabilities[prediction]) * 100, 2)
    return {
        "prediction": prediction,
        "label": label,
        "confidence": confidence,
        "probabilities": {
            "benign": round(float(probabilities[0]) * 100, 2),
            "malignant": round(float(probabilities[1]) * 100, 2),
        },
    }


def get_sample(diagnosis: str = "any") -> dict:
    """
    Return a random sample case.
    diagnosis: 'any' | 'M' | 'B' | 'malignant' | 'benign'  (case-insensitive)
    """
    d = diagnosis.strip().lower()

    if d in ("m", "malignant"):
        pool = [s for s in SAMPLE_CASES if s["diagnosis"] == "M"]
    elif d in ("b", "benign"):
        pool = [s for s in SAMPLE_CASES if s["diagnosis"] == "B"]
    else:
        pool = SAMPLE_CASES

    return random.choice(pool)


def get_features() -> list:
    return [
        {"name": name, "description": FEATURE_DESCRIPTIONS.get(name, "")}
        for name in FEATURE_NAMES
    ]