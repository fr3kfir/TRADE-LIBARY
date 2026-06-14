import React, { useState } from 'react';
import { TRADERS } from '../data/traders';

export default function Checklist({ checklist, setChecklist }) {
  const [selected, setSelected] = useState(TRADERS[0].id);
  const [newItem, setNewItem] = useState('');

  const trader = TRADERS.find(t => t.id === selected);
  const items = checklist[selected] || [];
  const checked = items.filter(i => i.checked).length;
  const pct = items.length ? Math.round((checked / items.length) * 100) : 0;

  function toggle(i) {
    const updated = items.map((item, idx) => idx === i ? { ...item, checked: !item.checked } : item);
    setChecklist({ ...checklist, [selected]: updated });
  }

  function resetAll() {
    const updated = items.map(item => ({ ...item, checked: false }));
    setChecklist({ ...checklist, [selected]: updated });
  }

  function addItem() {
    if (!newItem.trim()) return;
    setChecklist({ ...checklist, [selected]: [...items, { text: newItem.trim(), checked: false }] });
    setNewItem('');
  }

  function deleteItem(i) {
    setChecklist({ ...checklist, [selected]: items.filter((_, idx) => idx !== i) });
  }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>צ'קליסט לפני עסקה</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
        {TRADERS.map(t => (
          <button key={t.id} onClick={() => setSelected(t.id)}
            style={{
              padding: '10px 20px', borderRadius: 8,
              border: `2px solid ${selected === t.id ? t.color : '#1e2d4a'}`,
              background: selected === t.id ? t.color + '22' : '#141b2d',
              color: selected === t.id ? t.color : '#8892b0',
              fontWeight: 600, fontSize: 14,
            }}>
            {t.emoji} {t.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div style={{ background: '#141b2d', borderRadius: 12, border: '1px solid #1e2d4a', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: trader.color }}>{checked}/{items.length} הושלמו</div>
          </div>
          <button onClick={resetAll}
            style={{ background: '#1e2d4a', border: 'none', borderRadius: 6, padding: '6px 14px', color: '#8892b0', fontSize: 13 }}>
            אפס הכל
          </button>
        </div>

        <div style={{ background: '#0f1629', borderRadius: 6, height: 8, marginBottom: 20, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: pct === 100 ? '#10b981' : trader.color,
            borderRadius: 6,
            transition: 'width 0.3s ease',
          }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item, i) => (
            <div key={i} onClick={() => toggle(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px',
                background: item.checked ? trader.color + '15' : '#0f1629',
                borderRadius: 8,
                border: `1px solid ${item.checked ? trader.color + '40' : '#1e2d4a'}`,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}>
              <div style={{
                width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                border: `2px solid ${item.checked ? trader.color : '#4a5568'}`,
                background: item.checked ? trader.color : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {item.checked && <span style={{ color: '#0a0e1a', fontSize: 12, fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ flex: 1, fontSize: 14, color: item.checked ? '#8892b0' : '#e8eaf6', textDecoration: item.checked ? 'line-through' : 'none' }}>
                {item.text}
              </span>
              <button onClick={e => { e.stopPropagation(); deleteItem(i); }}
                style={{ background: 'transparent', border: 'none', color: '#4a5568', fontSize: 14, padding: '0 4px' }}>✕</button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <input value={newItem} onChange={e => setNewItem(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem()}
            placeholder="הוסף פריט לצ'קליסט..."
            style={{ flex: 1, background: '#0f1629', border: '1px solid #1e2d4a', borderRadius: 8, padding: '10px 14px', color: '#e8eaf6', fontSize: 14 }} />
          <button onClick={addItem}
            style={{ background: trader.color, border: 'none', borderRadius: 8, padding: '10px 20px', color: '#0a0e1a', fontWeight: 700, fontSize: 14 }}>
            + הוסף
          </button>
        </div>

        {pct === 100 && items.length > 0 && (
          <div style={{ marginTop: 16, textAlign: 'center', padding: '12px', background: '#10b98120', borderRadius: 8, color: '#10b981', fontWeight: 600 }}>
            ✅ כל הפריטים הושלמו! מוכן לעסקה 🚀
          </div>
        )}
      </div>
    </div>
  );
}
