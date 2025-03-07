import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaCalendar, 
  FaClock, 
  FaIdCard, 
  FaComment 
} from 'react-icons/fa';

const colors = {
  blue: '#3B82F6',
  blueLight: '#1a56db96',
  gray: '#6B7280',
};

const styles = {
  form: {
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: '100px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    border: `2px solid ${colors.blueLight}`,
    borderRadius: '8px',
    padding: '0 12px',
    height: '40px',
    marginTop: '4px',
    gap: '8px',
    transition: 'border-color 0.2s ease-in-out',
    ':focus-within': {
      borderColor: colors.blue,
      boxShadow: `0 0 0 2px ${colors.blueLight}`,
    },
  },
  textareaContainer: {
    height: 'auto',
    alignItems: 'flex-start',
    padding: '12px',
  },
  icon: {
    color: '#6B7280',
    flexShrink: 0,
    fontSize: '18px',
    marginLeft: '4px',
  },
  input: {
    border: 'none',
    outline: 'none',
    width: '100%',
    background: 'transparent',
    padding: '8px 0',
    lineHeight: '1.5',
    fontSize: '14px',
    '::placeholder': {
      color: colors.gray,
      opacity: 0.8,
    },
  },
  textarea: {
    resize: 'vertical',
    minHeight: '80px',
    padding: '0',
  },
  errorMessage: {
    marginBottom: '1rem',
    color: 'red',
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem',
  },
};

export default function VisitForm({ initialData, onSave, onCancel, onDelete }) {
  const [visitData, setVisitData] = useState({
    name: '',
    date: '',
    time: '',
    documentType: '',
    documentNumber: '',
    observation: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      setVisitData(initialData);
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setVisitData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  }

  function isFormValid() {
    return (
      visitData.name.trim() !== '' &&
      visitData.date.trim() !== '' &&
      visitData.time.trim() !== '' &&
      visitData.documentType.trim() !== '' &&
      visitData.documentNumber.trim() !== ''
    );
  }

  function isDateTimeValid(date, time) {
    try {
      const visitDateTime = new Date(`${date}T${time}:00`);
      return visitDateTime > new Date();
    } catch (err) {
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid()) {
      setErrorMessage('Preencha todos os campos obrigatórios!');
      return;
    }

    if (!isDateTimeValid(visitData.date, visitData.time)) {
      setErrorMessage('Não é possível agendar uma visita em data/hora que já passou!');
      return;
    }

    onSave(visitData);
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

      <div style={{ marginBottom: '1rem' }}>
        <label>Nome do visitante *</label>
        <div style={styles.inputContainer}>
          <FaUser style={styles.icon} />
          <input
            type="text"
            name="name"
            placeholder="Digite o nome do visitante"
            value={visitData.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Data *</label>
        <div style={styles.inputContainer}>
          <FaCalendar style={styles.icon} />
          <input
            type="date"
            name="date"
            value={visitData.date}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Hora *</label>
        <div style={styles.inputContainer}>
          <FaClock style={styles.icon} />
          <input
            type="time"
            name="time"
            value={visitData.time}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Tipo de documento *</label>
        <div style={styles.inputContainer}>
          <FaIdCard style={styles.icon} />
          <input
            type="text"
            name="documentType"
            placeholder="Digite o tipo de documento"
            value={visitData.documentType}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Número do documento *</label>
        <div style={styles.inputContainer}>
          <FaIdCard style={styles.icon} />
          <input
            type="number"
            name="documentNumber"
            placeholder="Digite o número do documento"
            value={visitData.documentNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Observação (opcional)</label>
        <div style={{ ...styles.inputContainer, ...styles.textareaContainer }}>
          <FaComment style={{ ...styles.icon, position: 'relative', top: '2px' }} />
          <textarea
            name="observation"
            placeholder="Digite a observação"
            rows={3}
            value={visitData.observation}
            onChange={handleChange}
            style={{ ...styles.input, ...styles.textarea }}
          />
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <div>
          {onDelete && (
            <button type="button" className="btn btn-danger" onClick={onDelete}>
              Cancelar visita
            </button>
          )}
        </div>
        <div style={styles.actionButtons}>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Voltar
          </button>
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
}