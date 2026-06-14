import React, { useEffect, useState } from 'react';

export default function Notes({ notes, setNotes }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 800);
    return () => clearTimeout(timer);
  }, [notes]);

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>יומן למידה</h2>
        <div style={{ fontSize: 13, color: saved ? '#10b981' : '#4a5568', transition: 'color 0.3s' }}>
          {saved ? '✓ נשמר' : 'שמירה אוטומטית...'}
        </div>
      </div>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder={`📝 יומן המסחר שלך...\n\nרשום כאן:\n• תובנות מהיום\n• שגיאות שלמדת מהן\n• תבניות שזיהית\n• מטרות לשבוע הבא`}
        style={{
          flex: 1,
          background: '#141b2d',
          border: '1px solid #1e2d4a',
          borderRadius: 12,
          padding: 20,
          color: '#e8eaf6',
          fontSize: 15,
          lineHeight: 1.7,
          resize: 'none',
          outline: 'none',
          fontFamily: 'inherit',
          direction: 'rtl',
        }}
      />
      <div style={{ marginTop: 10, fontSize: 12, color: '#4a5568' }}>
        {notes.length} תווים · {notes.split('\n').filter(l => l.trim()).length} שורות
      </div>
    </div>
  );
}
