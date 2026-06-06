import React, { useState } from 'react';

const MOODS = ['😊 Happy','😌 Calm','😢 Sad','😰 Anxious','🙏 Grateful','🎉 Excited'];

export default function NewEntry({ onSave, onCancel }) {
  const [form, setForm] = useState({
    title: '', text: '', mood: '',
    tags: '', date: new Date().toISOString().slice(0,10)
  });

  const handleSave = () => {
    if (!form.title.trim() || !form.text.trim()) { alert('Title and text are required!'); return; }
    onSave({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) });
  };

  return (
    <div className="new-entry-page">
      <div className="new-entry-card">
        <h2 className="new-entry-heading">✨ New Entry</h2>
        <input className="ne-input" placeholder="Give it a title..." value={form.title}
          onChange={e => setForm({...form, title: e.target.value})} />
        <input className="ne-input" type="date" value={form.date}
          onChange={e => setForm({...form, date: e.target.value})} />
        <div className="ne-label">How are you feeling?</div>
        <div className="mood-row">
          {MOODS.map(m => (
            <button key={m} className={`mood-btn ${form.mood===m?'active':''}`}
              onClick={() => setForm({...form, mood: form.mood===m?'':m})}>{m}</button>
          ))}
        </div>
        <textarea className="ne-textarea" placeholder="Write your heart out... 💕"
          value={form.text} onChange={e => setForm({...form, text: e.target.value})} />
        <input className="ne-input" placeholder="Tags (comma separated, e.g. life, work, dreams)"
          value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} />
        <div className="ne-actions">
          <button className="ne-cancel" onClick={onCancel}>Cancel</button>
          <button className="ne-save" onClick={handleSave}>Save Entry 🌸</button>
        </div>
      </div>
    </div>
  );
}
