import React, { useState } from 'react';
import { TRADERS } from '../data/traders';

export default function Flashcards({ flashcards, setFlashcards }) {
  const [selected, setSelected] = useState(TRADERS[0].id);
  const [flipped, setFlipped] = useState({});
  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');

  const trader = TRADERS.find(t => t.id === selected);
  const cards = flashcards[selected] || [];

  function flip(i) {
    setFlipped(f => ({ ...f, [i]: !f[i] }));
  }

  function addCard() {
    if (!newQ.trim() || !newA.trim()) return;
    setFlashcards({ ...flashcards, [selected]: [...cards, { q: newQ.trim(), a: newA.trim() }] });
    setNewQ(''); setNewA(''); setAddMode(false);
  }

  function deleteCard(i) {
    setFlashcards({ ...flashcards, [selected]: cards.filter((_, idx) => idx !== i) });
    if (current >= cards.length - 1) setCurrent(Math.max(0, cards.length - 2));
  }

  function changeTrader(id) {
    setSelected(id);
    setCurrent(0);
    setFlipped({});
  }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>כרטיסיות לימוד</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
        {TRADERS.map(t => (
          <button key={t.id} onClick={() => changeTrader(t.id)}
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

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <button onClick={() => setShowAll(!showAll)}
          style={{ background: '#1e2d4a', border: 'none', borderRadius: 8, padding: '8px 16px', color: '#8892b0', fontSize: 13 }}>
          {showAll ? 'מצב אחת-אחת' : 'הצג הכל'}
        </button>
        <button onClick={() => setAddMode(!addMode)}
          style={{ background: '#3b82f6', border: 'none', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 13 }}>
          {addMode ? 'ביטול' : '+ כרטיסייה חדשה'}
        </button>
      </div>

      {addMode && (
        <div style={{ background: '#141b2d', border: '1px solid #1e2d4a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <textarea placeholder="שאלה..." value={newQ} onChange={e => setNewQ(e.target.value)} rows={2}
            style={{ width: '100%', background: '#0f1629', border: '1px solid #1e2d4a', borderRadius: 8, padding: '10px 12px', color: '#e8eaf6', fontSize: 14, resize: 'none', marginBottom: 10 }} />
          <textarea placeholder="תשובה..." value={newA} onChange={e => setNewA(e.target.value)} rows={2}
            style={{ width: '100%', background: '#0f1629', border: '1px solid #1e2d4a', borderRadius: 8, padding: '10px 12px', color: '#e8eaf6', fontSize: 14, resize: 'none', marginBottom: 12 }} />
          <button onClick={addCard}
            style={{ background: trader.color, border: 'none', borderRadius: 8, padding: '8px 20px', color: '#0a0e1a', fontWeight: 700, fontSize: 14 }}>
            הוסף
          </button>
        </div>
      )}

      {cards.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#4a5568' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🃏</div>
          <div>אין כרטיסיות עדיין. הוסף כרטיסייה ראשונה!</div>
        </div>
      ) : showAll ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cards.map((card, i) => (
            <div key={i} onClick={() => flip(i)}
              style={{
                background: '#141b2d', border: `1px solid ${flipped[i] ? trader.color + '60' : '#1e2d4a'}`,
                borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'border-color 0.15s',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ color: '#8892b0', fontSize: 12, marginBottom: 6 }}>שאלה</div>
                  <div style={{ fontSize: 15, color: '#e8eaf6', marginBottom: flipped[i] ? 12 : 0 }}>{card.q}</div>
                  {flipped[i] && (
                    <>
                      <div style={{ color: trader.color, fontSize: 12, marginBottom: 6 }}>תשובה</div>
                      <div style={{ fontSize: 15, color: trader.color }}>{card.a}</div>
                    </>
                  )}
                </div>
                <button onClick={e => { e.stopPropagation(); deleteCard(i); }}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: 16, alignSelf: 'flex-start' }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: '#8892b0', marginBottom: 16 }}>
            כרטיסייה {current + 1} מתוך {cards.length} — לחץ לחשיפת התשובה
          </div>
          <div onClick={() => flip(current)}
            style={{
              width: '100%', maxWidth: 500, minHeight: 220,
              background: '#141b2d', border: `2px solid ${flipped[current] ? trader.color : '#1e2d4a'}`,
              borderRadius: 16, padding: 32, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              textAlign: 'center', transition: 'border-color 0.2s',
            }}>
            {!flipped[current] ? (
              <>
                <div style={{ color: '#8892b0', fontSize: 12, marginBottom: 12 }}>❓ שאלה</div>
                <div style={{ fontSize: 18, color: '#e8eaf6', lineHeight: 1.5 }}>{cards[current]?.q}</div>
              </>
            ) : (
              <>
                <div style={{ color: trader.color, fontSize: 12, marginBottom: 12 }}>💡 תשובה</div>
                <div style={{ fontSize: 18, color: trader.color, lineHeight: 1.5 }}>{cards[current]?.a}</div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button onClick={() => { setCurrent(c => Math.max(0, c - 1)); setFlipped({}); }}
              disabled={current === 0}
              style={{ background: '#1e2d4a', border: 'none', borderRadius: 8, padding: '10px 24px', color: current === 0 ? '#4a5568' : '#e8eaf6', fontSize: 14 }}>
              ← הקודמת
            </button>
            <button onClick={() => { setCurrent(c => Math.min(cards.length - 1, c + 1)); setFlipped({}); }}
              disabled={current === cards.length - 1}
              style={{ background: '#1e2d4a', border: 'none', borderRadius: 8, padding: '10px 24px', color: current === cards.length - 1 ? '#4a5568' : '#e8eaf6', fontSize: 14 }}>
              הבאה →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
