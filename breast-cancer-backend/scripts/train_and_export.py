"""
Run this script ONCE to train the model and export model.pkl + scaler.pkl
into app/models/ before starting the Flask server.

Usage:
    python scripts/train_and_export.py --data path/to/data.csv
"""

import os
import sys
import argparse
import pickle
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report


def train(data_path: str):
    print(f"[INFO] Loading dataset from: {data_path}")
    df = pd.read_csv(data_path)

    # Drop empty column if present
    if "Unnamed: 32" in df.columns:
        df.drop("Unnamed: 32", axis=1, inplace=True)

    # Encode target
    df["diagnosis"] = df["diagnosis"].map({"M": 1, "B": 0})

    X = df.drop("diagnosis", axis=1)
    y = df["diagnosis"]

    print(f"[INFO] Dataset shape: {X.shape}")
    print(f"[INFO] Class distribution:\n{y.value_counts()}")

    # Train / test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Scale
    scaler = StandardScaler()
    scaler.fit(X_train)
    X_train_scaled = scaler.transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Train
    model = LogisticRegression(max_iter=10000, random_state=42)
    model.fit(X_train_scaled, y_train)

    # Evaluate
    y_pred = model.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)
    print(f"\n[INFO] Test Accuracy: {acc * 100:.2f}%")
    print("\n[INFO] Classification Report:")
    print(classification_report(y_test, y_pred, target_names=["Benign", "Malignant"]))

    # Export
    os.makedirs("app/models", exist_ok=True)

    model_path = "app/models/model.pkl"
    scaler_path = "app/models/scaler.pkl"

    with open(model_path, "wb") as f:
        pickle.dump(model, f)

    with open(scaler_path, "wb") as f:
        pickle.dump(scaler, f)

    print(f"\n[SUCCESS] Model saved to: {model_path}")
    print(f"[SUCCESS] Scaler saved to: {scaler_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train breast cancer prediction model")
    parser.add_argument(
        "--data",
        type=str,
        default="dataset/data.csv",
        help="Path to the CSV dataset file (default: dataset/data.csv)"
    )
    args = parser.parse_args()

    if not os.path.exists(args.data):
        print(f"[ERROR] Dataset not found at: {args.data}")
        sys.exit(1)

    train(args.data)
