import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Traders from './components/Traders';
import ChartVault from './components/ChartVault';
import Checklist from './components/Checklist';
import Flashcards from './components/Flashcards';
import Notes from './components/Notes';
import { useStore } from './hooks/useStore';

export default function App() {
  const [page, setPage] = useState('traders');
  const store = useStore();

  const PAGES = {
    traders: <Traders traderRules={store.traderRules} setTraderRules={store.setTraderRules} />,
    charts: <ChartVault charts={store.charts} setCharts={store.setCharts} />,
    checklist: <Checklist checklist={store.checklist} setChecklist={store.setChecklist} />,
    flashcards: <Flashcards flashcards={store.flashcards} setFlashcards={store.setFlashcards} />,
    notes: <Notes notes={store.notes} setNotes={store.setNotes} />,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
      <Sidebar active={page} onNav={setPage} />
      <main style={{ marginRight: 220, flex: 1, padding: '32px 36px', minHeight: '100vh' }}>
        {PAGES[page]}
      </main>
    </div>
  );
}
