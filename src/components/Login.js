import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login({ onAuth }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); setError('');
    try {
      const res = await axios.post('https://pink-journal-backend.onrender.com/api/auth/login', form);
      onAuth(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-emoji">🌸</div>
        <h1 className="auth-title">Welcome Back!</h1>
        <p className="auth-sub">Your journal missed you</p>
        {error && <div className="auth-error">{error}</div>}
        <input className="auth-input" type="email" placeholder="Your email"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="auth-input" type="password" placeholder="Your password"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        <p className="auth-switch">Do not have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}
