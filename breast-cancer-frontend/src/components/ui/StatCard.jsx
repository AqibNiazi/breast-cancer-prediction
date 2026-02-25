const colorStyles = {
  teal: {
    background: "rgba(45,212,191,0.1)",
    color: "#2dd4bf",
    border: "1px solid rgba(45,212,191,0.2)",
  },
  blue: {
    background: "rgba(59,130,246,0.1)",
    color: "#60a5fa",
    border: "1px solid rgba(59,130,246,0.2)",
  },
  rose: {
    background: "rgba(244,63,94,0.1)",
    color: "#fb7185",
    border: "1px solid rgba(244,63,94,0.2)",
  },
  amber: {
    background: "rgba(245,158,11,0.1)",
    color: "#fbbf24",
    border: "1px solid rgba(245,158,11,0.2)",
  },
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color = "teal",
}) {
  const iconStyle = colorStyles[color] || colorStyles.teal;

  return (
    <div className="glass glass-hover rounded-2xl p-5 flex flex-col gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={iconStyle}
      >
        <Icon className="w-5 h-5" strokeWidth={1.8} />
      </div>
      <div>
        <p
          className="text-2xl text-white"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
        >
          {value}
        </p>
        <p className="text-sm text-slate-400 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-slate-600 mt-1">{sub}</p>}
      </div>
    </div>
  );
}
