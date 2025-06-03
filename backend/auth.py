import hashlib
import hmac
import os
from base64 import b64encode, b64decode

# Clave HMAC compartida
SECRET_KEY = b'superclavesecreta'

def hash_password(password, salt=None):
    if not salt:
        salt = os.urandom(16)
    hashed = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
    return salt, hashed

def generate_hmac(message):
    return hmac.new(SECRET_KEY, message.encode(), hashlib.sha256).hexdigest()

def verify_hmac(message, hmac_to_verify):
    generated = generate_hmac(message)
    return hmac.compare_digest(generated, hmac_to_verify)
