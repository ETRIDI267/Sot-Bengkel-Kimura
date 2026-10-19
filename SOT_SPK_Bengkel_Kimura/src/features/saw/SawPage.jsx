import React, { useMemo } from 'react';
import { useAppData } from '../../context/DataContext';
import { calculateSAW } from '../../services/saw';
import {
  IconSaw,
  IconCheck,
  IconAlert,
  IconInfo,
  IconRanking
} from '../../components/ui/Icons';

export default function SawPage() {
  const { suppliers, criteria, assessments, isWeightsValid, totalCriteriaWeight } = useAppData();

  // Eksekusi kalkulasi SAW dinamis dari service
  const calculationResult = useMemo(() => {
    return calculateSAW(suppliers, criteria, assessments);
  }, [suppliers, criteria, assessments]);

  const {
    isValid,
    error,
    details,
    matrixX,
    matrixR,
    extremeValues,
    normalizedWeights,
    weightedMatrix,
    rankedResults
  } = calculationResult;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>Perhitungan Metode SAW</h2>
          <p>
            Audit transparansi pembentukan matriks keputusan, normalisasi Benefit/Cost, dan perkalian vektor bobot.
          </p>
        </div>
      </div>

      {/* Banner Status Kelayakan Kalkulasi */}
      {isValid ? (
        <div className="alert-box alert-info" style={{ marginBottom: '24px' }}>
          <IconCheck size={22} style={{ color: 'var(--success)', flexShrink: 0 }} />
          <div>
            <strong>Kalkulasi SAW Valid & Siap Diaudit</strong>
            <div style={{ marginTop: '3px', fontSize: '13px' }}>
              Seluruh data supplier ({suppliers.length}), kriteria ({criteria.length}), dan bobot total (
              {totalCriteriaWeight}%) telah memenuhi syarat perhitungan matematis metode Simple Additive Weighting.
            </div>
          </div>
        </div>
      ) : (
        <div className="alert-box alert-warning" style={{ marginBottom: '24px' }}>
          <IconAlert size={22} style={{ color: 'var(--brand-600)', flexShrink: 0 }} />
          <div>
            <strong>Kalkulasi SAW Belum Dapat Diproses</strong>
            <div style={{ marginTop: '3px', fontSize: '13px' }}>{error}</div>
            {details && (
              <ul style={{ marginTop: '8px', paddingLeft: '18px', fontSize: '12.5px' }}>
                {details.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {isValid && (
        <>
          {/* Highlight Rekomendasi Teratas */}
          {rankedResults && rankedResults.length > 0 && (
            <div
              className="card"
              style={{
                marginBottom: '28px',
                borderLeft: '5px solid var(--brand-600)',
                background: 'linear-gradient(to right, #ffffff, #fffafb)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--brand-50)',
                      color: 'var(--brand-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconRanking size={24} />
                  </div>
                  <div>
                    <span className="demo-tag" style={{ fontSize: '11px', padding: '2px 8px', marginBottom: '4px' }}>
                      Rekomendasi Prioritas #1
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink-950)' }}>
                      {rankedResults[0].supplierName} ({rankedResults[0].supplierCode})
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--ink-600)', margin: 0 }}>
                      Memperoleh nilai preferensi akhir tertinggi: <strong>{rankedResults[0].finalScore}</strong>
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: 'var(--ink-500)' }}>Skor Preferensi (Vi)</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--brand-600)' }}>
                    {rankedResults[0].finalScore}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LANGKAH 1: MATRIKS KEPUTUSAN (X) */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <div>
                <h3 className="card-title">Langkah 1: Matriks Keputusan (X)</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-600)', marginTop: '2px' }}>
                  Tabel data rating kinerja asli hasil evaluasi setiap alternatif supplier pada masing-masing kriteria.
                </p>
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>No</th>
                    <th style={{ width: '100px' }}>Kode</th>
                    <th>Alternatif Supplier</th>
                    {criteria.map((c) => (
                      <th key={c.id} style={{ textAlign: 'center' }}>
                        <div>{c.code} ({c.name})</div>
                        <span
                          className={`badge ${c.type === 'benefit' ? 'badge-benefit' : 'badge-cost'}`}
                          style={{ fontSize: '10px', padding: '1px 6px' }}
                        >
                          {c.type}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((s, idx) => (
                    <tr key={s.id}>
                      <td style={{ color: 'var(--ink-500)' }}>{idx + 1}</td>
                      <td>
                        <span style={{ fontWeight: '700', fontSize: '12px', backgroundColor: '#f3f4f6', padding: '3px 8px', borderRadius: '4px' }}>
                          {s.code}
                        </span>
                      </td>
                      <td style={{ fontWeight: '600', color: 'var(--ink-950)' }}>{s.name}</td>
                      {criteria.map((c) => (
                        <td key={c.id} style={{ textAlign: 'center', fontWeight: '600' }}>
                          {matrixX[s.id]?.[c.id] ?? '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Baris Nilai Ekstrem (Max / Min) */}
                  <tr style={{ backgroundColor: '#f8fafc', fontWeight: '700' }}>
                    <td colSpan={3} style={{ textAlign: 'right', color: 'var(--ink-700)' }}>
                      Nilai Rujukan Ekstrem (Max / Min):
                    </td>
                    {criteria.map((c) => {
                      const ext = extremeValues[c.id];
                      return (
                        <td key={c.id} style={{ textAlign: 'center', color: 'var(--brand-600)' }}>
                          {c.type === 'benefit' ? `Max: ${ext.max}` : `Min: ${ext.min}`}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* LANGKAH 2: MATRIKS TERNORMALISASI (R) */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <div>
                <h3 className="card-title">Langkah 2: Matriks Ternormalisasi (R)</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-600)', marginTop: '2px' }}>
                  Normalisasi skala metrik: <code>rij = xij / Max(xj)</code> untuk kriteria <strong>Benefit</strong> dan{' '}
                  <code>rij = Min(xj) / xij</code> untuk kriteria <strong>Cost</strong>.
                </p>
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>No</th>
                    <th style={{ width: '100px' }}>Kode</th>
                    <th>Alternatif Supplier</th>
                    {criteria.map((c) => (
                      <th key={c.id} style={{ textAlign: 'center' }}>
                        <div>r_{c.code}</div>
                        <div style={{ fontSize: '11px', color: 'var(--ink-500)', fontWeight: 'normal' }}>
                          {c.type === 'benefit' ? 'x / Max' : 'Min / x'}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((s, idx) => (
                    <tr key={s.id}>
                      <td style={{ color: 'var(--ink-500)' }}>{idx + 1}</td>
                      <td>
                        <span style={{ fontWeight: '700', fontSize: '12px', backgroundColor: '#f3f4f6', padding: '3px 8px', borderRadius: '4px' }}>
                          {s.code}
                        </span>
                      </td>
                      <td style={{ fontWeight: '600', color: 'var(--ink-950)' }}>{s.name}</td>
                      {criteria.map((c) => (
                        <td key={c.id} style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: '600' }}>
                          {matrixR[s.id]?.[c.id]?.toFixed(4) ?? '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* LANGKAH 3: PERKALIAN BOBOT & NILAI PREFERENSI (Vi) */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Langkah 3: Perkalian Terbobot & Skor Preferensi Akhir (Vi)</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-600)', marginTop: '2px' }}>
                  Perhitungan nilai akhir <code>Vi = Σ(wj × rij)</code> dari perkalian nilai ternormalisasi dengan bobot preferensi kriteria.
                </p>
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>No</th>
                    <th style={{ width: '100px' }}>Kode</th>
                    <th>Alternatif Supplier</th>
                    {criteria.map((c) => (
                      <th key={c.id} style={{ textAlign: 'center' }}>
                        <div>{c.code} × W</div>
                        <div style={{ fontSize: '11px', color: 'var(--ink-500)', fontWeight: 'normal' }}>
                          W = {normalizedWeights[c.id]}
                        </div>
                      </th>
                    ))}
                    <th style={{ width: '150px', textAlign: 'center', backgroundColor: '#fef2f2', color: 'var(--brand-700)' }}>
                      Nilai Preferensi (Vi)
                    </th>
                    <th style={{ width: '110px', textAlign: 'center' }}>Peringkat</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedResults.map((item, idx) => (
                    <tr key={item.supplierId} style={{ backgroundColor: item.rank === 1 ? '#fffafb' : undefined }}>
                      <td style={{ color: 'var(--ink-500)' }}>{idx + 1}</td>
                      <td>
                        <span style={{ fontWeight: '700', fontSize: '12px', backgroundColor: '#f3f4f6', padding: '3px 8px', borderRadius: '4px' }}>
                          {item.supplierCode}
                        </span>
                      </td>
                      <td style={{ fontWeight: '600', color: 'var(--ink-950)' }}>
                        {item.supplierName}
                        {item.rank === 1 && (
                          <span className="demo-tag" style={{ marginLeft: '8px', fontSize: '10.5px', padding: '1px 6px' }}>
                            Terbaik
                          </span>
                        )}
                      </td>

                      {criteria.map((c) => (
                        <td key={c.id} style={{ textAlign: 'center', fontFamily: 'monospace' }}>
                          {item.weightedByCriterion[c.id]?.toFixed(4) ?? '-'}
                        </td>
                      ))}

                      <td style={{ textAlign: 'center', fontWeight: '800', fontSize: '15px', color: 'var(--brand-600)', backgroundColor: '#fff5f5' }}>
                        {item.finalScore.toFixed(4)}
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <span
                          style={{
                            fontWeight: '700',
                            fontSize: '13px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: item.rank === 1 ? 'var(--brand-600)' : '#f3f4f6',
                            color: item.rank === 1 ? '#ffffff' : 'var(--ink-800)'
                          }}
                        >
                          {item.rank}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
