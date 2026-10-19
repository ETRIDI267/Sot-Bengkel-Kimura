import React from 'react';
import {
  IconDashboard,
  IconSuppliers,
  IconCriteria,
  IconWeights,
  IconAssessments,
  IconSaw,
  IconRanking,
  IconReports,
  IconLogout,
  IconClose
} from '../ui/Icons';
import { NAV_ITEMS } from '../../app/routes';

const iconMap = {
  IconDashboard,
  IconSuppliers,
  IconCriteria,
  IconWeights,
  IconAssessments,
  IconSaw,
  IconRanking,
  IconReports
};

export default function Sidebar({ currentRoute, onNavigate, isOpen, onClose, onLogout, user }) {
  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="Navigasi Utama">
        <div className="sidebar-brand">
          <div className="brand-icon" aria-hidden="true">
            K
          </div>
          <div className="brand-text">
            <h1>KIMURA SPK</h1>
            <span>SPK Supplier Sparepart SAW</span>
          </div>
          {isOpen && (
            <button
              type="button"
              className="sidebar-toggle-btn"
              onClick={onClose}
              style={{ marginLeft: 'auto', background: 'transparent', color: '#fff', border: 'none' }}
              aria-label="Tutup menu sidebar"
            >
              <IconClose size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Menu Utama</div>
          {NAV_ITEMS.map((item) => {
            const IconComponent = iconMap[item.icon] || IconDashboard;
            const isActive = currentRoute === item.id;

            return (
              <a
                key={item.id}
                href={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                  if (onClose) onClose();
                }}
              >
                <span className="nav-icon" aria-hidden="true">
                  <IconComponent size={18} />
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-badge">
            <div className="user-info">
              <div className="user-avatar" aria-hidden="true">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="user-meta">
                <div className="user-name">{user?.name || 'Admin Bengkel'}</div>
                <div className="user-role">{user?.role || 'Administrator (Demo)'}</div>
              </div>
            </div>
            <button
              type="button"
              className="btn-logout-icon"
              onClick={onLogout}
              title="Keluar (Logout)"
              aria-label="Keluar dari akun demo"
            >
              <IconLogout size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
