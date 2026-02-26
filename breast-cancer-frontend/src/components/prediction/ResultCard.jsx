import { CheckCircle, AlertTriangle, TrendingUp, BarChart2 } from 'lucide-react'
import clsx from 'clsx'
import {
  RadialBarChart, RadialBar, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

function ConfidenceGauge({ value, isMalignant }) {
  const color = isMalignant ? '#f87171' : '#2dd4bf'
  const data = [{ value, fill: color }]

  return (
    <div className="relative w-40 h-40 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={225}
          endAngle={-45}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={6} background={{ fill: '#1e293b' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={clsx('font-display font-800 text-3xl', isMalignant ? 'text-red-400' : 'text-teal-400')}>
          {value}%
        </span>
        <span className="text-xs text-slate-500 font-body mt-0.5">confidence</span>
      </div>
    </div>
  )
}

function ProbabilityBar({ probabilities }) {
  const data = [
    { name: 'Benign', value: probabilities.benign, color: '#2dd4bf' },
    { name: 'Malignant', value: probabilities.malignant, color: '#f87171' },
  ]

  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis type="category" dataKey="name" width={72} tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
        <Tooltip
          formatter={(v) => [`${v}%`, 'Probability']}
          contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }}
          cursor={{ fill: 'rgba(255,255,255,0.03)' }}
        />
        <Bar dataKey="value" radius={[0, 6, 6, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default function ResultCard({ result }) {
  const isMalignant = result.prediction === 1

  return (
    <div
      className={clsx(
        "rounded-2xl border p-6 animate-slide-up",
        isMalignant
          ? "bg-red-950/20 border-red-500/25 glow-red"
          : "bg-teal-950/20 border-teal-500/25 glow-teal",
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "w-11 h-11 rounded-xl flex items-center justify-center",
              isMalignant ? "bg-red-500/15" : "bg-teal-500/15",
            )}
          >
            {isMalignant ? (
              <AlertTriangle className="w-5 h-5 text-red-400" />
            ) : (
              <CheckCircle className="w-5 h-5 text-teal-400" />
            )}
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-0.5">
              Diagnosis
            </p>
            <h2
              className={clsx(
                "font-display font-700 text-2xl",
                isMalignant ? "text-red-400" : "text-teal-400",
              )}
            >
              {result.label}
            </h2>
          </div>
        </div>

        <span
          className={clsx(
            "text-xs font-mono px-3 py-1.5 rounded-full border",
            isMalignant
              ? "bg-red-500/10 text-red-400 border-red-500/20"
              : "bg-teal-500/10 text-teal-400 border-teal-500/20",
          )}
        >
          {isMalignant ? "HIGH RISK" : "LOW RISK"}
        </span>
      </div>

      {/* Gauge + Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 self-start">
            <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Confidence Score
            </span>
          </div>
          <ConfidenceGauge
            value={result.confidence}
            isMalignant={isMalignant}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Probabilities
            </span>
          </div>
          <ProbabilityBar probabilities={result.probabilities} />
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="bg-teal-500/5 border border-teal-500/15 rounded-xl p-3 text-center">
              <p className="text-xl font-display font-700 text-teal-400">
                {result.probabilities.benign}%
              </p>
              <p className="text-xs text-slate-500 font-body mt-0.5">Benign</p>
            </div>
            <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-3 text-center">
              <p className="text-xl font-display font-700 text-red-400">
                {result.probabilities.malignant}%
              </p>
              <p className="text-xs text-slate-500 font-body mt-0.5">
                Malignant
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-slate-800/60 pt-4">
        <p className="text-xs text-slate-600 font-body leading-relaxed">
          ⚠️ This result is generated by an AI model and is intended for
          research purposes only. Always consult a qualified medical
          professional for clinical diagnosis.
        </p>
      </div>
    </div>
  );
}
