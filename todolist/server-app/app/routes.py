from flask import Blueprint, request, jsonify
from app.models import Reservation
from app import db

routes_bp = Blueprint('routes', __name__)

@routes_bp.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong'})

@routes_bp.route('/reservations', methods=['GET'])
def get_reservations():
    reservations = Reservation.query.all()
    result = [res.to_dict() for res in reservations]
    return jsonify(result), 200

@routes_bp.route('/reservations/<int:reservation_id>', methods=['GET'])
def get_reservation(reservation_id):
    reservation = Reservation.query.get_or_404(reservation_id)
    return jsonify(reservation.to_dict()), 200

@routes_bp.route('/reservations', methods=['POST'])
def create_reservation():
    data = request.get_json()

    new_reservation = Reservation(
        customer_name = data.get('customer_name'),
        phone = data.get('phone'),
        email = data.get('email'),
        reservation_date = data.get('reservation_date'),
        reservation_time = data.get('reservation_time'),
        number_people = data.get('number_people'),
        notes = data.get('notes'),
        status = data.get('status', 'pending')
    )

    db.session.add(new_reservation)
    db.session.commit()

    return jsonify(new_reservation.to_dict()), 201

@routes_bp.route('/reservations/<int:reservation_id>', methods=['PUT'])
def update_reservation(reservation_id):
    reservation = Reservation.query.get_or_404(reservation_id)
    data = request.get_json()

    reservation.customer_name = data.get('customer_name', reservation.customer_name)
    reservation.phone = data.get('phone', reservation.phone)
    reservation.email = data.get('email', reservation.email)
    reservation.reservation_date = data.get('reservation_date', reservation.reservation_date)
    reservation.reservation_time = data.get('reservation_time', reservation.reservation_time)
    reservation.number_people = data.get('number_people', reservation.number_people)
    reservation.notes = data.get('notes', reservation.notes)
    reservation.status = data.get('status', reservation.status)

    db.session.commit()

    return jsonify(reservation.to_dict()), 200

@routes_bp.route('/reservations/<int:reservation_id>', methods=['DELETE'])
def delete_reservation(reservation_id):
    reservation = Reservation.query.get_or_404(reservation_id)
    
    db.session.delete(reservation)
    db.session.commit()

    return jsonify({'message': 'Reservation deleted successfully'}), 200