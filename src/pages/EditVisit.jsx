// src/pages/EditVisit.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VisitForm from '../components/VisitForm'
import ConfirmModal from '../components/ConfirmModal'

export default function EditVisit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [visit, setVisit] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const storedVisits = JSON.parse(localStorage.getItem('visits')) || []
    const found = storedVisits.find((v) => v.id === Number(id))
    if (found) {
      setVisit(found)
    } else {
      // Se não encontrou, voltar para Dashboard
      navigate('/')
    }
  }, [id, navigate])

  function handleSave(data) {
    // Atualizar dados no localStorage
    const storedVisits = JSON.parse(localStorage.getItem('visits')) || []
    const updatedVisits = storedVisits.map((v) =>
      v.id === Number(id) ? { ...v, ...data } : v
    )
    localStorage.setItem('visits', JSON.stringify(updatedVisits))
    navigate('/')
  }

  function handleCancel() {
    navigate('/')
  }

  // Botão "Cancelar visita"
  function handleDelete() {
    setIsModalOpen(true)
  }

  // Confirma "Sim, quero cancelar a visita"
  function confirmCancel() {
    const storedVisits = JSON.parse(localStorage.getItem('visits')) || []
    const updatedVisits = storedVisits.map((v) =>
      v.id === Number(id) ? { ...v, status: 'cancelada' } : v
    )
    localStorage.setItem('visits', JSON.stringify(updatedVisits))
    setIsModalOpen(false)
    navigate('/')
  }

  return (
    <div
      className="card-overlay"
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '1200px',
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(8px)',
        zIndex: '1000',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <h2 style={{
        marginTop: '1.4rem',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'left',
        letterSpacing: '-0.025em',
        paddingBottom: '1rem'
      }}>Editar visita</h2>
      {visit && (
        <>
          <VisitForm
            initialData={visit}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete} // Exibe botão "Cancelar visita" no form
          />

          <ConfirmModal
            title="Cancelamento"
            message="Tem certeza que deseja cancelar essa visita?"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={confirmCancel}
          />
        </>
      )}
    </div>
  )
}
