import React from 'react'

export default function ConfirmModal({ title, message, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <div className="confirm-modal-header">
          <h3 className="confirm-modal-subtitle">{title}</h3>
          <p className="confirm-modal-main-message">{message}</p>
        </div>
        <div className="confirm-modal-footer">
          <button className="confirm-modal-btn confirm-modal-cancel" onClick={onClose}>
            Não
          </button>
          <button className="confirm-modal-btn confirm-modal-confirm" onClick={onConfirm}>
            Sim, quero cancelar a visita
          </button>
        </div>
      </div>
    </div>
  )
}