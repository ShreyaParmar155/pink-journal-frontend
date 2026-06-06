import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import NewEntry from './NewEntry';
import EntryCard from './EntryCard';
import EntryModal from './EntryModal';
import Stats from './Stats';

const MOODS = ['😊 Happy','😌 Calm','😢 Sad','😰 Anxious','🙏 Grateful','🎉 Excited'];

export default function Dashboard({ user, token, onLogout }) {
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState('home');
  const [search, setSearch] = useState('');
  const [filterMood, setFilterMood] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [viewEntry, setViewEntry] = useState(null);

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchEntries = async () => {
    const res = await api.get('/entries');
    setEntries(res.data);
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleAdd = async (entry) => {
    const res = await api.post('/entries', entry);
    setEntries([res.data, ...entries]);
    setView('home');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    await api.delete(`/entries/${id}`);
    setEntries(entries.filter(e => e._id !== id));
    setViewEntry(null);
  };

  const allTags = [...new Set(entries.flatMap(e => e.tags || []))];

  const filtered = entries.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.text.toLowerCase().includes(search.toLowerCase());
    const matchMood = filterMood ? e.mood === filterMood : true;
    const matchTag = filterTag ? (e.tags || []).includes(filterTag) : true;
    return matchSearch && matchMood && matchTag;
  });

  return (
    <div className="dashboard">
      <Sidebar user={user} view={view} setView={setView} onLogout={onLogout} entries={entries} />
      <div className="main">
        <div className="topbar">
          <input className="search-input" placeholder="🔍 Search entries..."
            value={search} onChange={e => setSearch(e.target.value)} />
          <select className="filter-select" value={filterMood} onChange={e => setFilterMood(e.target.value)}>
            <option value="">All moods</option>
            {MOODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          {allTags.length > 0 && (
            <select className="filter-select" value={filterTag} onChange={e => setFilterTag(e.target.value)}>
              <option value="">All tags</option>
              {allTags.map(t => <option key={t} value={t}>#{t}</option>)}
            </select>
          )}
        </div>

        {view === 'new' && <NewEntry onSave={handleAdd} onCancel={() => setView('home')} />}
        {view === 'stats' && <Stats entries={entries} />}
        {view === 'home' && (
          <div className="entries-grid">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div style={{fontSize:'48px'}}>📖</div>
                <p>No entries found. Start writing!</p>
                <button className="fab" onClick={() => setView('new')}>+ New Entry</button>
              </div>
            ) : filtered.map(e => (
              <EntryCard key={e._id} entry={e} onClick={() => setViewEntry(e)} onDelete={handleDelete} />
            ))}
          </div>
        )}
        <button className="fab" onClick={() => setView('new')}>＋</button>
      </div>
      {viewEntry && <EntryModal entry={viewEntry} onClose={() => setViewEntry(null)} onDelete={handleDelete} />}
    </div>
  );
}
