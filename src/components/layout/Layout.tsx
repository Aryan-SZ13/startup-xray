import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useAppState } from '../../store/AppContext';
import { CommandPalette } from '../shared/CommandPalette';
import { ToastProvider } from '../shared/Toast';

export const Layout: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen } = useAppState();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-500/20">
      <ToastProvider>
        <Navbar />
        
        <main className="flex-1 flex flex-col pt-14 relative w-full overflow-hidden">
          <Outlet />
        </main>

        <Footer />
        
        <CommandPalette 
          isOpen={commandPaletteOpen} 
          onClose={() => setCommandPaletteOpen(false)} 
        />
      </ToastProvider>
    </div>
  );
};
