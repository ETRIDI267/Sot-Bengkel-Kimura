import React, { useState, useMemo } from 'react';
import { useAppData } from '../../context/DataContext';
import { calculateSAW } from '../../services/saw';
import Modal from '../../components/ui/Modal';
import {
  IconRanking,
  IconCheck,
  IconAlert,
  IconInfo,
  IconSuppliers
} from '../../components/ui/Icons';

export default function RankingPage() {
  const { suppliers, criteria, assessments } = useAppData();

  // Eksekusi kalkulasi SAW dinamis dari mesin SAW
  const calculationResult = useMemo(() => {
    return calculateSAW(suppliers, criteria, assessments);
  }, [suppliers, criteria, assessments]);

  const { isValid, error, details, rankedResults, extremeValues, normalizedWeights } = calculationResult;

  // State Modal Detail Perhitungan per Supplier
  const [selectedSupplierDetail, setSelectedSupplierDetail] = useState(null);

  // Penanganan Konsisten Nilai Seri (Tie-breaking)
  const rankedWithTies = useMemo(() => {
    if (!rankedResults || rankedResults.length === 0) return [];
    let currentRank = 1;

    return rankedResults.map((item, index) => {
      if (index > 0) {
        const prevItem = rankedResults[index - 1];
        if (Math.abs(item.finalScore - prevItem.finalScore) < 0.0001) {
          // Nilai seri dengan item sebelumnya
          return {
            ...item,
            displayRank: prevItem.displayRank,
            isTie: true
          };
        }
      }
      const assigned = {
        ...item,
        displayRank: index + 1,
        isTie: false
      };
      currentRank = index + 1;
      return assigned;
    });
  }, [rankedResults]);

  // Label Rekomendasi berdasarkan peringkat
  const getRecommendationBadge = (rank) => {
    if (rank === 1) {
      return {
        label: 'Sangat Direkomendasikan (Pilihan Utama)',
        bg: '#ecfdf5',
        color: '#15803d',
        border: '#bbf7d0'
      };
    } else if (rank <= 3) {
      return {
        label: 'Direkomendasikan (Alternatif Cadangan)',
        bg: '#eff6ff',
        color: '#1d4ed8',
        border: '#bfdbfe'
      };
    } else {
      return {
        label: 'Dipertimbangkan',
        bg: '#f3f4f6',
        color: '#525252',
        border: '#e5e5e5'
      };
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>Hasil Ranking Supplier Sparepart</h2>
          <p>
            Daftar urutan prioritas supplier terbaik berdasarkan hasil perhitungan Simple Additive Weighting (SAW).
          </p>
        </div>
      </div>

      {/* Banner Kondisi Kelayakan Data */}
      {!isValid ? (
        <div className="alert-box alert-warning" style={{ marginBottom: '24px' }}>
          <IconAlert size={22} style={{ color: 'var(--brand-600)', flexShrink: 0 }} />
          <div>
            <strong>Ranking Belum Dapat Ditampilkan</strong>
            <div style={{ marginTop: '3px', fontSize: '13px' }}>{error}</div>
            {details && (
              <ul style={{ marginTop: '6px', paddingLeft: '18px', fontSize: '12px' }}>
                {details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Card Highlight Supplier Pemenang / Ranking 1 */}
          {rankedWithTies.length > 0 && (
            <div
              className="card"
              style={{
                marginBottom: '24px',
                border: '1px solid var(--border)',
                borderTop: '4px solid var(--brand-600)',
                background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <span
                      style={{
                        backgroundColor: 'var(--brand-600)',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Peringkat #1 Terpilih
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--ink-500)' }}>
                      Rekomendasi Terbaik Berdasarkan Evaluasi SAW
                    </span>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--ink-950)' }}>
                    {rankedWithTies[0].supplierName}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--ink-600)', marginTop: '4px' }}>
                    Kode: <strong>{rankedWithTies[0].supplierCode}</strong> | Kontak: {rankedWithTies[0].contact || '-'}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: 'var(--ink-500)' }}>Nilai Preferensi Akhir (Vi)</div>
                  <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--brand-600)', lineHeight: '1.1' }}>
                    {rankedWithTies[0].finalScore.toFixed(4)}
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ marginTop: '8px', padding: '6px 12px', fontSize: '12.5px' }}
                    onClick={() => setSelectedSupplierDetail(rankedWithTies[0])}
                  >
                    Lihat Rincian Nilai
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tabel Hasil Ranking Lengkap */}
          <div className="table-container" style={{ marginBottom: '24px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '90px', textAlign: 'center' }}>Peringkat</th>
                  <th style={{ width: '110px' }}>Kode</th>
                  <th>Nama Supplier</th>
                  <th>Kontak</th>
                  <th style={{ width: '170px', textAlign: 'center' }}>Skor Akhir (Vi)</th>
                  <th style={{ minWidth: '220px' }}>Status Rekomendasi</th>
                  <th style={{ width: '130px', textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rankedWithTies.map((item) => {
                  const badge = getRecommendationBadge(item.displayRank);

                  return (
                    <tr
                      key={item.supplierId}
                      style={{
                        backgroundColor: item.displayRank === 1 ? '#fffafb' : undefined
                      }}
                    >
                      <td style={{ textAlign: 'center' }}>
                        <span
                          style={{
                            fontWeight: '800',
                            fontSize: '13.5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor:
                              item.displayRank === 1
                                ? 'var(--brand-600)'
                                : item.displayRank === 2
                                ? 'var(--ink-800)'
                                : item.displayRank === 3
                                ? 'var(--ink-600)'
                                : '#f3f4f6',
                            color: item.displayRank <= 3 ? '#ffffff' : 'var(--ink-800)'
                          }}
                        >
                          {item.displayRank}
                        </span>
                        {item.isTie && (
                          <div style={{ fontSize: '10px', color: 'var(--warning)', fontWeight: '700', marginTop: '2px' }}>
                            Seri
                          </div>
                        )}
                      </td>
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
                          {item.supplierCode}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--ink-950)' }}>
                          {item.supplierName}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-500)' }}>
                          {item.address || '-'}
                        </div>
                      </td>
                      <td style={{ fontSize: '13px' }}>{item.contact || '-'}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span
                          style={{
                            fontWeight: '800',
                            fontSize: '15px',
                            fontFamily: 'monospace',
                            color: item.displayRank === 1 ? 'var(--brand-600)' : 'var(--ink-950)'
                          }}
                        >
                          {item.finalScore.toFixed(4)}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: badge.bg,
                            color: badge.color,
                            border: `1px solid ${badge.border}`
                          }}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="btn-icon-action"
                            onClick={() => setSelectedSupplierDetail(item)}
                            title="Buka rincian perhitungan supplier ini"
                          >
                            <span>Detail</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal Detail Breakdown Skor per Kriteria */}
      <Modal
        isOpen={!!selectedSupplierDetail}
        onClose={() => setSelectedSupplierDetail(null)}
        title={`Rincian Perhitungan SAW: ${selectedSupplierDetail?.supplierName || ''}`}
        maxWidth="680px"
      >
        {selectedSupplierDetail && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--ink-500)' }}>Kode Alternatif</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--ink-950)' }}>
                  {selectedSupplierDetail.supplierCode}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'var(--ink-500)' }}>Nilai Preferensi Akhir (Vi)</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--brand-600)' }}>
                  {selectedSupplierDetail.finalScore.toFixed(4)}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--ink-600)', marginBottom: '14px' }}>
              Berikut adalah rincian normalisasi dan kontribusi terbobot untuk masing-masing kriteria:
            </p>

            <div className="table-container" style={{ marginBottom: '18px' }}>
              <table className="data-table" style={{ fontSize: '12.5px' }}>
                <thead>
                  <tr>
                    <th>Kriteria</th>
                    <th>Tipe</th>
                    <th style={{ textAlign: 'center' }}>Nilai Asli (x)</th>
                    <th style={{ textAlign: 'center' }}>Rujukan</th>
                    <th style={{ textAlign: 'center' }}>Normalisasi (r)</th>
                    <th style={{ textAlign: 'center' }}>Bobot (w)</th>
                    <th style={{ textAlign: 'center' }}>Kontribusi (w × r)</th>
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((c) => {
                    const ext = extremeValues?.[c.id] || {};
                    const xVal = selectedSupplierDetail.scoresByCriterion[c.id];
                    const rVal = selectedSupplierDetail.normalizedByCriterion[c.id];
                    const wVal = normalizedWeights?.[c.id];
                    const weighted = selectedSupplierDetail.weightedByCriterion[c.id];

                    return (
                      <tr key={c.id}>
                        <td>
                          <strong>{c.code}</strong> — {c.name}
                        </td>
                        <td>
                          <span
                            className={`badge ${c.type === 'benefit' ? 'badge-benefit' : 'badge-cost'}`}
                            style={{ fontSize: '9.5px', padding: '1px 5px' }}
                          >
                            {c.type}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center', fontWeight: '600' }}>{xVal}</td>
                        <td style={{ textAlign: 'center', color: 'var(--ink-500)' }}>
                          {c.type === 'benefit' ? `Max: ${ext.max}` : `Min: ${ext.min}`}
                        </td>
                        <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>
                          {rVal?.toFixed(4)}
                        </td>
                        <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>
                          {wVal?.toFixed(4)}
                        </td>
                        <td style={{ textAlign: 'center', fontWeight: '700', color: 'var(--brand-600)', fontFamily: 'monospace' }}>
                          {weighted?.toFixed(4)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{ backgroundColor: '#fafafa', fontWeight: '800' }}>
                    <td colSpan={6} style={{ textAlign: 'right' }}>
                      Total Penjumlahan Terbobot (Vi):
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--brand-600)', fontSize: '14px', fontFamily: 'monospace' }}>
                      {selectedSupplierDetail.finalScore.toFixed(4)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelectedSupplierDetail(null)}
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
