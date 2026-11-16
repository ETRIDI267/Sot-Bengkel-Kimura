import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout({ currentRoute, onNavigate, onLogout, user, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
        user={user}
      />

      <div className="main-wrapper">
        <Topbar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="page-content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
