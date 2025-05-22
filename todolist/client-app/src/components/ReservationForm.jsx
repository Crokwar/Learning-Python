import { useState, useEffect } from "react";

export default function ReservationForm({ onSubmit, initialData, setEditing }) {
    const [errors, setErrors ] = useState({});
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

        if(!form.customer_name.trim()) newErrors.customer_name = 'Customer name is required';
        if(!form.phone.trim()) newErrors.phone = 'Phone is required';
        if(!form.reservation_date) newErrors.reservation_date = 'Date is required';
        if(!form.reservation_time) newErrors.reservation_time = 'Time is required';
        if(!form.number_people || form.number_people < 1) newErrors.number_people = 'Number of people must be at least 1 '

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validateForm()) return;

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
            <h2>{initialData ? 'Edit Reservation' : 'Create Reservation' }</h2>
            <label htmlFor="customer_name">Customer Name: </label>
            <input type="text" name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="Customer name... "/>
            {errors.customer_name && <span className="error">{errors.customer_name}</span>}
            <label htmlFor="phone">Number Phone</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Number phone... " />
            {errors.phone && <span className="error">{errors.phone}</span>}
            <label htmlFor="reservation_date">Reservation Date</label>
            <input name="reservation_date" type="date" value={form.reservation_date} onChange={handleChange} placeholder="Reservation date... "/>
            {errors.reservation_date && <span className="error">{errors.reservation_date}</span>}
            <label htmlFor="reservation_time">Reservation Time</label>
            <input name="reservation_time" type="time" value={form.reservation_time} onChange={handleChange} placeholder="Reservation time... "  />
            {errors.reservation_time && <span className="error">{errors.reservation_time}</span>}
            <label htmlFor="number_people">Number of People</label>
            <input name="number_people" type="number" min={1} max={8} value={form.number_people} onChange={handleChange} placeholder="Number people... "/>
            {errors.number_people && <span className="error">{errors.number_people}</span>}
            <label htmlFor="status">Status</label>

            <label htmlFor="notes">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes.... " rows={3} />
            <div className="form-buttons">
                <button type="submit">{initialData ? "Update" : "Add"}</button>
                {initialData && (<button type="button" onClick={handleCancel}>Cancel</button>)}
            </div>

        </form>
    );
}
