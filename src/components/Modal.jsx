import { useEffect } from 'react'

export default function Modal({ show, onClose, children, maxW = 'max-w-lg' }) {
  useEffect(() => {
    if (!show) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [show, onClose])

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fadeIn"
      onClick={onClose}
    >
      <div className={`w-full ${maxW} animate-slideUp`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
