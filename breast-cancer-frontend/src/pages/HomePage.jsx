import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart2,
  FlaskConical,
  Brain,
  HeartPulse,
  Microscope,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard.jsx";

const features = [
  {
    icon: Brain,
    title: "Logistic Regression Model",
    desc: "Trained on 569 patient samples with 97.4% test accuracy using the Wisconsin Breast Cancer Dataset.",
    color: "teal",
  },
  {
    icon: Zap,
    title: "Instant Predictions",
    desc: "Submit 30 numerical biopsy measurements and receive a result with confidence score in milliseconds.",
    color: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Transparent AI",
    desc: "Separate benign and malignant probability scores so you can see exactly how confident the model is.",
    color: "rose",
  },
  {
    icon: FlaskConical,
    title: "Research-Grade",
    desc: "Built for learning and research. Full source code available. Not for clinical use.",
    color: "amber",
  },
];

const steps = [
  {
    num: "01",
    title: "Enter FNA Values",
    desc: "Input 30 measurements from fine needle aspiration biopsy — radius, texture, perimeter, area, and more.",
  },
  {
    num: "02",
    title: "AI Processes Data",
    desc: "The logistic regression model scales and evaluates your inputs using patterns learned from clinical data.",
  },
  {
    num: "03",
    title: "Review Results",
    desc: "Get an instant Malignant / Benign prediction with confidence score and probability breakdown.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-75 h-75 bg-blue-500/5 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-mono text-teal-400 tracking-widest uppercase">
              AI-Powered Diagnostics
            </span>
          </div>

          <h1 className="font-display font-800 text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6 animate-slide-up">
            Breast Cancer
            <br />
            <span className="text-teal-400">Prediction System</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 font-body text-base sm:text-lg leading-relaxed mb-10 animate-slide-up stagger-2">
            Enter biopsy cell measurements to receive an AI-powered Malignant or
            Benign prediction with confidence scores — trained on real clinical
            data.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up stagger-3">
            <Link
              to="/predict"
              className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto"
            >
              Start Prediction
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={HeartPulse}
            label="Model Accuracy"
            value="97.4%"
            sub="On test dataset"
            color="teal"
          />
          <StatCard
            icon={Microscope}
            label="Training Samples"
            value="569"
            sub="Patient records"
            color="blue"
          />
          <StatCard
            icon={BarChart2}
            label="Input Features"
            value="30"
            sub="FNA measurements"
            color="rose"
          />
          <StatCard
            icon={Activity}
            label="Prediction Time"
            value="<100ms"
            sub="API response"
            color="amber"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Capabilities</p>
            <h2 className="font-display font-700 text-2xl sm:text-3xl text-white">
              What makes OncoScan different
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass glass-hover rounded-2xl p-5 flex flex-col gap-4"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center
                  ${
                    f.color === "teal"
                      ? "bg-teal-500/10 text-teal-400"
                      : f.color === "blue"
                        ? "bg-blue-500/10 text-blue-400"
                        : f.color === "rose"
                          ? "bg-rose-500/10 text-rose-400"
                          : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  <f.icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-display font-600 text-sm text-slate-200 mb-1">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-body leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Process</p>
            <h2 className="font-display font-700 text-2xl sm:text-3xl text-white">
              How it works
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="glass glass-hover rounded-2xl p-6 flex gap-5 items-start"
              >
                <div className="shrink-0 font-mono font-500 text-sm text-teal-400/60 pt-0.5">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-display font-600 text-base text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-body leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/predict" className="btn-primary px-10 py-3.5 text-base">
              Try It Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
