import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VisitForm from '../components/VisitForm';

export default function AddVisit() {
  const navigate = useNavigate();
  const [storedVisits, setStoredVisits] = useState([]);

  useEffect(() => {
    try {
      const localData = JSON.parse(localStorage.getItem('visits')) || [];
      setStoredVisits(localData);
    } catch (error) {
      console.error('Erro ao carregar visitas do localStorage:', error);
      setStoredVisits([]);
    }
  }, []);

  function handleSave(data) {
    const storedVisits = JSON.parse(localStorage.getItem('visits')) || [];
    const newVisit = {
      ...data,
      id: Date.now(),
      status: 'nao-realizada',
    };
    storedVisits.push(newVisit);
    localStorage.setItem('visits', JSON.stringify(storedVisits));
    navigate('/');
  }

  function handleCancel() {
    navigate('/');
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
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <h2
        style={{
          marginTop: '1.4rem',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#111827',
          textAlign: 'left',
          letterSpacing: '-0.025em',
          paddingBottom: '1rem',
        }}
      >
        Adicionar nova visita
      </h2>
      <VisitForm onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}