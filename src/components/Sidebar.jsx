import React from 'react';

const NAV = [
  { id: 'traders', label: 'סוחרים', icon: '👤' },
  { id: 'charts', label: 'מאגר גרפים', icon: '📊' },
  { id: 'checklist', label: "צ'קליסט", icon: '✅' },
  { id: 'flashcards', label: 'כרטיסיות לימוד', icon: '🃏' },
  { id: 'notes', label: 'יומן למידה', icon: '📝' },
];

export default function Sidebar({ active, onNav }) {
  return (
    <aside style={{
      width: 220,
      minHeight: '100vh',
      background: '#0f1629',
      borderLeft: '1px solid #1e2d4a',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
      position: 'fixed',
      right: 0,
      top: 0,
    }}>
      <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #1e2d4a' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#e8eaf6', letterSpacing: 1 }}>📈 Trading</div>
        <div style={{ fontSize: 13, color: '#8892b0', marginTop: 2 }}>Method Tracker</div>
      </div>
      <nav style={{ marginTop: 16, flex: 1 }}>
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: '12px 20px',
              background: active === item.id ? '#1a2240' : 'transparent',
              border: 'none',
              borderRight: active === item.id ? '3px solid #3b82f6' : '3px solid transparent',
              color: active === item.id ? '#e8eaf6' : '#8892b0',
              fontSize: 14,
              textAlign: 'right',
              transition: 'all 0.15s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.background = '#141b2d'; }}
            onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.background = 'transparent'; }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
