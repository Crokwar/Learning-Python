import './styles/Reservations.css'
import { useEffect, useState } from 'react'
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';

function App() {
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(null);

  const [loading, setLoading] = useState({ list: true, form: false });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch inicial
  useEffect(() => {
    setLoading({ list: true, form: false });
    fetch('http://localhost:5000/reservations')
      .then((res) => res.json())
      .then((data) => {
        setReservations(data);
        setLoading({ list: false, form: false });
      })
      .catch(err => {
        console.error(err);
        setMessage({ type: 'error', text: 'Error cargando reservas' });
        setLoading({ list: false, form: false });
      });
  }, []);

  // Crear reserva
  const addReservation = (newData) => {
    setLoading(prev => ({ ...prev, form: true }));
    setMessage({ type: 'info', text: 'Creando reserva...' });

    fetch('http://localhost:5000/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
      .then(res => res.json())
      .then(data => {
        setReservations([...reservations, data]);
        setMessage({ type: 'success', text: 'Reserva creada exitosamente' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Error al crear la reserva' });
      })
      .finally(() => setLoading(prev => ({ ...prev, form: false })));
  }

  // Editar reserva
  const updateReservation = (updateData) => {
    setLoading(prev => ({ ...prev, form: true }));
    setMessage({ type: 'info', text: 'Actualizando reserva...' });

    fetch(`http://localhost:5000/reservations/${updateData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    })
      .then(res => res.json())
      .then(data => {
        setReservations(reservations.map(r => r.id === data.id ? data : r));
        setEditing(null);
        setMessage({ type: 'success', text: 'Reserva actualizada' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Error al actualizar la reserva' });
      })
      .finally(() => setLoading(prev => ({ ...prev, form: false })));
  }

  // Eliminar reserva
  const deleteReservation = (id) => {
    fetch(`http://localhost:5000/reservations/${id}`, { method: 'DELETE' })
      .then(() => {
        setReservations(reservations.filter(r => r.id !== id));
        setMessage({ type: 'success', text: 'Reserva eliminada' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Error al eliminar la reserva' });
      });
  }

  return (
    <div className="container">

      <ReservationForm
        onSubmit={editing ? updateReservation : addReservation}
        initialData={editing}
        setEditing={setEditing}
        loading={loading.form}
      />

      {loading.list && <p className="loading">Cargando reservas...</p>}
      {message.text && (
        <p className={`message ${message.type}`}>
          {message.text}
        </p>
      )}

      <ReservationList
        reservations={reservations}
        onDelete={deleteReservation}
        onEdit={setEditing}
      />
    </div>
  )
}

export default App;
