import React from 'react';
import { IconMenu, IconAlert } from '../ui/Icons';
import { NAV_ITEMS } from '../../app/routes';

export default function Topbar({ currentRoute, onToggleSidebar, onNavigate }) {
  const activeItem = NAV_ITEMS.find((item) => item.id === currentRoute) || {
    label: 'Dashboard'
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Buka menu navigasi"
        >
          <IconMenu size={20} />
        </button>

        <div className="page-breadcrumb">
          <span>Kimura SPK</span>
          <span>/</span>
          <span className="page-breadcrumb-current">{activeItem.label}</span>
        </div>
      </div>

      <div className="topbar-right">
        {onNavigate && (
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12.5px' }}
            onClick={() => onNavigate('landing')}
            title="Buka Landing Page Publik"
          >
            <span>Landing Page</span>
          </button>
        )}
        <div className="demo-tag" title="Data dan autentikasi dalam tahap prototype">
          <IconAlert size={14} />
          <span>Prototype Demo</span>
        </div>
      </div>
    </header>
  );
}
