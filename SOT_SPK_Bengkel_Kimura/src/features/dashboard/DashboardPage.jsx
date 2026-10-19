import React, { useState, useMemo } from 'react';
import { useAppData } from '../../context/DataContext';
import { calculateSAW } from '../../services/saw';
import {
  IconSuppliers,
  IconCriteria,
  IconRanking,
  IconCheck,
  IconAlert,
  IconInfo
} from '../../components/ui/Icons';

export default function DashboardPage({ onNavigate }) {
  const {
    suppliers,
    criteria,
    assessments,
    totalCriteriaWeight,
    isWeightsValid,
    storageMeta,
    resetDataToDemo
  } = useAppData();

  const [notification, setNotification] = useState('');

  // Kalkulasi dinamis ranking SAW untuk widget dashboard
  const calculationResult = useMemo(() => {
    return calculateSAW(suppliers, criteria, assessments);
  }, [suppliers, criteria, assessments]);

  const topSupplier = calculationResult.isValid && calculationResult.rankedResults?.[0]
    ? calculationResult.rankedResults[0]
    : null;

  const handleResetDemo = () => {
    const isConfirmed = window.confirm(
      'Apakah Anda yakin ingin mengatur ulang semua data lokal kembali ke data demo awal?'
    );
    if (isConfirmed) {
      resetDataToDemo();
      setNotification('Data berhasil di-reset kembali ke data demo bawaan.');
      setTimeout(() => setNotification(''), 4000);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>Ringkasan Eksekutif & Dashboard</h2>
          <p>
            Sistem Pendukung Keputusan Pemilihan Supplier Sparepart Bengkel Kimura berbasis Simple Additive Weighting (SAW).
          </p>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleResetDemo}
            title="Kembalikan data ke kondisi awal"
          >
            Reset ke Data Demo
          </button>
        </div>
      </div>

      {notification && (
        <div className="alert-box alert-info" style={{ marginBottom: '16px' }}>
          <IconInfo size={18} />
          <span>{notification}</span>
        </div>
      )}

      {/* Banner Disclaimer Data Demo & Penyimpanan */}
      <div className="alert-box alert-warning" role="note">
        <IconAlert size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Status Penyimpanan: {storageMeta.type.toUpperCase()} (Tahap Step 6 Aktif)</strong>
          <div style={{ marginTop: '4px', fontSize: '13px' }}>
            Data kriteria, bobot, penilaian, dan perhitungan SAW terhubung dinamis ke layer penyimpanan lokal ({storageMeta.type}). Seluruh data berlabel <strong>Data Contoh / Mockup</strong> untuk validasi antarmuka sebelum disinkronkan dengan data aktual pemilik Bengkel Kimura.
          </div>
        </div>
      </div>

      {/* Grid Metrik Dinamis */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Total Supplier Terdaftar</span>
            <div className="metric-icon-box">
              <IconSuppliers size={18} />
            </div>
          </div>
          <div className="metric-value">{suppliers.length}</div>
          <div className="metric-hint">
            <span className="demo-tag" style={{ padding: '2px 8px', fontSize: '11px' }}>
              Data Contoh
            </span>{' '}
            Tersimpan di {storageMeta.type}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Jumlah Kriteria Aktif</span>
            <div className="metric-icon-box">
              <IconCriteria size={18} />
            </div>
          </div>
          <div className="metric-value">{criteria.length}</div>
          <div className="metric-hint">
            <span className="demo-tag" style={{ padding: '2px 8px', fontSize: '11px' }}>
              Data Contoh
            </span>{' '}
            {criteria.map((c) => c.code).join(', ')}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Supplier Rekomendasi Teratas</span>
            <div className="metric-icon-box">
              <IconRanking size={18} />
            </div>
          </div>
          <div className="metric-value" style={{ fontSize: '19px', paddingTop: '6px' }}>
            {topSupplier ? topSupplier.supplierName : 'Belum Terhitung'}
          </div>
          <div className="metric-hint">
            {topSupplier ? (
              <span>
                <span className="demo-tag" style={{ padding: '2px 8px', fontSize: '11px' }}>
                  Peringkat #1
                </span>{' '}
                Skor Vi: <strong>{topSupplier.finalScore.toFixed(4)}</strong>
              </span>
            ) : (
              <span style={{ color: 'var(--ink-500)' }}>Lengkapi nilai penilaian</span>
            )}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Akumulasi Bobot Kriteria</span>
            <div
              className="metric-icon-box"
              style={{
                background: isWeightsValid ? '#ecfdf5' : '#fef2f2',
                color: isWeightsValid ? '#15803d' : '#b91c1c'
              }}
            >
              <IconCheck size={18} />
            </div>
          </div>
          <div className="metric-value" style={{ fontSize: '24px' }}>
            {totalCriteriaWeight}%
          </div>
          <div className="metric-hint">
            {isWeightsValid ? (
              <span style={{ color: 'var(--success)', fontWeight: '600' }}>
                ✓ Bobot valid (tepat 100%)
              </span>
            ) : (
              <span style={{ color: 'var(--danger)', fontWeight: '600' }}>
                ⚠ Total bobot harus 100%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Ringkasan Model Data Demo & Navigasi Cepat */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Daftar Kriteria Terkonfigurasi</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {criteria.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 12px',
                  background: 'var(--canvas)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '13.5px'
                }}
              >
                <div>
                  <span style={{ fontWeight: '700', marginRight: '8px' }}>{c.code}</span>
                  <span>{c.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      background: c.type === 'benefit' ? '#ecfdf5' : '#fef2f2',
                      color: c.type === 'benefit' ? '#15803d' : '#b91c1c'
                    }}
                  >
                    {c.type}
                  </span>
                  <span style={{ fontWeight: '600' }}>{c.weight}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Akses Modul SPK Cepat</h3>
          </div>
          <p style={{ fontSize: '13.5px', marginBottom: '16px' }}>
            Modul perhitungan dan perankingan telah aktif sepenuhnya berdasarkan mesin matematis SAW:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigate('ranking')}
            >
              Lihat Hasil Ranking
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate('saw')}
            >
              Audit Perhitungan SAW
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate('assessments')}
            >
              Ubah Nilai Penilaian
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate('weights')}
            >
              Sesuaikan Bobot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
