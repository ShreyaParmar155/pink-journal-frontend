import React from 'react';

export default function EntryCard({ entry, onClick, onDelete }) {
  const colors = ['#fce4ec','#e8f5e9','#e3f2fd','#fff8e1','#f3e5f5','#e0f7fa'];
  const bg = colors[Math.abs(entry.title.charCodeAt(0)) % colors.length];
  const date = new Date(entry.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });

  return (
    <div className="entry-card" style={{background: bg}} onClick={onClick}>
      <div className="entry-card-top">
        <span className="entry-mood">{entry.mood}</span>
        <button className="entry-del" onClick={e => { e.stopPropagation(); onDelete(entry._id); }}>✕</button>
      </div>
      <div className="entry-card-title">{entry.title}</div>
      <div className="entry-card-date">{date}</div>
      <div className="entry-card-preview">{entry.text}</div>
      {entry.tags?.length > 0 && (
        <div className="entry-tags">
          {entry.tags.map(t => <span key={t} className="tag">#{t}</span>)}
        </div>
      )}
    </div>
  );
}
