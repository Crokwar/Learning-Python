from flask import Blueprint, request, jsonify
from app.models import Todolist
from app import db

routes_bp = Blueprint('routes', __name__)

@routes_bp.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong'})

