import React from 'react';
import { IconMenu, IconAlert } from '../ui/Icons';
import { NAV_ITEMS } from '../../app/routes';

export default function Topbar({ currentRoute, onToggleSidebar }) {
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
        <div className="demo-tag" title="Data dan autentikasi dalam tahap prototype">
          <IconAlert size={14} />
          <span>Prototype Demo</span>
        </div>
      </div>
    </header>
  );
}
