import React, { useState } from 'react';
import { IconAlert, IconCheck, IconArrowRight } from '../../components/ui/Icons';

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

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {onBackToLanding && (
          <div style={{ marginBottom: '16px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12.5px' }}
              onClick={onBackToLanding}
            >
              ← Kembali ke Beranda Landing Page
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
        </div>

        <div className="auth-demo-banner" role="status">
          <strong>Pemberitahuan Prototype:</strong>
          <p style={{ marginTop: '4px', fontSize: '12px' }}>
            Autentikasi ini adalah simulasi antarmuka front-end untuk keperluan pengujian dan demonstrasi sistem. Belum terhubung ke backend aman atau database produksi.
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
            <span className="form-helper">Akun demo default: admin</span>
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
            <span className="form-helper">Password demo bebas / sembarang</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px', padding: '12px' }}
          >
            <span>Masuk ke Dashboard</span>
            <IconArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
