import { useEffect, useState } from 'react';
const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${backendURL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error cargando usuarios:', err));
  }, []);

  return (
    <div>
      <h2>Usuarios Registrados</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Sal</th>
            <th>Hash de Contraseña</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.username}</td>
              <td>{u.salt}</td>
              <td>{u.password_hash}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
