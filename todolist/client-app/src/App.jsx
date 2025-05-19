import './styles/Reservations.css'
import { useEffect, useState } from 'react'
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';

function App() {

  const [ reservations, setReservations ] = useState([]);
  const [ editing, setEditing ] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/reservations')
    .then((res) => res.json())
    .then((data) => setReservations(data))
    .catch((err) => console.error(err));
  }, []);

  const addReservation = (newData) => {
    fetch('http://localhost:5000/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
    .then(res => res.json())
    .then(data => setReservations([...reservations, data]));
  }

  const updateReservation = (updateData) => {
    fetch(`http://localhost:5000/reservations/${updateData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    })
    .then(res => res.json())
    .then(data => {
      setReservations(reservations.map(r => r.id === data.id ? data : r));
      setEditing(null);
    });
  }

  const deleteReservation = (id) => {
    fetch(`http://localhost:5000/reservations/${id}`, {method: 'DELETE'})
    .then(() => setReservations(reservations.filter(r => r.id !== id )));
  }

  return (
    <>
    <div className="container">
      <h1>Reservations</h1>
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
