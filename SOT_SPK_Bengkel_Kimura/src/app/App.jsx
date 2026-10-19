import React, { useState, useEffect } from 'react';
import { DataProvider } from '../context/DataContext';
import AppLayout from '../components/layout/AppLayout';
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

function MainApp() {
  // Autentikasi Prototype (disimpan di session state / memory)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    name: 'Admin Bengkel',
    role: 'Administrator (Demo)'
  });

  // Rute aktif disinkronkan dengan Hash URL browser
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || DEFAULT_ROUTE;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentRoute(hash);
      }
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
    setCurrentRoute(DEFAULT_ROUTE);
    window.location.hash = `#${DEFAULT_ROUTE}`;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.location.hash = '';
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLogin} />;
  }

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
