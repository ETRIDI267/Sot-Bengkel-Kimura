import React, { useState, useEffect } from 'react';
import { DataProvider } from '../context/DataContext';
import AppLayout from '../components/layout/AppLayout';
import LandingPage from '../features/landing/LandingPage';
import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import SuppliersPage from '../features/suppliers/SuppliersPage';
import CriteriaPage from '../features/criteria/CriteriaPage';
import WeightsPage from '../features/weights/WeightsPage';
import AssessmentsPage from '../features/assessments/AssessmentsPage';
import SawPage from '../features/saw/SawPage';
import RankingPage from '../features/ranking/RankingPage';
import ReportsPage from '../features/reports/ReportsPage';
import { DEFAULT_ROUTE } from './routes';

const APP_INTERNAL_ROUTES = [
  'dashboard',
  'suppliers',
  'criteria',
  'weights',
  'assessments',
  'saw',
  'ranking',
  'reports'
];

function resolveRouteFromHash(hashString) {
  const cleanHash = (hashString || '').replace(/^#/, '').trim();
  if (cleanHash === 'login') {
    return 'login';
  }
  if (APP_INTERNAL_ROUTES.includes(cleanHash)) {
    return cleanHash;
  }
  // Default to 'landing' for '', 'landing', or section anchors ('beranda', 'tentang', 'keunggulan', 'kriteria', 'alur-saw')
  return 'landing';
}

function MainApp() {
  // Autentikasi Prototype (disimpan di session state / memory)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    name: 'Admin Bengkel',
    role: 'Administrator (Demo)'
  });

  // Rute aktif disinkronkan dengan Hash URL browser
  const [currentRoute, setCurrentRoute] = useState(() => {
    return resolveRouteFromHash(window.location.hash);
  });

  useEffect(() => {
    const handleHashChange = () => {
      const resolved = resolveRouteFromHash(window.location.hash);
      setCurrentRoute(resolved);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (routeId) => {
    setCurrentRoute(routeId);
    window.location.hash = `#${routeId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentRoute('dashboard');
    window.location.hash = '#dashboard';
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentRoute('landing');
    window.location.hash = '#landing';
  };

  // 1. Tampilan Khusus Landing Page Publik (Default)
  if (currentRoute === 'landing') {
    return (
      <LandingPage
        onGoToLogin={() => handleNavigate('login')}
        onGoToDashboard={() => handleNavigate('dashboard')}
        isAuthenticated={isAuthenticated}
      />
    );
  }

  // 2. Tampilan Khusus Login
  if (currentRoute === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLogin}
        onBackToLanding={() => handleNavigate('landing')}
      />
    );
  }

  // 3. Jika pengguna belum login dan mengakses halaman internal
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLoginSuccess={handleLogin}
        onBackToLanding={() => handleNavigate('landing')}
      />
    );
  }

  // 4. Router Konten Dashboard Internal
  const renderContent = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'suppliers':
        return <SuppliersPage />;
      case 'criteria':
        return <CriteriaPage />;
      case 'weights':
        return <WeightsPage />;
      case 'assessments':
        return <AssessmentsPage />;
      case 'saw':
        return <SawPage />;
      case 'ranking':
        return <RankingPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppLayout
      currentRoute={currentRoute}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      user={user}
    >
      {renderContent()}
    </AppLayout>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
