import React, { useState } from 'react';
import { PATTERNS } from '../data/traders';

const EMPTY = { ticker: '', date: '', pattern: '', catalyst: '', gainPct: '', notes: '', imageUrl: '' };

export default function ChartVault({ charts, setCharts }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [selected, setSelected] = useState(null);

  function submit() {
    if (!form.ticker.trim()) return;
    setCharts([{ ...form, id: Date.now() }, ...charts]);
    setForm(EMPTY);
    setShowForm(false);
  }

  function deleteChart(id) {
    setCharts(charts.filter(c => c.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>מאגר גרפים מנצחים</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ background: '#3b82f6', border: 'none', borderRadius: 8, padding: '10px 20px', color: '#fff', fontWeight: 600, fontSize: 14 }}
        >
          {showForm ? 'ביטול' : '+ הוסף גרף'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#141b2d', border: '1px solid #1e2d4a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16, color: '#8892b0', fontSize: 15 }}>גרף חדש</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[['ticker', 'טיקר (AAPL...)'], ['date', 'תאריך'], ['gainPct', 'עלייה %']].map(([key, ph]) => (
              <input key={key} type={key === 'date' ? 'date' : 'text'} placeholder={ph} value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                style={{ background: '#0f1629', border: '1px solid #1e2d4a', borderRadius: 8, padding: '10px 12px', color: '#e8eaf6', fontSize: 14 }} />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <select value={form.pattern} onChange={e => setForm({ ...form, pattern: e.target.value })}
              style={{ background: '#0f1629', border: '1px solid #1e2d4a', borderRadius: 8, padding: '10px 12px', color: form.pattern ? '#e8eaf6' : '#4a5568', fontSize: 14 }}>
              <option value="">בחר תבנית</option>
              {PATTERNS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input placeholder="קטליסט" value={form.catalyst} onChange={e => setForm({ ...form, catalyst: e.target.value })}
              style={{ background: '#0f1629', border: '1px solid #1e2d4a', borderRadius: 8, padding: '10px 12px', color: '#e8eaf6', fontSize: 14 }} />
          </div>
          <input placeholder="קישור לתמונה (URL)" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })}
            style={{ width: '100%', background: '#0f1629', border: '1px solid #1e2d4a', borderRadius: 8, padding: '10px 12px', color: '#e8eaf6', fontSize: 14, marginBottom: 12 }} />
          <textarea placeholder="הערות..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
            style={{ width: '100%', background: '#0f1629', border: '1px solid #1e2d4a', borderRadius: 8, padding: '10px 12px', color: '#e8eaf6', fontSize: 14, resize: 'vertical', marginBottom: 16 }} />
          <button onClick={submit}
            style={{ background: '#3b82f6', border: 'none', borderRadius: 8, padding: '10px 24px', color: '#fff', fontWeight: 700, fontSize: 14 }}>
            שמור גרף
          </button>
        </div>
      )}

      {charts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#4a5568' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
          <div>עדיין אין גרפים. הוסף את הגרף המנצח הראשון שלך!</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {charts.map(chart => (
            <div key={chart.id}
              onClick={() => setSelected(selected?.id === chart.id ? null : chart)}
              style={{
                background: '#141b2d',
                border: `1px solid ${selected?.id === chart.id ? '#3b82f6' : '#1e2d4a'}`,
                borderRadius: 12,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}>
              {chart.imageUrl && (
                <img src={chart.imageUrl} alt={chart.ticker}
                  style={{ width: '100%', height: 160, objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none'; }} />
              )}
              <div style={{ padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#3b82f6' }}>{chart.ticker}</span>
                    {chart.gainPct && <span style={{ marginRight: 8, color: '#10b981', fontWeight: 600 }}>+{chart.gainPct}%</span>}
                  </div>
                  <button onClick={e => { e.stopPropagation(); deleteChart(chart.id); }}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: 16 }}>🗑️</button>
                </div>
                <div style={{ marginTop: 6, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {chart.pattern && <span style={{ background: '#1a2240', borderRadius: 4, padding: '2px 8px', fontSize: 12, color: '#8892b0' }}>{chart.pattern}</span>}
                  {chart.catalyst && <span style={{ background: '#1a2240', borderRadius: 4, padding: '2px 8px', fontSize: 12, color: '#8892b0' }}>{chart.catalyst}</span>}
                </div>
                {chart.date && <div style={{ marginTop: 6, fontSize: 12, color: '#4a5568' }}>{chart.date}</div>}
                {selected?.id === chart.id && chart.notes && (
                  <div style={{ marginTop: 10, fontSize: 13, color: '#8892b0', borderTop: '1px solid #1e2d4a', paddingTop: 10 }}>{chart.notes}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
