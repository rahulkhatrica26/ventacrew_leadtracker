import { useState, useEffect, useCallback } from 'react'
import { STAGES, STAGE_META } from './constants'
import { uid, fmtDate, fmtVal, loadProspects, saveProspects } from './utils'
import CounterCard from './components/CounterCard'
import StageBadge from './components/StageBadge'
import ProspectModal from './components/ProspectModal'
import DeleteModal from './components/DeleteModal'

export default function App() {
  const [prospects, setProspects]     = useState(loadProspects)
  const [search, setSearch]           = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [showAdd, setShowAdd]         = useState(false)
  const [editTarget, setEditTarget]   = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  // Persist on every change
  useEffect(() => { saveProspects(prospects) }, [prospects])

  // ⌘K / Ctrl+K → focus search
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.getElementById('search-input')?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  /* ─── Mutations ─── */
  const addProspect = useCallback((data) => {
    setProspects((prev) => [
      { id: uid(), date: new Date().toISOString().slice(0, 10), ...data },
      ...prev,
    ])
    setShowAdd(false)
  }, [])

  const updateProspect = useCallback((data) => {
    setProspects((prev) => prev.map((p) => (p.id === editTarget?.id ? { ...p, ...data } : p)))
    setEditTarget(null)
  }, [editTarget])

  const deleteProspect = useCallback(() => {
    setProspects((prev) => prev.filter((p) => p.id !== deleteTarget?.id))
    setDeleteTarget(null)
  }, [deleteTarget])

  /* ─── Filter ─── */
  const filtered = prospects.filter((p) => {
    const q = search.toLowerCase()
    const matchStage  = !stageFilter || p.stage === stageFilter
    const matchSearch = !q
      || p.name.toLowerCase().includes(q)
      || (p.company ?? '').toLowerCase().includes(q)
      || (p.email ?? '').toLowerCase().includes(q)
    return matchStage && matchSearch
  })

  const counts = STAGES.reduce((acc, s) => {
    acc[s] = prospects.filter((p) => p.stage === s).length
    return acc
  }, {})

  const toggleStage = (s) => setStageFilter((prev) => (prev === s ? '' : s))

  return (
    <div className="min-h-screen bg-ink-900 flex flex-col text-white font-sans">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 sticky top-0 bg-ink-900 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center text-ink-900 font-bold text-sm select-none">
            VC
          </div>
          <div>
            <div className="text-sm font-bold leading-tight">LeadTracker</div>
            <div className="text-[10px] font-mono tracking-widest text-yellow-400/70 uppercase">
              VantaCrew
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gold text-ink-900 text-sm font-semibold rounded-lg hover:bg-gold-dark transition-colors active:scale-95"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Prospect
        </button>
      </header>

      {/* ── Counters ── */}
      <div className="flex overflow-x-auto border-b border-white/5">
        <CounterCard
          label="All" count={prospects.length}
          active={!stageFilter} color="#F5C842"
          onClick={() => setStageFilter('')}
        />
        {STAGES.map((s) => (
          <CounterCard
            key={s} label={s} count={counts[s]}
            active={stageFilter === s} color={STAGE_META[s].color}
            onClick={() => toggleStage(s)}
          />
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-white/5">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            id="search-input"
            className="w-full bg-ink-700 border border-white/8 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-yellow-400/50 transition-colors"
            placeholder="Search prospects…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="bg-ink-700 border border-white/8 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-yellow-400/50 transition-colors cursor-pointer"
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
        >
          <option value="">All stages</option>
          {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="ml-auto text-xs font-mono text-white/25">
          {filtered.length} prospect{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-auto px-6 py-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-white/20">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p className="text-sm font-mono">
              {prospects.length === 0 ? 'No prospects yet' : 'No results found'}
            </p>
            {prospects.length === 0 && (
              <button onClick={() => setShowAdd(true)}
                className="text-xs text-yellow-400/60 hover:text-yellow-400 transition-colors font-mono mt-1">
                + Add your first prospect
              </button>
            )}
          </div>
        ) : (
          <table className="w-full text-sm border-separate" style={{ borderSpacing: '0 2px' }}>
            <thead>
              <tr>
                {['Prospect', 'Stage', 'Email', 'Value', 'Notes', 'Added', ''].map((h, i) => (
                  <th key={i}
                    className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-white/25 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="group hover:bg-ink-700 transition-colors rounded-xl">
                  <td className="px-4 py-3 rounded-l-xl">
                    <div className="font-semibold text-white leading-tight">{p.name}</div>
                    {p.company && <div className="text-xs text-white/35 mt-0.5">{p.company}</div>}
                  </td>
                  <td className="px-4 py-3"><StageBadge stage={p.stage} /></td>
                  <td className="px-4 py-3">
                    {p.email ? (
                      <a href={`mailto:${p.email}`}
                        className="flex items-center gap-1.5 text-white/40 hover:text-yellow-400 transition-colors text-xs font-mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span className="truncate max-w-[160px]">{p.email}</span>
                      </a>
                    ) : <span className="text-white/15">—</span>}
                  </td>
                  <td className="px-4 py-3 font-mono text-white/70 text-xs">{fmtVal(p.value)}</td>
                  <td className="px-4 py-3">
                    {p.notes
                      ? <span className="text-xs text-white/30 truncate block max-w-[180px]" title={p.notes}>{p.notes}</span>
                      : <span className="text-white/15">—</span>}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-white/25">{fmtDate(p.date)}</td>
                  <td className="px-3 py-3 rounded-r-xl">
                    <div className="flex items-center gap-1.5 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditTarget(p)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/10 text-white/30 hover:text-yellow-400 hover:border-yellow-400/30 hover:bg-yellow-400/5 transition-all"
                        title="Edit">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button onClick={() => setDeleteTarget(p)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/10 text-white/30 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all"
                        title="Delete">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Modals ── */}
      <ProspectModal show={showAdd}      onClose={() => setShowAdd(false)}   onSave={addProspect}    initial={null}       />
      <ProspectModal show={!!editTarget} onClose={() => setEditTarget(null)} onSave={updateProspect} initial={editTarget} />
      <DeleteModal   show={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={deleteProspect} name={deleteTarget?.name} />
    </div>
  )
}
