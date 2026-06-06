import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup({ onAuth }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      onAuth(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-emoji">✨</div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-sub">Start your journaling journey 🌷</p>
        {error && <div className="auth-error">{error}</div>}
        <input className="auth-input" type="text" placeholder="Your name"
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="auth-input" type="email" placeholder="Your email"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="auth-input" type="password" placeholder="Create password"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating...' : 'Sign Up 💕'}
        </button>
        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}
