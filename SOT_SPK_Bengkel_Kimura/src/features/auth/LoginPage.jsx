import React, { useState } from 'react';
import { IconAlert, IconCheck, IconArrowRight, IconShield } from '../../components/ui/Icons';

export default function LoginPage({ onLoginSuccess, onBackToLanding }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username atau email wajib diisi.');
      return;
    }
    if (!password.trim()) {
      setError('Kata sandi (password) wajib diisi.');
      return;
    }

    // Simulasi Login Prototype Front-end
    setError('');
    onLoginSuccess({
      name: username.trim() || 'Admin Bengkel',
      role: 'Administrator (Demo)'
    });
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {onBackToLanding && (
          <div style={{ marginBottom: '20px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '7px 14px', fontSize: '13px' }}
              onClick={onBackToLanding}
            >
              ← Kembali ke Landing Page
            </button>
          </div>
        )}

        <div className="auth-header">
          <div className="auth-brand">
            <div className="brand-icon">K</div>
            <h1 className="auth-title">KIMURA SPK</h1>
          </div>
          <p className="auth-subtitle">
            Sistem Pendukung Keputusan Pemilihan Supplier Sparepart Bengkel Kimura (Metode SAW)
          </p>
          <div style={{ marginTop: '10px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                fontWeight: '600',
                color: 'var(--brand-700)',
                background: 'var(--brand-50)',
                border: '1px solid var(--brand-100)',
                padding: '3px 10px',
                borderRadius: '9999px'
              }}
            >
              <IconShield size={13} />
              Portal Admin & Evaluator
            </span>
          </div>
        </div>

        <div className="auth-demo-banner" role="status">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Pemberitahuan Prototype:</strong>
            <button
              type="button"
              onClick={handleFillDemo}
              style={{
                fontSize: '11px',
                textDecoration: 'underline',
                color: 'var(--warning)',
                fontWeight: '700',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              title="Isi otomatis username dan password demo"
            >
              Gunakan Akun Demo
            </button>
          </div>
          <p style={{ marginTop: '4px', fontSize: '12px' }}>
            Autentikasi ini adalah simulasi antarmuka front-end untuk keperluan pengujian dan demonstrasi sistem.
          </p>
        </div>

        {error && (
          <div className="alert-box alert-warning" style={{ marginBottom: '16px', padding: '10px 14px' }}>
            <IconAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username atau Email
            </label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin atau admin@kimura.com"
              autoComplete="username"
              required
            />
            <span className="form-helper">Akun demo default: <strong>admin</strong></span>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Kata Sandi (Password)
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            <span className="form-helper">Password demo bebas / sembarang (cth: <strong>admin123</strong>)</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px', padding: '12px' }}
          >
            <span>Masuk ke Dashboard Admin</span>
            <IconArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
