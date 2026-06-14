import { useState, useEffect } from 'react';
import { TRADERS } from '../data/traders';

function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function useStore() {
  const [traderRules, setTraderRules] = useState(() => {
    const defaults = {};
    TRADERS.forEach(t => { defaults[t.id] = t.defaultRules; });
    return loadFromStorage('traderRules', defaults);
  });

  const [charts, setCharts] = useState(() => loadFromStorage('charts', []));

  const [checklist, setChecklist] = useState(() => {
    const defaults = {};
    TRADERS.forEach(t => { defaults[t.id] = t.defaultChecklist.map(item => ({ text: item, checked: false })); });
    return loadFromStorage('checklist', defaults);
  });

  const [flashcards, setFlashcards] = useState(() => {
    const defaults = {};
    TRADERS.forEach(t => { defaults[t.id] = t.defaultFlashcards; });
    return loadFromStorage('flashcards', defaults);
  });

  const [notes, setNotes] = useState(() => loadFromStorage('notes', ''));

  useEffect(() => { saveToStorage('traderRules', traderRules); }, [traderRules]);
  useEffect(() => { saveToStorage('charts', charts); }, [charts]);
  useEffect(() => { saveToStorage('checklist', checklist); }, [checklist]);
  useEffect(() => { saveToStorage('flashcards', flashcards); }, [flashcards]);
  useEffect(() => { saveToStorage('notes', notes); }, [notes]);

  return {
    traderRules, setTraderRules,
    charts, setCharts,
    checklist, setChecklist,
    flashcards, setFlashcards,
    notes, setNotes,
  };
}
