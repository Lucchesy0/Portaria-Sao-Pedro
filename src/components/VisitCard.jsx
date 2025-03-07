import React from 'react';

export default function VisitCard() {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.96)',
        borderRadius: '24px',
        padding: '2rem',
        width: '45%',
        minWidth: '320px',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        margin: '1%',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <img
        src="src/imgs/condo-logo.png"
        alt="Condomínio Logo"
        style={{
          width: '260px',
          objectFit: 'contain',
          marginLeft: '-20px',
          marginTop: '-20px',
          borderRadius: '20px',
        }}
      />
      <div>
        <hr style={{ margin: '10px 5px', width: '100%' }} />
        <p style={{ margin: 0, fontSize: '0.95rem', color: '#495057' }}>
          Apartamento 405, Bloco A
        </p>
      </div>
    </div>
  );
}