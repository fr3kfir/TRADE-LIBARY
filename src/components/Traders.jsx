import React, { useState } from 'react';
import { TRADERS } from '../data/traders';

export default function Traders({ traderRules, setTraderRules }) {
  const [selected, setSelected] = useState(TRADERS[0].id);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [newRule, setNewRule] = useState('');

  const trader = TRADERS.find(t => t.id === selected);
  const rules = traderRules[selected] || [];

  function startEdit(i) {
    setEditingIndex(i);
    setEditText(rules[i]);
  }

  function saveEdit(i) {
    const updated = [...rules];
    updated[i] = editText;
    setTraderRules({ ...traderRules, [selected]: updated });
    setEditingIndex(null);
  }

  function deleteRule(i) {
    const updated = rules.filter((_, idx) => idx !== i);
    setTraderRules({ ...traderRules, [selected]: updated });
  }

  function addRule() {
    if (!newRule.trim()) return;
    setTraderRules({ ...traderRules, [selected]: [...rules, newRule.trim()] });
    setNewRule('');
  }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>פרופילי סוחרים</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
        {TRADERS.map(t => (
          <button
            key={t.id}
            onClick={() => { setSelected(t.id); setEditingIndex(null); }}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: `2px solid ${selected === t.id ? t.color : '#1e2d4a'}`,
              background: selected === t.id ? t.color + '22' : '#141b2d',
              color: selected === t.id ? t.color : '#8892b0',
              fontWeight: 600,
              fontSize: 14,
              transition: 'all 0.15s',
            }}
          >
            {t.emoji} {t.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div style={{ background: '#141b2d', borderRadius: 12, border: '1px solid #1e2d4a', padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ fontSize: 28 }}>{trader.emoji}</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: trader.color }}>{trader.name}</div>
            <div style={{ fontSize: 13, color: '#8892b0' }}>כללי מסחר אישיים</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rules.map((rule, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              background: '#0f1629',
              borderRadius: 8,
              border: '1px solid #1e2d4a',
            }}>
              <span style={{ color: trader.color, fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
              {editingIndex === i ? (
                <>
                  <input
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && saveEdit(i)}
                    style={{
                      flex: 1,
                      background: '#1a2240',
                      border: '1px solid #3b82f6',
                      borderRadius: 6,
                      padding: '6px 10px',
                      color: '#e8eaf6',
                      fontSize: 14,
                    }}
                    autoFocus
                  />
                  <button onClick={() => saveEdit(i)} style={{ background: '#10b981', border: 'none', borderRadius: 6, padding: '6px 12px', color: '#fff', fontSize: 13 }}>שמור</button>
                  <button onClick={() => setEditingIndex(null)} style={{ background: '#1e2d4a', border: 'none', borderRadius: 6, padding: '6px 12px', color: '#8892b0', fontSize: 13 }}>ביטול</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontSize: 14, color: '#e8eaf6' }}>{rule}</span>
                  <button onClick={() => startEdit(i)} style={{ background: 'transparent', border: 'none', color: '#8892b0', fontSize: 16, padding: '2px 6px' }}>✏️</button>
                  <button onClick={() => deleteRule(i)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: 16, padding: '2px 6px' }}>🗑️</button>
                </>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <input
            value={newRule}
            onChange={e => setNewRule(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addRule()}
            placeholder="הוסף כלל חדש..."
            style={{
              flex: 1,
              background: '#0f1629',
              border: '1px solid #1e2d4a',
              borderRadius: 8,
              padding: '10px 14px',
              color: '#e8eaf6',
              fontSize: 14,
            }}
          />
          <button
            onClick={addRule}
            style={{
              background: trader.color,
              border: 'none',
              borderRadius: 8,
              padding: '10px 20px',
              color: '#0a0e1a',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            + הוסף
          </button>
        </div>
      </div>
    </div>
  );
}
