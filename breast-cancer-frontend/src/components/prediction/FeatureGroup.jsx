import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import FeatureInput from './FeatureInput'

const colorStyles = {
  teal: {
    badge: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    dot: 'bg-teal-400',
    border: 'border-teal-500/20',
    header: 'hover:border-teal-500/30',
  },
  blue: {
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    dot: 'bg-blue-400',
    border: 'border-blue-500/20',
    header: 'hover:border-blue-500/30',
  },
  rose: {
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    dot: 'bg-rose-400',
    border: 'border-rose-500/20',
    header: 'hover:border-rose-500/30',
  },
}

export default function FeatureGroup({ group, values, onChange, errors }) {
  const [open, setOpen] = useState(true)
  const styles = colorStyles[group.color] || colorStyles.teal

  const filledCount = group.fields.filter((f) => values[f.key] !== '').length

  return (
    <div className={clsx('rounded-2xl border bg-slate-900/40 overflow-hidden transition-all duration-200', styles.border, styles.header)}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className={clsx('w-2 h-2 rounded-full', styles.dot)} />
          <div>
            <h3 className="font-display font-600 text-sm text-slate-200">
              {group.label}
            </h3>
            <p className="text-xs text-slate-500 font-body mt-0.5">
              {group.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-4">
          <span className={clsx('text-xs font-mono px-2.5 py-1 rounded-full border', styles.badge)}>
            {filledCount}/{group.fields.length}
          </span>
          <ChevronDown
            className={clsx(
              'w-4 h-4 text-slate-500 transition-transform duration-200',
              open ? 'rotate-180' : ''
            )}
          />
        </div>
      </button>

      {/* Fields */}
      {open && (
        <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 border-t border-slate-800/60">
          <div className="col-span-full h-0" />
          {group.fields.map((field) => (
            <FeatureInput
              key={field.key}
              field={field}
              value={values[field.key] ?? ''}
              onChange={onChange}
              color={group.color}
              error={errors?.[field.key]}
            />
          ))}
        </div>
      )}
    </div>
  )
}
