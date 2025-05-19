export default function ReservationList({ reservations, onDelete, onEdit  }) {
    return (
        <div className="list">
            {reservations.map((r) => (
                <div key={r.id} className="item">
                    <span><strong>{r.customer_name}</strong></span>
                    <span>{r.phone}</span>
                    <span>{r.reservation_date}</span>
                    <span>{r.reservation_time}</span>
                    <span>{r.number_people} people</span>
                    <span>{r.notes}</span>
                    <span>{r.status}</span>
                    {<div className="actions">
                        <button onClick={() => onEdit(r)}>✏️</button>
                        <button onClick={() => onDelete(r.id)}>🗑️</button>
                    </div>}
                </div>
            ))}
        </div>
    );
}