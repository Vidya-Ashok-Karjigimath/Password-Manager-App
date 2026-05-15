from flask import Flask, request, jsonify
from flask_cors import CORS
from storage import save_password, get_password

app = Flask(__name__)
CORS(app)

# LOGIN API
@app.route('/login', methods=['POST'])
def login():

    data = request.json
    password = data.get('password')

    if password == "MASTER@2026":
        return jsonify({
            "success": True
        })

    return jsonify({
        "success": False
    })


# ADD PASSWORD API
@app.route('/add', methods=['POST'])
def add_password():

    data = request.json

    site = data.get('site')
    username = data.get('username')
    password = data.get('password')

    save_password(site, username, password)

    return jsonify({
        "message": "Password saved successfully"
    })


# VIEW PASSWORD API
@app.route('/view/<site>', methods=['GET'])
def view_password(site):

    result = get_password(site)

    if result:
        return jsonify({
            "site": site,
            "username": result[0],
            "password": result[1]
        })

    return jsonify({
        "message": "No password found"
    })


if __name__ == '__main__':
    app.run(debug=True)