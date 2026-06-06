import React from 'react';

const MOODS = ['😊 Happy','😌 Calm','😢 Sad','😰 Anxious','🙏 Grateful','🎉 Excited'];

export default function Stats({ entries }) {
  const total = entries.length;
  const words = entries.reduce((acc, e) => acc + e.text.split(' ').length, 0);
  const moodCounts = MOODS.map(m => ({ mood: m, count: entries.filter(e => e.mood === m).length }));
  const topMood = moodCounts.sort((a,b) => b.count - a.count)[0];
  const allTags = entries.flatMap(e => e.tags || []);
  const tagCounts = [...new Set(allTags)].map(t => ({ tag: t, count: allTags.filter(x => x===t).length }))
    .sort((a,b) => b.count - a.count).slice(0,5);

  return (
    <div className="stats-page">
      <h2 className="stats-heading">📊 Your Stats</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-num">{total}</div>
          <div className="stat-label">Total Entries</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{words.toLocaleString()}</div>
          <div className="stat-label">Words Written</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{total > 0 ? Math.round(words/total) : 0}</div>
          <div className="stat-label">Avg Words/Entry</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{topMood?.count > 0 ? topMood.mood : '—'}</div>
          <div className="stat-label">Top Mood</div>
        </div>
      </div>
      {tagCounts.length > 0 && (
        <div className="tags-section">
          <h3>🏷 Top Tags</h3>
          <div className="entry-tags">
            {tagCounts.map(t => (
              <span key={t.tag} className="tag">#{t.tag} ({t.count})</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
