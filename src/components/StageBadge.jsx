import { STAGE_META } from '../constants'

export default function StageBadge({ stage }) {
  const m = STAGE_META[stage] ?? STAGE_META['New']
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium ${m.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {stage}
    </span>
  )
}
