import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

const notificationStyles = {
  base: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease-out',
    borderLeft: '4px solid',
    minWidth: '300px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    opacity: 0.7,
    ':hover': { opacity: 1 },
  },
};

const typeConfig = {
  success: {
    icon: <FaCheckCircle style={{ color: '#10B981' }} />,
    bgColor: '#ECFDF5',
    borderColor: '#10B981',
    titleColor: '#065F46',
    textColor: '#047857',
  },
  error: {
    icon: <FaTimesCircle style={{ color: '#EF4444' }} />,
    bgColor: '#FEF2F2',
    borderColor: '#EF4444',
    titleColor: '#7F1D1D',
    textColor: '#B91C1C',
  },
  info: {
    icon: <FaInfoCircle style={{ color: '#3B82F6' }} />,
    bgColor: '#EFF6FF',
    borderColor: '#3B82F6',
    titleColor: '#1E3A8A',
    textColor: '#1D4ED8',
  },
};

export default function Notification({
  type = 'success',
  title,
  message,
  details,
  onClose,
  autoCloseDelay = 4000,
}) {
  const config = typeConfig[type];

  useEffect(() => {
    if (autoCloseDelay && typeof onClose === 'function') {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [onClose, autoCloseDelay]);

  return (
    <div
      style={{
        ...notificationStyles.base,
        background: config.bgColor,
        borderLeftColor: config.borderColor,
      }}
    >
      <div style={{ fontSize: '24px' }}>
        {config.icon}
      </div>

      <div style={{ flexGrow: 1 }}>
        <h3
          style={{
            margin: 0,
            color: config.titleColor,
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: '4px 0',
            color: config.textColor,
            fontSize: '0.9rem',
          }}
        >
          {message}
        </p>

        {details && (
          <p
            style={{
              margin: 0,
              fontSize: '0.8rem',
              color: config.textColor,
              opacity: 0.8,
            }}
          >
            {details}
          </p>
        )}
      </div>

      <button
        onClick={onClose}
        style={{
          ...notificationStyles.closeButton,
          color: config.textColor,
        }}
      >
        ×
      </button>
    </div>
  );
}