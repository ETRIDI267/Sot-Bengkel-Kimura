import React from 'react';
import { IconInfo } from './Icons';

export default function PlaceholderView({
  title,
  stepNumber,
  stepTitle,
  description,
  plannedFeatures,
  onNavigateBack
}) {
  return (
    <div className="placeholder-card">
      <div className="placeholder-badge">
        <IconInfo size={14} />
        <span>Rencana Implementasi: {stepNumber}</span>
      </div>

      <div className="placeholder-icon-wrap" aria-hidden="true">
        <span style={{ fontSize: '24px', fontWeight: '700' }}>{stepNumber.replace('Step ', '')}</span>
      </div>

      <h2 className="placeholder-title">{title}</h2>
      <p className="placeholder-desc">{description}</p>

      <div className="placeholder-checklist">
        <div className="placeholder-checklist-title">
          Fitur yang dijadwalkan pada {stepTitle || stepNumber}:
        </div>
        <ul>
          {plannedFeatures.map((feat, idx) => (
            <li key={idx}>
              <span style={{ color: 'var(--brand-600)', fontWeight: 'bold' }}>•</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onNavigateBack}
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
