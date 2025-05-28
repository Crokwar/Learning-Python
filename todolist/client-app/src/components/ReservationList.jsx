import '../components/ReservationList.css'

export default function ReservationList({ reservations, onDelete, onEdit }) {
  return (
    <div className="reservation-table-container">
      <table className="reservation-table">
        <thead>
          <tr>
            <th># TT</th>
            <th>Customer name</th>
            <th>Reservation Time</th>
            <th># People</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
              <td>TT #{r.id}</td>
              <td><strong>{r.customer_name}</strong></td>
              <td>
                <div className="time-cell">
                  <div>{r.reservation_date}</div>
                  <div>{r.reservation_time}</div>
                </div>
              </td>
              <td>{r.number_people}</td>
              <td>
                <span className={`status-badge ${r.status.toLowerCase()}`}>
                  {r.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => onEdit(r)}>✏️</button>
                  <button onClick={() => onDelete(r.id)}>🗑️</button>
                  {/* r.status !== 'canceled' && <button onClick={() => onCancel(r.id)}>❌</button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}