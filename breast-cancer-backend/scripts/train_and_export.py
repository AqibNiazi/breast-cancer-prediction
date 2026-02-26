"""
Train and export the breast cancer prediction model.

Usage:
    python scripts/train_and_export.py --data dataset/data.csv
"""

import argparse
import os
import pickle

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", required=True, help="Path to data.csv")
    args = parser.parse_args()

    # ── Load ──────────────────────────────────────────────────────────────────
    print(f"Loading data from: {args.data}")
    df = pd.read_csv(args.data)

    # Drop unnamed trailing column if present (common in this dataset)
    df = df.loc[:, ~df.columns.str.contains("^Unnamed")]

    # ── Normalise column names ────────────────────────────────────────────────
    # The raw CSV uses "concave points_mean" (space before underscore).
    # Rename to "concave_points_mean" so all names are consistent underscores.
    df.columns = df.columns.str.strip()
    df = df.rename(columns={
        "concave points_mean":  "concave_points_mean",
        "concave points_se":    "concave_points_se",
        "concave points_worst": "concave_points_worst",
    })

    print(f"Dataset shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")

    # ── Features & target ─────────────────────────────────────────────────────
    feature_cols = [
        "radius_mean", "texture_mean", "perimeter_mean", "area_mean",
        "smoothness_mean", "compactness_mean", "concavity_mean",
        "concave_points_mean", "symmetry_mean", "fractal_dimension_mean",
        "radius_se", "texture_se", "perimeter_se", "area_se",
        "smoothness_se", "compactness_se", "concavity_se",
        "concave_points_se", "symmetry_se", "fractal_dimension_se",
        "radius_worst", "texture_worst", "perimeter_worst", "area_worst",
        "smoothness_worst", "compactness_worst", "concavity_worst",
        "concave_points_worst", "symmetry_worst", "fractal_dimension_worst",
    ]

    X = df[feature_cols].values
    y = df["diagnosis"].map({"M": 1, "B": 0}).values

    print(f"\nClass distribution — Malignant: {y.sum()}, Benign: {(y == 0).sum()}")

    # ── Split ─────────────────────────────────────────────────────────────────
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"Train: {len(X_train)} | Test: {len(X_test)}")

    # ── Scale ─────────────────────────────────────────────────────────────────
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # ── Train ─────────────────────────────────────────────────────────────────
    model = LogisticRegression(max_iter=10000, random_state=42)
    model.fit(X_train_scaled, y_train)

    # ── Evaluate ──────────────────────────────────────────────────────────────
    train_acc = model.score(X_train_scaled, y_train)
    test_acc = model.score(X_test_scaled, y_test)
    print(f"\nTrain accuracy : {train_acc * 100:.2f}%")
    print(f"Test  accuracy : {test_acc * 100:.2f}%")

    # ── Export ────────────────────────────────────────────────────────────────
    os.makedirs("app/models", exist_ok=True)

    model_path = "app/models/model.pkl"
    scaler_path = "app/models/scaler.pkl"

    with open(model_path, "wb") as f:
        pickle.dump(model, f)

    with open(scaler_path, "wb") as f:
        pickle.dump(scaler, f)

    print(f"\nModel  saved → {model_path}")
    print(f"Scaler saved → {scaler_path}")
    print("\nDone ✓")


if __name__ == "__main__":
    main()