import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';

function StatusBadge({ status }) {
  let badgeClass = 'status-badge ';
  let text = '';

  switch (status) {
    case 'nao-realizada':
      badgeClass += 'status-nao-realizada';
      text = 'Visita não realizada';
      break;
    case 'cancelada':
      badgeClass += 'status-cancelada';
      text = 'Cancelada';
      break;
    case 'realizada':
      badgeClass += 'status-realizada';
      text = 'Visita realizada';
      break;
    default:
      badgeClass += 'status-nao-realizada';
      text = 'Visita não realizada';
  }

  return <span className={badgeClass}>{text}</span>;
}

export default function VisitTable({ visits, onCancel, onMarkAsDone, onDelete }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Visitante</th>
            <th>Data</th>
            <th>Hora</th>
            <th></th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {visits.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                Nenhuma visita cadastrada.
              </td>
            </tr>
          ) : (
            visits.map((visit) => (
              <tr key={visit.id}>
                <td style={{ color: '#111827', fontWeight: 'bold' }}>{visit.name}</td>
                <td>{visit.date}</td>
                <td>{visit.time}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Link to={`/edit/${visit.id}`}>
                    <button
                      className="btn-icon btn-edit action-button"
                      style={{ marginRight: '0.5rem' }}
                    >
                      <span>Editar</span>
                      <FaEdit className="action-icon" />
                    </button>
                  </Link>
                  {['cancelada', 'realizada'].includes(visit.status) ? (
                    <button
                      className="btn-icon btn-delete action-button"
                      style={{ marginRight: '0.5rem' }}
                      onClick={() => onDelete(visit.id)}
                    >
                      <span>Excluir visita</span>
                      <FaTrash className="action-icon" />
                    </button>
                  ) : (
                    <button
                      className="btn-icon btn-cancel action-button"
                      style={{ marginRight: '0.5rem' }}
                      onClick={() => onCancel(visit.id)}
                    >
                      <span>Cancelar visita</span>
                      <FaTrash className="action-icon" />
                    </button>
                  )}
                  {visit.status === 'nao-realizada' && visit.canMarkAsDone && (
                    <button
                      className="btn-icon btn-complete action-button"
                      onClick={() => onMarkAsDone(visit.id)}
                    >
                      <span>Visita realizada</span>
                      <FaCheckCircle className="action-icon" />
                    </button>
                  )}
                </td>
                <td>
                  <StatusBadge status={visit.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}