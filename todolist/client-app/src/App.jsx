import './styles/Reservations.css'
import { useEffect, useState } from 'react'
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';

function App() {

  const [ reservations, setReservations ] = useState([]);
  const [ editing, setEditing ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ message, setMessage ] = useState('');
 
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/reservations')
      .then((res) => res.json())
      .then((data) => {
        setReservations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage('Error loading reservations');
        setLoading(false);
      })
  }, []);

  const addReservation = (newData) => {
    fetch('http://localhost:5000/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
    .then(res => res.json())
    .then(data => {
      setReservations([...reservations, data]);
      setMessage('Reservation created successfully');
      setTimeout(() => setMessage(''), 3000);
    })
    .catch(() => setMessage('Error creating reservation'))
  }

  const updateReservation = (updateData) => {
    setMessage('Updating reservation... ');
    fetch(`http://localhost:5000/reservations/${updateData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    })
    .then(res => res.json())
    .then(data => {
      setReservations(reservations.map(r => r.id === data.id ? data : r));
      setEditing(null);
      setMessage('Reservation updated successfully');
      setTimeout(() => setMessage(''), 3000);
    });
  }

  const deleteReservation = (id) => {
    fetch(`http://localhost:5000/reservations/${id}`, {method: 'DELETE'})
    .then(() => setReservations(reservations.filter(r => r.id !== id )));
  }

  //BOTÓN DE CANCELAR RESERVA (EN ESPERA DE IMPLEMENTAR)
  /*const cancelReservation = (id) => {
    fetch(`http://localhost:5000/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({status: 'canceled'}),
    })
    .then(res => res.json())
    .then(data => {
      setReservations(reservations.map(r => r.id === data.id ? data : r))
    })
    .catch(err => console.error('Error canceling reservation: ', err))
  }*/

  return (
    <>
    <div className="container">
      {loading && <p className="loading">Cargando reservas...</p>}
      {message && <p className="message">{message}</p>}
      <ReservationForm
        onSubmit={editing ? updateReservation : addReservation}
        initialData={editing}
        setEditing={setEditing}
      />
      <ReservationList
        reservations={reservations}
        onDelete={deleteReservation}
        onEdit={setEditing}
      />
    </div>
    </>
  )
}

export default App
