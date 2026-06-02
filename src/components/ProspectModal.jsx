import { useState, useEffect, useRef } from 'react'
import Modal from './Modal'
import { STAGES } from '../constants'

const BLANK = { name: '', company: '', email: '', stage: 'New', value: '', notes: '' }

const inputCls =
  'w-full bg-ink-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-yellow-400/60 transition-colors'
const labelCls =
  'block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1.5'

export default function ProspectModal({ show, onClose, onSave, initial }) {
  const [form, setForm] = useState(BLANK)
  const [err, setErr] = useState('')
  const nameRef = useRef()

  useEffect(() => {
    if (!show) return
    setForm(initial ? { ...initial, value: initial.value || '' } : BLANK)
    setErr('')
    setTimeout(() => nameRef.current?.focus(), 60)
  }, [show, initial])

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSave = () => {
    if (!form.name.trim()) {
      setErr('Name is required')
      nameRef.current?.focus()
      return
    }
    onSave({ ...form, name: form.name.trim(), value: parseFloat(form.value) || 0 })
  }

  return (
    <Modal show={show} onClose={onClose}>
      <div className="bg-ink-700 border border-white/10 rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold">{initial ? 'Edit Prospect' : 'New Prospect'}</h2>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelCls}>Name *</label>
            <input
              ref={nameRef}
              className={`${inputCls} ${err ? 'border-red-500' : ''}`}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => { set('name', e.target.value); setErr('') }}
            />
            {err && <p className="text-red-400 text-xs mt-1 font-mono">{err}</p>}
          </div>

          <div>
            <label className={labelCls}>Company</label>
            <input className={inputCls} placeholder="Company name" value={form.company}
              onChange={(e) => set('company', e.target.value)} />
          </div>

          <div>
            <label className={labelCls}>Stage</label>
            <select className={inputCls} value={form.stage} onChange={(e) => set('stage', e.target.value)}>
              {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Email</label>
            <input className={inputCls} type="email" placeholder="email@example.com"
              value={form.email} onChange={(e) => set('email', e.target.value)} />
          </div>

          <div>
            <label className={labelCls}>Deal Value (€)</label>
            <input className={inputCls} type="number" placeholder="0" min="0"
              value={form.value} onChange={(e) => set('value', e.target.value)} />
          </div>

          <div className="col-span-2">
            <label className={labelCls}>Notes</label>
            <textarea
              className={inputCls} rows={3} placeholder="Context, next steps…"
              value={form.notes} onChange={(e) => set('notes', e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSave() }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-5 justify-end">
          <button onClick={onClose}
            className="px-4 py-2 text-sm text-white/50 border border-white/10 rounded-lg hover:bg-white/5 hover:text-white transition-all">
            Cancel
          </button>
          <button onClick={handleSave}
            className="px-5 py-2 text-sm font-semibold bg-gold text-ink-900 rounded-lg hover:bg-gold-dark transition-colors active:scale-95">
            {initial ? 'Save Changes' : 'Add Prospect'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
