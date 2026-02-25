import { useState, useCallback } from "react";
import { predict, getSampleInput } from "../services/api";
import { toast } from "react-toastify";

export function usePrediction() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runPrediction = useCallback(async (features) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await predict(features);
      setResult(res.data.data);
      toast.success("Prediction complete");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        "Failed to connect to the server. Is the backend running?";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSample = useCallback(async () => {
    try {
      const res = await getSampleInput();
      return res.data.data.sample;
    } catch {
      toast.error("Could not load sample data");
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, runPrediction, loadSample, reset };
}
