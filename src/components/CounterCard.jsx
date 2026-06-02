export default function CounterCard({ label, count, active, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 min-w-[80px] text-left px-4 py-3 border-r border-white/5 transition-colors relative
        ${active ? 'bg-ink-600' : 'bg-ink-700 hover:bg-ink-600'}`}
    >
      {active && (
        <span
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b"
          style={{ background: color }}
        />
      )}
      <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">{label}</p>
      <p
        className="text-2xl font-bold leading-none"
        style={{ color: active && color ? color : undefined }}
      >
        {count}
      </p>
    </button>
  )
}
