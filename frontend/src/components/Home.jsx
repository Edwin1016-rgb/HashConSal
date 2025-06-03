import UserList from './UserList';

function Home({ user, onLogout }) {
  return (
    <div style={{ fontFamily: 'Arial' }}>
      <h1>Electiva IV - Panel de Usuarios</h1>
      
      <button 
        onClick={onLogout} 
        style={{
          padding: '8px 16px',
          backgroundColor: '#654922',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          width: 'auto',
          maxWidth: '120px',
        }}
      >
        Logout
      </button>
      <p>Bienvenido, <strong>{user}</strong></p>
      <UserList />
    </div>
  );
}

export default Home;
