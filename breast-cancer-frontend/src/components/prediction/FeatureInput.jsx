import clsx from 'clsx'

const colorMap = {
  teal: 'border-teal-500/20 focus:border-teal-500/50 focus:ring-teal-500/20',
  blue: 'border-blue-500/20 focus:border-blue-500/50 focus:ring-blue-500/20',
  rose: 'border-rose-500/20 focus:border-rose-500/50 focus:ring-rose-500/20',
}

export default function FeatureInput({ field, value, onChange, color = 'teal', error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-body font-500 text-slate-400">
        {field.label}
      </label>
      <input
        type="number"
        step={field.step}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(field.key, e.target.value)}
        className={clsx(
          'w-full bg-slate-900/80 border rounded-xl px-4 py-2.5',
          'text-slate-200 font-mono text-sm placeholder-slate-700',
          'focus:outline-none focus:ring-1 transition-all duration-200',
          error ? 'border-red-500/50 focus:ring-red-500/20' : colorMap[color]
        )}
      />
      {error && (
        <p className="text-xs text-red-400 font-body">{error}</p>
      )}
    </div>
  )
}
