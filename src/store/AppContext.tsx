import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { EcosystemType, WatchlistItem, WatchlistChange, Thesis } from '../data/types';

interface AppState {
  ecosystem: EcosystemType;
  setEcosystem: (e: EcosystemType) => void;
  watchlist: WatchlistItem[];
  addToWatchlist: (companyId: string) => void;
  removeFromWatchlist: (companyId: string) => void;
  isWatching: (companyId: string) => boolean;
  searchHistory: string[];
  addSearchHistory: (query: string) => void;
  investigatedCompanies: string[];
  addInvestigatedCompany: (companyId: string) => void;
  theses: Thesis[];
  addThesis: (thesis: Thesis) => void;
  linkedInConnected: boolean;
  setLinkedInConnected: (v: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (v: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {}
  return fallback;
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ecosystem, setEcosystemState] = useState<EcosystemType>(
    () => loadFromStorage<EcosystemType>('xray-ecosystem', 'SRM')
  );
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(
    () => loadFromStorage<WatchlistItem[]>('xray-watchlist', [])
  );
  const [searchHistory, setSearchHistory] = useState<string[]>(
    () => loadFromStorage<string[]>('xray-search-history', [])
  );
  const [investigatedCompanies, setInvestigatedCompanies] = useState<string[]>(
    () => loadFromStorage<string[]>('xray-investigated', [])
  );
  const [theses, setTheses] = useState<Thesis[]>(
    () => loadFromStorage<Thesis[]>('xray-theses', [])
  );
  const [linkedInConnected, setLinkedInConnected] = useState(
    () => loadFromStorage<boolean>('xray-linkedin', false)
  );
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => { saveToStorage('xray-ecosystem', ecosystem); }, [ecosystem]);
  useEffect(() => { saveToStorage('xray-watchlist', watchlist); }, [watchlist]);
  useEffect(() => { saveToStorage('xray-search-history', searchHistory); }, [searchHistory]);
  useEffect(() => { saveToStorage('xray-investigated', investigatedCompanies); }, [investigatedCompanies]);
  useEffect(() => { saveToStorage('xray-theses', theses); }, [theses]);
  useEffect(() => { saveToStorage('xray-linkedin', linkedInConnected); }, [linkedInConnected]);

  const setEcosystem = useCallback((e: EcosystemType) => setEcosystemState(e), []);

  const addToWatchlist = useCallback((companyId: string) => {
    setWatchlist(prev => {
      if (prev.find(w => w.companyId === companyId)) return prev;
      const demoChanges: WatchlistChange[] = [
        { type: 'FUNDING', description: 'New funding round announced', date: '2024-12-15', importance: 'HIGH' },
        { type: 'HIRING', description: 'Increased engineering hiring', date: '2024-12-10', importance: 'MEDIUM' },
      ];
      return [...prev, {
        companyId,
        addedAt: new Date().toISOString(),
        lastChecked: new Date().toISOString(),
        changes: demoChanges,
      }];
    });
  }, []);

  const removeFromWatchlist = useCallback((companyId: string) => {
    setWatchlist(prev => prev.filter(w => w.companyId !== companyId));
  }, []);

  const isWatching = useCallback((companyId: string) => {
    return watchlist.some(w => w.companyId === companyId);
  }, [watchlist]);

  const addSearchHistory = useCallback((query: string) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(q => q !== query);
      return [query, ...filtered].slice(0, 20);
    });
  }, []);

  const addInvestigatedCompany = useCallback((companyId: string) => {
    setInvestigatedCompanies(prev => {
      if (prev.includes(companyId)) return prev;
      return [companyId, ...prev].slice(0, 50);
    });
  }, []);

  const addThesis = useCallback((thesis: Thesis) => {
    setTheses(prev => [thesis, ...prev]);
  }, []);

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <AppContext.Provider value={{
      ecosystem, setEcosystem,
      watchlist, addToWatchlist, removeFromWatchlist, isWatching,
      searchHistory, addSearchHistory,
      investigatedCompanies, addInvestigatedCompany,
      theses, addThesis,
      linkedInConnected, setLinkedInConnected,
      commandPaletteOpen, setCommandPaletteOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}
