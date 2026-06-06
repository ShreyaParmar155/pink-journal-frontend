import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('pj_user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('pj_token') || '');

  const handleAuth = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('pj_user', JSON.stringify(userData));
    localStorage.setItem('pj_token', userToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('pj_user');
    localStorage.removeItem('pj_token');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login onAuth={handleAuth} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup onAuth={handleAuth} /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Dashboard user={user} token={token} onLogout={handleLogout} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
