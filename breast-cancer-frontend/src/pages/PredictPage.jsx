import { useState, useCallback } from "react";
import { Sparkles, RotateCcw, Shuffle, ChevronRight, Info } from "lucide-react";
import { usePrediction } from "@/hooks/usePrediction";
import {
  FEATURE_GROUPS,
  ALL_FEATURE_KEYS,
  EMPTY_FORM,
} from "@/util/featureGroups";
import FeatureGroup from "@/components/prediction/FeatureGroup";
import ResultCard from "@/components/prediction/ResultCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "react-toastify";

const syne = { fontFamily: "Syne, sans-serif" };

function validate(values) {
  const errors = {};
  ALL_FEATURE_KEYS.forEach((key) => {
    const v = values[key];
    if (v === "" || v === null || v === undefined) {
      errors[key] = "Required";
    } else if (isNaN(Number(v))) {
      errors[key] = "Must be a number";
    }
  });
  return errors;
}

export default function PredictPage() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const { result, loading, runPrediction, loadSample, reset } = usePrediction();

  const handleChange = useCallback((key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error(
        `${Object.keys(errs).length} field(s) are missing or invalid`,
      );
      return;
    }
    const numericValues = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, Number(v)]),
    );
    await runPrediction(numericValues);
  };

  const handleLoadSample = (type = "any") => {
    const sample = loadSample(type);
    if (sample) {
      const mapped = {};
      ALL_FEATURE_KEYS.forEach((key) => {
        mapped[key] = sample[key] ?? "";
      });
      setValues(mapped);
      setErrors({});
    }
  };

  const handleReset = () => {
    setValues(EMPTY_FORM);
    setErrors({});
    reset();
  };

  const filledCount = ALL_FEATURE_KEYS.filter((k) => values[k] !== "").length;
  const progress = Math.round((filledCount / ALL_FEATURE_KEYS.length) * 100);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8 animate-slide-up">
          <div
            className="flex items-center gap-2 text-xs text-slate-600 mb-4"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-teal-400">Prediction</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl text-white mb-2 font-extrabold"
            style={syne}
          >
            Run Cancer Analysis
          </h1>
          <p className="text-slate-500 text-sm">
            Fill in all 30 FNA biopsy measurements below. Use the sample loader
            to test with a known case.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 animate-slide-up stagger-2">
          <div className="flex items-center gap-3">
            <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              {filledCount}/{ALL_FEATURE_KEYS.length} fields
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => handleLoadSample("any")}
              className="btn-secondary text-xs py-2 px-4 gap-1.5"
            >
              <Shuffle className="w-3.5 h-3.5" /> Random
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample("benign")}
              className="text-xs py-2 px-4 gap-1.5 inline-flex items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 cursor-pointer"
              style={{
                background: "rgba(45,212,191,0.08)",
                borderColor: "rgba(45,212,191,0.25)",
                color: "#2dd4bf",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" /> Benign
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample("malignant")}
              className="text-xs py-2 px-4 gap-1.5 inline-flex items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 cursor-pointer"
              style={{
                background: "rgba(239,68,68,0.08)",
                borderColor: "rgba(239,68,68,0.25)",
                color: "#f87171",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Malignant
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary text-xs py-2 px-4 gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div
          className="glass rounded-xl px-4 py-3 flex gap-3 items-start mb-6"
          style={{ borderColor: "rgba(59,130,246,0.15)" }}
        >
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            These measurements come from digitized images of fine needle
            aspirate (FNA) of breast masses. Values describe characteristics of
            cell nuclei present in the image.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 mb-8">
            {FEATURE_GROUPS.map((group) => (
              <FeatureGroup
                key={group.id}
                group={group}
                values={values}
                onChange={handleChange}
                errors={errors}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-12 py-4 text-base gap-3 min-w-55"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" /> Analysing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Analyse Sample
                </>
              )}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-10">
            <p className="section-label mb-4">Prediction Result</p>
            <ResultCard result={result} />
          </div>
        )}
      </div>
    </div>
  );
}
