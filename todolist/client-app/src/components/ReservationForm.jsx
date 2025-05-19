import { useState, useEffect } from "react";

export default function ReservationForm({ onSubmit, initialData, setEditing }) {
    const [form, setForm] = useState({
        customer_name: '',
        phone: '',
        reservation_date: '',
        reservation_time: '',
        number_people: '',
        notes: '',
        status: '',
    });

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
            <input name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="Customer name... " required/>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Number phone... " />
            <input name="reservation_date" value={form.reservation_date} onChange={handleChange} placeholder="Reservation date... " required/>
            <input name="reservation_time" value={form.reservation_time} onChange={handleChange} placeholder="Reservation time... " required/>
            <input name="number_people" value={form.number_people} onChange={handleChange} placeholder="Number people... " required/>
            <input name="status" value={form.status} onChange={handleChange} placeholder="Status... " required/>
            <input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes.... " required/>
            <button type="submit">{initialData ? "Update" : "Add"}</button>
            {initialData && <button type="button" onClick={handleCancel}>Cancel</button>}
        </form>
    );
}
