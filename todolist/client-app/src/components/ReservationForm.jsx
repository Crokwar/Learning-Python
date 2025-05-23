import { useState, useEffect } from "react";
import '../components/ReservationForm.css'

export default function ReservationForm({ onSubmit, initialData, setEditing }) {
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        customer_name: '',
        phone: '',
        reservation_date: '',
        reservation_time: '',
        number_people: 1,
        notes: '',
        status: 'pending',
    });

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.customer_name.trim()) newErrors.customer_name = 'Customer name is required';
        if (!form.phone.trim()) newErrors.phone = 'Phone is required';
        if (!form.reservation_date) newErrors.reservation_date = 'Date is required';
        if (!form.reservation_time) newErrors.reservation_time = 'Time is required';
        if (!form.number_people || form.number_people < 1) newErrors.number_people = 'Number of people must be at least 1 '

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        onSubmit(form);
        if (!initialData) {
            setForm({
                customer_name: '',
                phone: '',
                reservation_date: '',
                reservation_time: '',
                number_people: '',
                notes: '',
                status: '',
            });
            setErrors({})
        }
    };

    const handleCancel = () => {
        setEditing(null);
        setForm({
            customer_name: '',
            phone: '',
            reservation_date: '',
            reservation_time: '',
            number_people: '',
            notes: '',
            status: '',
        });
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>{initialData ? 'Edit Reservation' : 'Create Reservation'}</h2>

            <div className="form-group">
                <label htmlFor="customer_name">Customer Name:</label>
                <input type="text" name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="Customer name..." />
                {errors.customer_name && <span className="error">{errors.customer_name}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="phone">Number Phone:</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number..." />
                {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="reservation_date">Reservation Date:</label>
                <input type="date" name="reservation_date" value={form.reservation_date} onChange={handleChange} />
                {errors.reservation_date && <span className="error">{errors.reservation_date}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="reservation_time">Reservation Time:</label>
                <input type="time" name="reservation_time" value={form.reservation_time} onChange={handleChange} />
                {errors.reservation_time && <span className="error">{errors.reservation_time}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="number_people">Number of People:</label>
                <input type="number" name="number_people" min={1} max={8} value={form.number_people} onChange={handleChange} placeholder="Number of people..." />
                {errors.number_people && <span className="error">{errors.number_people}</span>}
            </div>

            <div className="form-group full-width">
                <label htmlFor="notes">Notes:</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes..." rows={3} />
            </div>

            <div className="form-buttons">
                <button type="submit">{initialData ? "Update" : "Add"}</button>
                {initialData && (
                    <button type="button" onClick={handleCancel}>Cancel</button>
                )}
            </div>
        </form>
    );
}
