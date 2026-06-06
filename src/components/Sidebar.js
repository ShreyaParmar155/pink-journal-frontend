import React from 'react';

export default function Sidebar({ user, view, setView, onLogout, entries }) {
  const streak = (() => {
    let count = 0;
    const today = new Date(); today.setHours(0,0,0,0);
    for (let i = 0; i < 30; i++) {
     const d = new Date(today); d.setDate(d.getDate() - i);
      const hasEntry = entries.some(e => {
        const ed = new Date(e.date); ed.setHours(0,0,0,0);
        return ed.getTime() === d.getTime();
      });
      if (hasEntry) count++; else if (i > 0) break;
    }
    return count;
  })();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">🌸  MY STORY</div>
      <div className="sidebar-user">
        <div className="avatar">{user.name[0].toUpperCase()}</div>
        <div>
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
        </div>
      </div>
      <div className="streak-card">
        <div className="streak-num">🔥 {streak}</div>
        <div className="streak-label">day streak</div>
      </div>
      <nav className="sidebar-nav">
        <button className={`nav-btn ${view==='home'?'active':''}`} onClick={() => setView('home')}>🏠 Home</button>
        <button className={`nav-btn ${view==='new'?'active':''}`} onClick={() => setView('new')}>✏️ New Entry</button>
        <button className={`nav-btn ${view==='stats'?'active':''}`} onClick={() => setView('stats')}>📊 My Stats</button>
      </nav>
      <button className="logout-btn" onClick={onLogout}>👋 Log Out</button>
    </div>
  );
}
