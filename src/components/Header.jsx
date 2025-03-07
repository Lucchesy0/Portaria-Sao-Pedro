import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VisitCard from './VisitCard';
import BackButton from './BackButton';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-logo">
          <img src="src/imgs/logo-portaria.png" alt="Portaria Remota" />
        </div>
        <div className="header-user-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span
              style={{
                color: '#6B7280',
                fontFamily: 'Inter',
                fontWeight: 'bold',
                marginRight: '0px',
              }}
            ></span>
          </div>
          <button className="botaoSair" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
      <div className="banner">
        <div className="banner-overlay">
          {location.pathname === '/' && <VisitCard />}
          {(location.pathname === '/add' || location.pathname.startsWith('/edit')) && (
            <BackButton
              style={{
                position: 'absolute',
                left: '40px',
                top: '120px',
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}