import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackButton({ to = '/', label = 'Voltar' }) {
  const navigate = useNavigate();

  const buttonStyle = {
    background: 'white',
    fontSize: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    position: 'absolute',
    left: '40px',
    top: '70px',
    padding: '15px 40px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const labelStyle = {
    color: '#1F2A37',
    fontWeight: '500',
  };

  return (
    <button 
      onClick={() => navigate(to)} 
      style={buttonStyle} 
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'none';
        e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)';
      }}
    >
      <FaArrowLeft color="#1F2A37" size={16} />
      <span style={labelStyle}>{label}</span>
    </button>
  );
}