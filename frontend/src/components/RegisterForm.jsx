import { useState } from 'react';

function RegisterForm({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${backendURL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onRegisterSuccess();
      } else {
        setError(data.message || 'Error al registrar usuario');
      }
    } catch (err) {
      console.error(err);
      setError('Error de red');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrar Usuario</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default RegisterForm;
