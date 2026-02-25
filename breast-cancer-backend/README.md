# Breast Cancer Prediction — Flask Backend

REST API for predicting breast cancer (Malignant / Benign) using Logistic Regression trained on the Wisconsin Breast Cancer Dataset.

> **Input type:** 31 numerical values from fine needle aspiration (FNA) biopsy measurements — NOT images.

---

## Project Structure

```
breast-cancer-backend/
├── app/
│   ├── __init__.py          # App factory
│   ├── models/              # Stores model.pkl & scaler.pkl (git-ignored)
│   ├── routes/
│   │   ├── health.py        # GET /api/health
│   │   └── prediction.py    # POST /api/v1/predict, GET /api/v1/features, GET /api/v1/sample
│   ├── services/
│   │   └── prediction_service.py   # ML inference logic
│   └── utils/
│       ├── validators.py           # Input validation
│       └── response_helpers.py     # Standardised JSON responses
├── config/
│   └── settings.py          # Dev / Prod / Test configs
├── scripts/
│   └── train_and_export.py  # One-time training script
├── tests/
│   └── test_prediction.py
├── .env.example
├── requirements.txt
└── run.py
```

---

## Setup & Run

### 1. Clone & create virtual environment
```bash
git clone <your-repo>
cd breast-cancer-backend

python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure environment
```bash
cp .env.example .env
# Edit .env if needed
```

## Getting Started After Cloning

1. Download `data.csv` from https://www.kaggle.com/datasets/uciml/breast-cancer-wisconsin-data
2. Place it at `dataset/data.csv`
3. Run the training script to generate model files:
```bash
   python scripts/train_and_export.py --data dataset/data.csv
```

### 4. Place your dataset
```bash
mkdir dataset
cp /path/to/data.csv dataset/data.csv
```

### 5. Train and export model (run ONCE)
```bash
python scripts/train_and_export.py --data dataset/data.csv
```

This saves `app/models/model.pkl` and `app/models/scaler.pkl`.

### 6. Start the server
```bash
python run.py
```

Server runs at: `http://localhost:5000`

---

## API Reference

### Health Check
```
GET /api/health
```
Response:
```json
{ "status": "ok", "message": "Breast Cancer Prediction API is running" }
```

---

### Get Feature List
```
GET /api/v1/features
```
Returns all 31 expected input features with descriptions.

---

### Get Sample Input
```
GET /api/v1/sample
```
Returns a sample malignant case (from the dataset) you can use for testing.

---

### Predict
```
POST /api/v1/predict
Content-Type: application/json
```

**Request body:**
```json
{
  "features": {
    "id": 842302,
    "radius_mean": 17.99,
    "texture_mean": 10.38,
    "perimeter_mean": 122.80,
    "area_mean": 1001.0,
    "smoothness_mean": 0.1184,
    "compactness_mean": 0.2776,
    "concavity_mean": 0.3001,
    "concave_points_mean": 0.1471,
    "symmetry_mean": 0.2419,
    "fractal_dimension_mean": 0.07871,
    "radius_se": 1.095,
    "texture_se": 0.9053,
    "perimeter_se": 8.589,
    "area_se": 153.4,
    "smoothness_se": 0.006399,
    "compactness_se": 0.04904,
    "concavity_se": 0.05373,
    "concave_points_se": 0.01587,
    "symmetry_se": 0.03003,
    "fractal_dimension_se": 0.006193,
    "radius_worst": 25.38,
    "texture_worst": 17.33,
    "perimeter_worst": 184.6,
    "area_worst": 2019.0,
    "smoothness_worst": 0.1622,
    "compactness_worst": 0.6656,
    "concavity_worst": 0.7119,
    "concave_points_worst": 0.2654,
    "symmetry_worst": 0.4601,
    "fractal_dimension_worst": 0.1189
  }
}
```

**Success response:**
```json
{
  "success": true,
  "data": {
    "prediction": 1,
    "label": "Malignant",
    "confidence": 98.24,
    "probabilities": {
      "benign": 1.76,
      "malignant": 98.24
    }
  }
}
```

**Error response:**
```json
{
  "success": false,
  "error": "Missing required features: texture_mean, area_mean"
}
```

---

## Running Tests
```bash
pytest tests/ -v
```

---

## Notes for the Notebook

One minor bug was found in `breast-cancer-prediction.ipynb`:

```python
# Cell 12 — incorrect (missing parentheses, class not instance)
le = LabelEncoder

# Should be:
le = LabelEncoder()
```

This doesn't cause any runtime errors since `le` was never actually used (you used `.map()` directly instead — which is the correct approach). But it's worth fixing for clarity.
