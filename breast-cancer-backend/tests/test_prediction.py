import pytest
from app import create_app


@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_health_check(client):
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.get_json()
    assert data["status"] == "ok"


def test_get_features(client):
    res = client.get("/api/v1/features")
    assert res.status_code == 200
    data = res.get_json()
    assert data["success"] is True
    assert "features" in data["data"]
    assert len(data["data"]["features"]) == 31


def test_get_sample(client):
    res = client.get("/api/v1/sample")
    assert res.status_code == 200
    data = res.get_json()
    assert "sample" in data["data"]


def test_predict_missing_body(client):
    res = client.post("/api/v1/predict", content_type="application/json")
    assert res.status_code == 400


def test_predict_missing_features_key(client):
    res = client.post("/api/v1/predict", json={"wrong_key": {}})
    assert res.status_code == 422


def test_predict_missing_feature_values(client):
    res = client.post("/api/v1/predict", json={"features": {"radius_mean": 17.99}})
    assert res.status_code == 422


def test_predict_invalid_feature_type(client):
    sample_features = {
        "id": 1,
        "radius_mean": "not_a_number",
        "texture_mean": 10.38, "perimeter_mean": 122.80, "area_mean": 1001.0,
        "smoothness_mean": 0.1184, "compactness_mean": 0.2776, "concavity_mean": 0.3001,
        "concave_points_mean": 0.1471, "symmetry_mean": 0.2419, "fractal_dimension_mean": 0.07871,
        "radius_se": 1.095, "texture_se": 0.9053, "perimeter_se": 8.589, "area_se": 153.4,
        "smoothness_se": 0.006399, "compactness_se": 0.04904, "concavity_se": 0.05373,
        "concave_points_se": 0.01587, "symmetry_se": 0.03003, "fractal_dimension_se": 0.006193,
        "radius_worst": 25.38, "texture_worst": 17.33, "perimeter_worst": 184.6, "area_worst": 2019.0,
        "smoothness_worst": 0.1622, "compactness_worst": 0.6656, "concavity_worst": 0.7119,
        "concave_points_worst": 0.2654, "symmetry_worst": 0.4601, "fractal_dimension_worst": 0.1189,
    }
    res = client.post("/api/v1/predict", json={"features": sample_features})
    assert res.status_code == 422
