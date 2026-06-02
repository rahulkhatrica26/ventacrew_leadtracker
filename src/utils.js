import { STORAGE_KEY, SEED_DATA } from './constants'

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })

export const fmtVal = (v) =>
  v && v > 0 ? '€' + Number(v).toLocaleString('en') : '—'

export function loadProspects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : SEED_DATA
  } catch {
    return SEED_DATA
  }
}

export function saveProspects(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}
