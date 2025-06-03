import sqlite3

def init_db():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                    username TEXT PRIMARY KEY,
                    salt TEXT,
                    password_hash TEXT)''')
    conn.commit()
    conn.close()

def add_user(username, salt, password_hash):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("INSERT INTO users VALUES (?, ?, ?)", (username, salt, password_hash))
    conn.commit()
    conn.close()

def get_user(username):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT salt, password_hash FROM users WHERE username=?", (username,))
    result = c.fetchone()
    conn.close()
    return result
