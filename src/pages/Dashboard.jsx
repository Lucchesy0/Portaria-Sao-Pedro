import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VisitTable from '../components/VisitTable';
import ConfirmModal from '../components/ConfirmModal';
import Notification from '../components/Notification';
import VisitFilter from '../components/VisitFilter'; 
import { FaUserPlus } from 'react-icons/fa';

const VISITS_PER_PAGE = 4;
const BUTTON_WINDOW = 5 * 60 * 1000;

const containerStyle = {
  position: 'absolute', 
  top: '64.2%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '90%',
  maxWidth: '1200px',
  backgroundColor: 'rgba(255, 255, 255, 0.96)',
  borderRadius: '24px',
  padding: '2.5rem',
  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(8px)',
  zIndex: '1000',
  minHeight: '300px', // Altura mínima para evitar encolhimento
  overflowY: 'auto', // Permite rolagem vertical se necessário
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
};

// Estilos do título
const titleStyle = {
  marginTop: '1.4rem',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#111827',
  textAlign: 'left',
  letterSpacing: '-0.025em',
  paddingBottom: '1rem'
};

// Função para ordenar visitas pelas datas e horários mais próximos
const sortVisitsByDateTime = (visits) => {
  return [...visits].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}:00`).getTime();
    const dateTimeB = new Date(`${b.date}T${b.time}:00`).getTime();
    return dateTimeA - dateTimeB;
  });
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [visits, setVisits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVisitId, setSelectedVisitId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [canceledVisit, setCanceledVisit] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Estado para o filtro selecionado
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Atualização do tempo atual
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Carregamento inicial das visitas
  useEffect(() => {
    const loadVisits = () => {
      try {
        const storedVisits = JSON.parse(localStorage.getItem('visits')) || [];
        const sortedVisits = sortVisitsByDateTime(storedVisits);
        setVisits(sortedVisits);
        localStorage.setItem('visits', JSON.stringify(sortedVisits));
      } catch (error) {
        console.error('Erro ao carregar visitas:', error);
        setVisits([]);
      }
    };
    loadVisits();
  }, []);

  const handleFilterChange = (filterValue) => {
    setSelectedFilter(filterValue);
    setCurrentPage(1); 
  };

  // Aplicação do filtro selecionado e ordenação
  const filteredVisits = sortVisitsByDateTime(
    visits.filter(visit => {
      if (selectedFilter === 'all') return true;
      return visit.status === selectedFilter;
    })
  );

  // Configuração de paginação
  const totalPages = Math.ceil(filteredVisits.length / VISITS_PER_PAGE) || 1;
  const currentVisits = filteredVisits.slice(
    (currentPage - 1) * VISITS_PER_PAGE,
    currentPage * VISITS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Handlers de ações
  const handleAddVisit = () => navigate('/add');

  const handleCancel = (id) => {
    setSelectedVisitId(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedVisits = visits.filter(visit => visit.id !== id);
    setVisits(updatedVisits);
    localStorage.setItem('visits', JSON.stringify(updatedVisits));
  };

  const confirmCancel = () => {
    // Cria uma nova data ISO para o cancelamento
    const canceledAt = new Date().toISOString();

    // Atualiza as visitas com imutabilidade
    const updatedVisits = visits.map(visit =>
      visit.id === selectedVisitId
        ? {
          ...visit,
          status: 'cancelada',
          canceledAt
        }
        : visit
    );

    // Encontra a visita cancelada para feedback
    const canceledVisit = updatedVisits.find(visit => visit.id === selectedVisitId);

    // Atualiza estados e armazenamento
    const sortedUpdatedVisits = sortVisitsByDateTime(updatedVisits);
    setVisits(sortedUpdatedVisits);
    localStorage.setItem('visits', JSON.stringify(sortedUpdatedVisits));

    // Feedback visual
    setCanceledVisit(canceledVisit);
    setShowSuccess(true);

    // Fecha o modal
    setIsModalOpen(false);

    // Garante o fechamento automático mesmo se houver problemas no componente
    const fallbackTimer = setTimeout(() => {
      setShowSuccess(false);
    }, 4000);

    // Limpeza do timer se componente desmontar
    return () => clearTimeout(fallbackTimer);
  };

  const handleMarkAsDone = (id) => {
    const visit = visits.find(v => v.id === id);
    if (!visit) return;

    const scheduledDateTime = new Date(`${visit.date}T${visit.time}:00`).getTime();
    const now = Date.now();
    const timeDifference = scheduledDateTime - now;

    // Atualizar a condição para que o botão apareça 5 minutos antes e permaneça após
    if (now >= (scheduledDateTime - BUTTON_WINDOW) && visit.status === 'nao-realizada') {
      const updatedVisits = visits.map(v =>
        v.id === id ? { ...v, status: 'realizada' } : v
      );

      const sortedUpdatedVisits = sortVisitsByDateTime(updatedVisits);
      setVisits(sortedUpdatedVisits);
      localStorage.setItem('visits', JSON.stringify(sortedUpdatedVisits));
    } else {
      alert('Você só pode marcar a visita como realizada a partir de 5 minutos antes do horário agendado.');
    }
  };

  // Anotação das visitas com status de ação
  const annotatedVisits = currentVisits.map(visit => {
    const scheduledDateTime = new Date(`${visit.date}T${visit.time}:00`).getTime();
    const now = currentTime.getTime();
    return {
      ...visit,
      canMarkAsDone: (now >= (scheduledDateTime - BUTTON_WINDOW)) && (visit.status === 'nao-realizada')
    };
  });

  // Controles de paginação
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(p => p + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);

  return (
    <>
      <div className="card-overlay" style={containerStyle}>
        <h2 style={titleStyle}>Gerencie as suas visitas</h2>

        {/* Botão de adição */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '2rem',
          marginTop: '-55px'
        }}>
          <button
            className="btn btn-primary btn-icon"
            onClick={handleAddVisit}
          >
            <span>Adicionar nova visita</span>
            <FaUserPlus className="action-icon" style={{ marginLeft: '8px' }} />
          </button>
        </div>

        <VisitFilter selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />

        <VisitTable
          visits={annotatedVisits}
          onCancel={handleCancel}
          onMarkAsDone={handleMarkAsDone}
          onDelete={handleDelete}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1rem'
        }}>
          <button
            className="btn btn-secondary"
            style={{ padding: '0.3rem 0.6rem' }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <span style={{ margin: '0 0.5rem' }}>
            {currentPage} / {totalPages || 1}
          </span>

          <button
            className="btn btn-secondary"
            style={{ padding: '0.3rem 0.6rem' }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages || filteredVisits.length === 0}
          >
            Próximo
          </button>
        </div>
      </div>
      <ConfirmModal
        title="Cancelamento"
        message="Tem certeza que deseja cancelar essa visita?"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmCancel}
        style={{ zIndex: 2000 }} 
      />

      {showSuccess && (
        <Notification
          type="success"
          title="Sucesso!"
          message={`Visita ${canceledVisit?.id} cancelada com sucesso!`}
          onClose={() => setShowSuccess(false)}
          autoCloseDelay={4000}
          style={{ zIndex: 2001 }}
        />
      )}
    </>
  );
}
