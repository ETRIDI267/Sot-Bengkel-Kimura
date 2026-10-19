import React, { useState, useEffect } from 'react';
import { useAppData } from '../../context/DataContext';
import {
  IconWeights,
  IconCheck,
  IconAlert,
  IconInfo
} from '../../components/ui/Icons';

export default function WeightsPage() {
  const { criteria, saveAllWeights, isWeightsValid, totalCriteriaWeight } = useAppData();

  // State draft bobot lokal agar pengguna bisa mengedit dan melihat total sebelum menyimpan
  const [localWeights, setLocalWeights] = useState({});
  const [notification, setNotification] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sinkronkan saat data kriteria berubah
  useEffect(() => {
    const initialMap = {};
    criteria.forEach((c) => {
      initialMap[c.id] = c.weight;
    });
    setLocalWeights(initialMap);
  }, [criteria]);

  // Hitung total akumulasi bobot lokal
  const currentTotal = criteria.reduce(
    (sum, c) => sum + (Number(localWeights[c.id]) || 0),
    0
  );
  const isValid100 = Math.abs(currentTotal - 100) < 0.001;
  const difference = (100 - currentTotal).toFixed(1);

  // Handler ubah nilai bobot kriteria tertentu
  const handleChangeWeight = (criterionId, val) => {
    const num = val === '' ? '' : Math.max(0, Number(val));
    setLocalWeights((prev) => ({
      ...prev,
      [criterionId]: num
    }));
    setErrorMessage('');
  };

  // Bagi Rata Bobot ke semua kriteria
  const handleDivideEqually = () => {
    if (criteria.length === 0) return;
    const baseShare = Math.floor((100 / criteria.length) * 10) / 10;
    const newWeights = {};
    let runningSum = 0;

    criteria.forEach((c, idx) => {
      if (idx === criteria.length - 1) {
        newWeights[c.id] = Math.round((100 - runningSum) * 10) / 10;
      } else {
        newWeights[c.id] = baseShare;
        runningSum += baseShare;
      }
    });

    setLocalWeights(newWeights);
    setErrorMessage('');
  };

  // Reset ke bobot tersimpan saat ini
  const handleResetCurrent = () => {
    const resetMap = {};
    criteria.forEach((c) => {
      resetMap[c.id] = c.weight;
    });
    setLocalWeights(resetMap);
    setErrorMessage('');
  };

  // Handler Simpan
  const handleSave = (e) => {
    e.preventDefault();
    if (!isValid100) {
      setErrorMessage(
        `Total bobot saat ini adalah ${currentTotal}%. Total harus tepat 100% sebelum disimpan.`
      );
      return;
    }

    saveAllWeights(localWeights);
    setNotification('Konfigurasi bobot preferensi kriteria berhasil disimpan.');
    setErrorMessage('');
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>Konfigurasi Bobot Kriteria</h2>
          <p>
            Atur tingkat kepentingan relatif (W) untuk masing-masing kriteria evaluasi supplier Bengkel Kimura.
          </p>
        </div>
      </div>

      {notification && (
        <div className="alert-box alert-info" style={{ marginBottom: '16px' }} role="status">
          <IconCheck size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
          <span>{notification}</span>
        </div>
      )}

      {errorMessage && (
        <div className="alert-box alert-warning" style={{ marginBottom: '16px' }} role="alert">
          <IconAlert size={18} style={{ color: 'var(--brand-600)', flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Visual Indikator Akumulasi Total Bobot */}
      <div
        className="card"
        style={{
          marginBottom: '24px',
          borderColor: isValid100 ? 'var(--success-border)' : 'var(--warning-border)',
          backgroundColor: isValid100 ? 'var(--success-bg)' : 'var(--warning-bg)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isValid100 ? (
              <IconCheck size={20} style={{ color: 'var(--success)' }} />
            ) : (
              <IconAlert size={20} style={{ color: 'var(--warning)' }} />
            )}
            <span style={{ fontWeight: '700', fontSize: '15px', color: 'var(--ink-950)' }}>
              Status Total Akumulasi Bobot
            </span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: isValid100 ? 'var(--success)' : 'var(--warning)' }}>
            {currentTotal}% / 100%
          </div>
        </div>

        {/* Progress Bar Visual */}
        <div
          style={{
            height: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '9999px',
            overflow: 'hidden',
            marginBottom: '10px'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, Math.max(0, currentTotal))}%`,
              backgroundColor: isValid100 ? 'var(--success)' : currentTotal > 100 ? 'var(--brand-600)' : 'var(--warning)',
              transition: 'width 250ms ease, background-color 250ms ease'
            }}
          />
        </div>

        <div style={{ fontSize: '13px', color: isValid100 ? 'var(--success)' : '#78350f' }}>
          {isValid100 ? (
            <span>✔ Total bobot telah seimbang (tepat 100%). Matriks SAW siap diproses dengan akurat.</span>
          ) : currentTotal < 100 ? (
            <span>⚠ Bobot masih kurang <strong>{difference}%</strong> untuk mencapai 100%.</span>
          ) : (
            <span>⚠ Bobot melebihi batas sebesar <strong>{Math.abs(difference)}%</strong>. Kurangi bobot agar tepat 100%.</span>
          )}
        </div>
      </div>

      {/* Tabel Konfigurasi Input Bobot */}
      {criteria.length > 0 ? (
        <form onSubmit={handleSave}>
          <div className="table-container" style={{ marginBottom: '20px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>No</th>
                  <th style={{ width: '100px' }}>Kode</th>
                  <th>Nama Kriteria</th>
                  <th style={{ width: '130px' }}>Sifat / Tipe</th>
                  <th style={{ width: '180px' }}>Input Bobot (%)</th>
                  <th style={{ width: '180px' }}>Porsi Visual</th>
                </tr>
              </thead>
              <tbody>
                {criteria.map((c, idx) => {
                  const weightVal = localWeights[c.id] ?? c.weight;
                  const ratio = currentTotal > 0 ? ((weightVal / currentTotal) * 100).toFixed(1) : 0;

                  return (
                    <tr key={c.id}>
                      <td style={{ color: 'var(--ink-500)' }}>{idx + 1}</td>
                      <td>
                        <span
                          style={{
                            fontWeight: '700',
                            fontSize: '12px',
                            backgroundColor: '#f3f4f6',
                            padding: '3px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          {c.code}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--ink-950)' }}>{c.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-500)' }}>{c.description}</div>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            c.type === 'benefit' ? 'badge-benefit' : 'badge-cost'
                          }`}
                        >
                          {c.type}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="any"
                            className="form-input"
                            style={{ width: '90px', padding: '6px 10px', textAlign: 'right', fontWeight: '600' }}
                            value={weightVal}
                            onChange={(e) => handleChangeWeight(c.id, e.target.value)}
                            required
                          />
                          <span style={{ fontWeight: '600', color: 'var(--ink-700)' }}>%</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              flex: 1,
                              height: '8px',
                              backgroundColor: 'var(--border)',
                              borderRadius: '9999px',
                              overflow: 'hidden'
                            }}
                          >
                            <div
                              style={{
                                height: '100%',
                                width: `${Math.min(100, Math.max(0, weightVal))}%`,
                                backgroundColor: 'var(--brand-600)'
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '12px', color: 'var(--ink-600)', minWidth: '40px' }}>
                            {weightVal}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Baris Tombol Aksi */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleDivideEqually}
                title="Bagi rata bobot secara proporsional"
              >
                Bagi Rata (100% / {criteria.length})
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleResetCurrent}
                title="Batalkan perubahan bobot lokal"
              >
                Reset Perubahan
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid100}
              style={{
                opacity: isValid100 ? 1 : 0.6,
                cursor: isValid100 ? 'pointer' : 'not-allowed'
              }}
            >
              <IconCheck size={16} />
              <span>Simpan Bobot Kriteria</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <IconWeights size={26} />
          </div>
          <h3 className="empty-state-title">Belum Ada Kriteria</h3>
          <p className="empty-state-desc">
            Silakan tambahkan kriteria terlebih dahulu pada menu "Data Kriteria" sebelum mengatur bobot preferensi.
          </p>
        </div>
      )}
    </div>
  );
}
