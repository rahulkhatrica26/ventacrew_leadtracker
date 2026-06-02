import Modal from './Modal'

export default function DeleteModal({ show, onClose, onConfirm, name }) {
  return (
    <Modal show={show} onClose={onClose} maxW="max-w-sm">
      <div className="bg-ink-700 border border-red-500/20 rounded-2xl p-6">
        <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center mb-4 text-red-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
          </svg>
        </div>
        <h3 className="text-base font-bold mb-1">Delete prospect?</h3>
        <p className="text-sm text-white/40 mb-5 leading-relaxed">
          <span className="text-white/70">{name}</span> will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2 text-sm border border-white/10 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition-all">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2 text-sm font-semibold border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/10 transition-all">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}
