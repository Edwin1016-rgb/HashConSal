from flask import Flask, request, jsonify
from flask_cors import CORS
from auth import hash_password, generate_hmac, verify_hmac
from database import init_db, add_user, get_user
from base64 import b64encode, b64decode
import hmac
import sqlite3 


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
init_db()

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = data['password']
    salt, hashed = hash_password(password)
    add_user(username, b64encode(salt).decode(), b64encode(hashed).decode())
    return jsonify({"status": "ok", "message": "Usuario registrado"})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    result = get_user(username)
    if not result:
        return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404
    
    salt, stored_hash = map(b64decode, result)
    _, hashed = hash_password(password, salt)
    if hmac.compare_digest(stored_hash, hashed):
        message = f"login:{username}"
        hmac_value = generate_hmac(message)
        return jsonify({
            "status": "ok",
            "message": "Login exitoso",
            "hmac": hmac_value
        })
    else:
        return jsonify({"status": "error", "message": "Contraseña incorrecta"}), 401


@app.route('/users', methods=['GET'])
def list_users():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT username, salt, password_hash FROM users")
    users = [{"username": row[0], "salt": row[1], "password_hash": row[2]} for row in c.fetchall()]
    conn.close()
    return jsonify(users)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
