from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/api/users')
def get_users():
    return{
        'users' : [
            {
                'id': 1,
                'name': 'Alice'
            },
            {
                'id': 2,
                'name': 'Tata'
            },
            {
                'id': 3,
                'name': 'Cristian'
            }
        ]
    }


if __name__ == '__main__':
    app.run(debug=True)