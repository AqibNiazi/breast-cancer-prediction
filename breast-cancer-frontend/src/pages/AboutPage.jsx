import { ExternalLink, Github, BookOpen, Database, Code2, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'

const techStack = [
  { icon: Code2, name: 'React + Vite', desc: 'Frontend framework', color: 'teal' },
  { icon: Layers, name: 'Tailwind CSS', desc: 'Utility-first styling', color: 'blue' },
  { icon: Code2, name: 'Flask', desc: 'Python REST API', color: 'rose' },
  { icon: Database, name: 'scikit-learn', desc: 'ML model training', color: 'amber' },
]

const modelInfo = [
  { label: 'Algorithm', value: 'Logistic Regression' },
  { label: 'Dataset', value: 'Wisconsin Breast Cancer (UCI)' },
  { label: 'Total Samples', value: '569 patient records' },
  { label: 'Training Split', value: '80% (455 samples)' },
  { label: 'Test Split', value: '20% (114 samples)' },
  { label: 'Test Accuracy', value: '97.4%' },
  { label: 'Features Used', value: '30 FNA measurements' },
  { label: 'Feature Scaling', value: 'StandardScaler (z-score)' },
  { label: 'Class Distribution', value: '357 Benign / 212 Malignant' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12 animate-slide-up">
          <p className="section-label mb-3">About This Project</p>
          <h1 className="font-display font-800 text-3xl sm:text-4xl text-white mb-4">
            OncoScan — How It Works
          </h1>
          <p className="text-slate-400 font-body leading-relaxed text-base">
            A full-stack machine learning web application for breast cancer prediction,
            built with Flask, React, and scikit-learn. This is an educational project
            demonstrating how ML models can be deployed as production-ready APIs.
          </p>
        </div>

        {/* Disclaimer banner */}
        <div className="bg-amber-950/30 border border-amber-500/20 rounded-2xl p-5 mb-10 animate-slide-up stagger-1">
          <h3 className="font-display font-600 text-amber-400 text-sm mb-1">⚠️ Medical Disclaimer</h3>
          <p className="text-xs text-slate-500 font-body leading-relaxed">
            This tool is for <strong className="text-slate-400">research and educational purposes only</strong>.
            It is not a substitute for professional medical advice, diagnosis, or treatment.
            Always seek the advice of a qualified healthcare provider with any questions you may have
            regarding a medical condition.
          </p>
        </div>

        {/* Dataset */}
        <section className="mb-12 animate-slide-up stagger-2">
          <div className="flex items-center gap-2 mb-5">
            <Database className="w-4 h-4 text-teal-400" />
            <h2 className="font-display font-700 text-lg text-white">Dataset</h2>
          </div>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800/60">
              <p className="text-sm text-slate-400 font-body leading-relaxed">
                The <strong className="text-slate-300">Wisconsin Breast Cancer Dataset</strong> (UCI ML Repository)
                contains features computed from digitized images of fine needle aspirate (FNA) of breast masses.
                Features describe characteristics of cell nuclei present in the image.
              </p>
            </div>
            <div className="divide-y divide-slate-800/40">
              {modelInfo.map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center px-5 py-3.5">
                  <span className="text-xs font-mono text-slate-500">{label}</span>
                  <span className="text-sm font-body font-500 text-slate-300">{value}</span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-800/60">
              <Link
                to="https://www.kaggle.com/datasets/uciml/breast-cancer-wisconsin-data"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-teal-400 hover:text-teal-300 transition-colors font-mono"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Dataset on Kaggle
              </Link>
            </div>
          </div>
        </section>

        {/* Features explained */}
        <section className="mb-12 animate-slide-up stagger-3">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <h2 className="font-display font-700 text-lg text-white">Understanding the Features</h2>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-sm text-slate-400 font-body leading-relaxed mb-4">
              For each cell nucleus, 10 real-valued features are computed. Three types of values
              are captured for each, resulting in 30 features total:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Mean', desc: 'Average value across all nuclei in the sample', color: 'teal' },
                { label: 'Standard Error (SE)', desc: 'Statistical uncertainty of the mean measurement', color: 'blue' },
                { label: 'Worst', desc: 'The largest (most extreme) value found in the sample', color: 'rose' },
              ].map(({ label, desc, color }) => (
                <div key={label} className={`rounded-xl p-4 border ${
                  color === 'teal' ? 'bg-teal-500/5 border-teal-500/15' :
                  color === 'blue' ? 'bg-blue-500/5 border-blue-500/15' :
                  'bg-rose-500/5 border-rose-500/15'
                }`}>
                  <h4 className={`font-display font-600 text-sm mb-1 ${
                    color === 'teal' ? 'text-teal-400' :
                    color === 'blue' ? 'text-blue-400' : 'text-rose-400'
                  }`}>{label}</h4>
                  <p className="text-xs text-slate-500 font-body leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="mb-12 animate-slide-up stagger-4">
          <div className="flex items-center gap-2 mb-5">
            <Code2 className="w-4 h-4 text-rose-400" />
            <h2 className="font-display font-700 text-lg text-white">Tech Stack</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {techStack.map(({ icon: Icon, name, desc, color }) => (
              <div key={name} className="glass glass-hover rounded-2xl p-4 flex flex-col gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  color === 'teal' ? 'bg-teal-500/10 text-teal-400' :
                  color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                  color === 'rose' ? 'bg-rose-500/10 text-rose-400' :
                  'bg-amber-500/10 text-amber-400'
                }`}>
                  <Icon className="w-4 h-4" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-display font-600 text-sm text-slate-200">{name}</p>
                  <p className="text-xs text-slate-600 font-body mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub */}
        <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up stagger-5">
          <div>
            <h3 className="font-display font-700 text-base text-white mb-1">View Source Code</h3>
            <p className="text-sm text-slate-500 font-body">Full backend + frontend code available on GitHub.</p>
          </div>
          <Link
            to="https://github.com/AqibNiazi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary gap-2 shrink-0"
          >
            <Github className="w-4 h-4" />
            GitHub Repo
          </Link>
        </div>

      </div>
    </div>
  )
}
