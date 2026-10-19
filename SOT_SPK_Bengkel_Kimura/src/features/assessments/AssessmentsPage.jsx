import React, { useState, useEffect } from 'react';
import { useAppData } from '../../context/DataContext';
import {
  IconAssessments,
  IconCheck,
  IconAlert,
  IconInfo
} from '../../components/ui/Icons';

export default function AssessmentsPage() {
  const {
    suppliers,
    criteria,
    assessments,
    saveMatrixAssessments,
    checkSupplierCompleteness,
    completeSuppliersCount,
    isAllAssessmentsComplete
  } = useAppData();

  // State draft matriks lokal untuk editing yang responsif
  const [matrixData, setMatrixData] = useState({});
  const [notification, setNotification] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  // Sinkronkan state lokal saat assessments dari context dimuat
  useEffect(() => {
    setMatrixData(JSON.parse(JSON.stringify(assessments || {})));
  }, [assessments]);

  // Handler ubah nilai satu sel (supplierId, criterionId)
  const handleCellChange = (supplierId, criterionId, value) => {
    let numVal = value === '' ? '' : Number(value);
    if (typeof numVal === 'number' && !isNaN(numVal)) {
      if (numVal < 0) numVal = 0;
      if (numVal > 100) numVal = 100;
    }

    setMatrixData((prev) => ({
      ...prev,
      [supplierId]: {
        ...(prev[supplierId] || {}),
        [criterionId]: numVal
      }
    }));
    setWarningMessage('');
  };

  // Cek kelengkapan lokal per supplier
  const isRowComplete = (supplierId) => {
    if (!criteria.length) return false;
    const row = matrixData[supplierId] || {};
    return criteria.every((crit) => {
      const v = row[crit.id];
      return typeof v === 'number' && !isNaN(v) && v > 0;
    });
  };

  // Hitung jumlah supplier lengkap secara lokal
  const localCompleteCount = suppliers.filter((s) => isRowComplete(s.id)).length;
  const isFullyComplete = suppliers.length > 0 && localCompleteCount === suppliers.length;

  // Isi Nilai Default untuk sel kosong
  const handleFillDefaults = () => {
    const updated = JSON.parse(JSON.stringify(matrixData));
    suppliers.forEach((s) => {
      if (!updated[s.id]) updated[s.id] = {};
      criteria.forEach((c) => {
        const val = updated[s.id][c.id];
        if (val === undefined || val === '' || val === 0) {
          updated[s.id][c.id] = 75; // Nilai standar baik
        }
      });
    });
    setMatrixData(updated);
    setNotification('Sel yang kosong telah diisi dengan nilai standar (75). Silakan simpan perubahan.');
    setTimeout(() => setNotification(''), 4000);
  };

  // Handler Simpan Matriks Penilaian
  const handleSave = (e) => {
    e.preventDefault();

    // Verifikasi apakah ada nilai tidak valid (kosong atau nol)
    const incompleteSuppliers = suppliers.filter((s) => !isRowComplete(s.id));
    if (incompleteSuppliers.length > 0) {
      setWarningMessage(
        `Perhatian: Terdapat ${incompleteSuppliers.length} supplier dengan nilai belum lengkap atau bernilai 0. Nilai yang belum lengkap tidak akan dapat diproses ke perhitungan SAW.`
      );
    } else {
      setWarningMessage('');
    }

    saveMatrixAssessments(matrixData);
    setNotification('Matriks penilaian supplier berhasil disimpan.');
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>Matriks Penilaian Supplier</h2>
          <p>
            Masukkan skor kinerja masing-masing supplier pada setiap kriteria evaluasi (Skala 1 - 100).
          </p>
        </div>
      </div>

      {notification && (
        <div className="alert-box alert-info" style={{ marginBottom: '16px' }} role="status">
          <IconCheck size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
          <span>{notification}</span>
        </div>
      )}

      {warningMessage && (
        <div className="alert-box alert-warning" style={{ marginBottom: '16px' }} role="alert">
          <IconAlert size={18} style={{ color: 'var(--brand-600)', flexShrink: 0 }} />
          <span>{warningMessage}</span>
        </div>
      )}

      {/* Ringkasan Status Kelengkapan Penilaian */}
      <div
        className="card"
        style={{
          marginBottom: '20px',
          borderColor: isFullyComplete ? 'var(--success-border)' : 'var(--warning-border)',
          backgroundColor: isFullyComplete ? 'var(--success-bg)' : 'var(--warning-bg)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isFullyComplete ? (
              <IconCheck size={22} style={{ color: 'var(--success)' }} />
            ) : (
              <IconAlert size={22} style={{ color: 'var(--warning)' }} />
            )}
            <div>
              <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--ink-950)' }}>
                Status Kelengkapan: {localCompleteCount} dari {suppliers.length} Supplier Lengkap
              </div>
              <div style={{ fontSize: '12.5px', color: isFullyComplete ? 'var(--success)' : '#78350f', marginTop: '2px' }}>
                {isFullyComplete
                  ? 'Seluruh supplier telah memiliki nilai lengkap dan valid (siap untuk perhitungan normalisasi SAW).'
                  : 'Pastikan seluruh sel terisi dengan nilai angka antara 1 sampai 100 (tidak boleh 0 atau kosong).'}
              </div>
            </div>
          </div>

          <div style={{ fontSize: '12.5px', color: 'var(--ink-600)' }}>
            <strong>Panduan Skala:</strong> 1–40 (Kurang) | 41–70 (Cukup) | 71–85 (Baik) | 86–100 (Sangat Baik)
          </div>
        </div>
      </div>

      {/* Tabel Matriks Penilaian */}
      {suppliers.length > 0 && criteria.length > 0 ? (
        <form onSubmit={handleSave}>
          <div className="table-container" style={{ marginBottom: '20px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>No</th>
                  <th style={{ width: '100px' }}>Kode</th>
                  <th style={{ minWidth: '180px' }}>Alternatif Supplier</th>
                  {criteria.map((crit) => (
                    <th key={crit.id} style={{ minWidth: '130px', textAlign: 'center' }}>
                      <div style={{ fontWeight: '700', color: 'var(--ink-950)' }}>
                        {crit.code} ({crit.weight}%)
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-500)', fontWeight: 'normal' }}>
                        {crit.name}
                      </div>
                      <span
                        className={`badge ${
                          crit.type === 'benefit' ? 'badge-benefit' : 'badge-cost'
                        }`}
                        style={{ fontSize: '10px', padding: '1px 6px', marginTop: '4px' }}
                      >
                        {crit.type}
                      </span>
                    </th>
                  ))}
                  <th style={{ width: '130px', textAlign: 'center' }}>Kelengkapan</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier, sIdx) => {
                  const rowValues = matrixData[supplier.id] || {};
                  const isComplete = isRowComplete(supplier.id);

                  return (
                    <tr key={supplier.id}>
                      <td style={{ color: 'var(--ink-500)' }}>{sIdx + 1}</td>
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
                          {supplier.code}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--ink-950)' }}>
                          {supplier.name}
                        </div>
                      </td>

                      {criteria.map((crit) => {
                        const cellVal = rowValues[crit.id] ?? '';
                        const isInvalid = cellVal === '' || cellVal === 0;

                        return (
                          <td key={crit.id} style={{ textAlign: 'center' }}>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              className="form-input"
                              style={{
                                width: '75px',
                                textAlign: 'center',
                                padding: '6px 8px',
                                fontWeight: '600',
                                borderColor: isInvalid ? 'var(--brand-600)' : 'var(--border)',
                                backgroundColor: isInvalid ? '#fff5f5' : '#ffffff'
                              }}
                              value={cellVal}
                              onChange={(e) => handleCellChange(supplier.id, crit.id, e.target.value)}
                              title={`Nilai ${supplier.name} untuk kriteria ${crit.name} (1-100)`}
                              required
                            />
                          </td>
                        );
                      })}

                      <td style={{ textAlign: 'center' }}>
                        <span
                          className={`badge ${isComplete ? 'badge-benefit' : 'badge-cost'}`}
                          style={{ fontSize: '11px' }}
                        >
                          {isComplete ? 'Lengkap' : 'Belum Lengkap'}
                        </span>
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
                onClick={handleFillDefaults}
                title="Isi sel yang masih kosong dengan nilai standar"
              >
                Isi Nilai Standar (75)
              </button>
            </div>

            <button type="submit" className="btn btn-primary">
              <IconCheck size={16} />
              <span>Simpan Matriks Penilaian</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <IconAssessments size={26} />
          </div>
          <h3 className="empty-state-title">Data Belum Memadai</h3>
          <p className="empty-state-desc">
            Matriks penilaian membutuhkan minimal 1 supplier dan 1 kriteria. Silakan lengkapi Data Supplier dan Data Kriteria terlebih dahulu.
          </p>
        </div>
      )}
    </div>
  );
}
