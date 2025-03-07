import React from 'react';
import { FaFilter } from 'react-icons/fa';

const filterStyle = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid#c2c4c6',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  activeButton: {
    background: '#3B82F6',
    color: 'white',
  },
};

export default function VisitFilter({ selectedFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'Todas' },
    { value: 'nao-realizada', label: 'Agendadas' },
    { value: 'realizada', label: 'Realizadas' },
    { value: 'cancelada', label: 'Canceladas' },
  ];

  return (
    <div style={filterStyle.container}>
      <span style={{ fontWeight: '500', color: '#1F2A37' }}>Filtrar:</span>
      {filters.map((filter) => (
        <button
          key={filter.value}
          style={{
            ...filterStyle.button,
            ...(selectedFilter === filter.value && filterStyle.activeButton),
          }}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.value === 'all' && <FaFilter />}
          {filter.label}
        </button>
      ))}
    </div>
  );
}