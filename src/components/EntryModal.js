import React from 'react';

export default function EntryModal({ entry, onClose, onDelete }) {
  const date = new Date(entry.date).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
  return (
    <div className="modal-bg" onClick={e => e.target.classList.contains('modal-bg') && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">{entry.title}</div>
            <div className="modal-meta">{date} {entry.mood && `· ${entry.mood}`}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {entry.tags?.length > 0 && (
          <div className="entry-tags" style={{marginBottom:'12px'}}>
            {entry.tags.map(t => <span key={t} className="tag">#{t}</span>)}
          </div>
        )}
        <div className="modal-body">{entry.text}</div>
        <button className="delete-entry-btn" onClick={() => onDelete(entry._id)}>🗑 Delete Entry</button>
      </div>
    </div>
  );
}
