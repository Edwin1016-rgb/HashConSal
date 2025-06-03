import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home'; // ✅ importar Home

function App() {
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (username) => {
    setUser(username);
    setView('home');
  };

  const handleUserNotFound = () => {
    setView('register');
  };

  const handleRegisterSuccess = () => {
    setView('login');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  return (
    <div className="app-container">
      {view === 'login' && (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onUserNotFound={handleUserNotFound}
        />
      )}

      {view === 'register' && (
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      )}

      {view === 'home' && (
        <Home user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
