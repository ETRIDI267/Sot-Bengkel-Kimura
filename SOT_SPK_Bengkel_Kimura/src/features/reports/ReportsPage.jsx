import React, { useState, useMemo } from 'react';
import { useAppData } from '../../context/DataContext';
import { calculateSAW } from '../../services/saw';
import {
  IconReports,
  IconCheck,
  IconAlert,
  IconInfo
} from '../../components/ui/Icons';

export default function ReportsPage() {
  const { suppliers, criteria, assessments } = useAppData();

  // Filter tampilan laporan
  const [reportFilter, setReportFilter] = useState('all'); // 'all' | 'top3'
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Eksekusi kalkulasi SAW dinamis
  const calculationResult = useMemo(() => {
    return calculateSAW(suppliers, criteria, assessments);
  }, [suppliers, criteria, assessments]);

  const { isValid, error, matrixX, rankedResults } = calculationResult;

  // Saring hasil berdasarkan filter
  const displayedRankings = useMemo(() => {
    if (!rankedResults) return [];
    if (reportFilter === 'top3') {
      return rankedResults.slice(0, 3);
    }
    return rankedResults;
  }, [rankedResults, reportFilter]);

  // Handler Cetak Browser
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Header Halaman (Hanya Tampil di Layar, Tersembunyi saat Cetak) */}
      <div className="page-header no-print">
        <div className="page-header-title">
          <h2>Laporan Hasil SPK Pemilihan Supplier</h2>
          <p>
            Rekapitulasi formal rekomendasi keputusan supplier sparepart berbasis Simple Additive Weighting (SAW) yang siap dicetak.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            className="form-input"
            style={{ width: '180px', padding: '8px 12px' }}
            value={reportFilter}
            onChange={(e) => setReportFilter(e.target.value)}
          >
            <option value="all">Semua Supplier ({suppliers.length})</option>
            <option value="top3">Hanya 3 Terbaik (Top 3)</option>
          </select>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePrint}
            disabled={!isValid}
            style={{ opacity: isValid ? 1 : 0.6 }}
          >
            <IconReports size={16} />
            <span>Cetak Dokumen Laporan</span>
          </button>
        </div>
      </div>

      {!isValid && (
        <div className="alert-box alert-warning no-print" style={{ marginBottom: '24px' }}>
          <IconAlert size={20} style={{ color: 'var(--brand-600)', flexShrink: 0 }} />
          <div>
            <strong>Laporan Belum Siap Dicetak</strong>
            <div style={{ marginTop: '3px', fontSize: '13px' }}>{error}</div>
          </div>
        </div>
      )}

      {/* Dokumen Laporan Formal */}
      <div className="report-document" id="printable-report">
        {/* KOP Surat Bengkel Kimura */}
        <div className="report-header">
          <div>
            <div className="report-brand-title">BENGKEL KIMURA MOTORINDO</div>
            <div className="report-brand-sub">
              Spesialis Servis, Perawatan Berkala & Penyedia Suku Cadang Resmi Motor
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink-500)', marginTop: '2px' }}>
              Jl. Raden Inten II No. 45, Duren Sawit, Jakarta Timur | Telp: (021) 8620-1122
            </div>
          </div>
          <div className="report-meta-box">
            <div><strong>No. Dokumen:</strong> SPK-KMR/{new Date().getFullYear()}/001</div>
            <div><strong>Tanggal Laporan:</strong> {currentDate}</div>
            <div><strong>Metode Evaluasi:</strong> SAW (Simple Additive Weighting)</div>
          </div>
        </div>

        {/* Judul Laporan */}
        <div style={{ textAlign: 'center', margin: '20px 0 24px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Laporan Rekapitulasi Rekomendasi Pemilihan Supplier Sparepart
          </h2>
          <div style={{ fontSize: '12.5px', color: 'var(--ink-600)', marginTop: '4px' }}>
            Periode Penilaian Tahun {new Date().getFullYear()}
          </div>
        </div>

        {/* 1. Ringkasan Eksekutif */}
        {rankedResults && rankedResults.length > 0 && (
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: '#fafafa',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              fontSize: '13px',
              lineHeight: '1.6'
            }}
          >
            <strong>Ringkasan Keputusan:</strong>
            <p style={{ marginTop: '4px', margin: 0, color: 'var(--ink-800)' }}>
              Berdasarkan hasil analisis multi-kriteria menggunakan metode <em>Simple Additive Weighting (SAW)</em> terhadap{' '}
              <strong>{suppliers.length} alternatif supplier</strong> dengan <strong>{criteria.length} kriteria terbobot</strong>,
              rekanan supplier yang menduduki peringkat prioritas tertinggi adalah{' '}
              <strong>{rankedResults[0].supplierName} ({rankedResults[0].supplierCode})</strong> dengan nilai preferensi akhir{' '}
              <strong>{rankedResults[0].finalScore.toFixed(4)}</strong>. Supplier ini direkomendasikan sebagai mitra penyedia sparepart utama bagi Bengkel Kimura.
            </p>
          </div>
        )}

        {/* 2. Rekapitulasi Kriteria & Bobot */}
        <div className="report-section-title">I. Kriteria dan Bobot Preferensi</div>
        <div className="table-container" style={{ marginBottom: '20px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>No</th>
                <th style={{ width: '90px' }}>Kode</th>
                <th>Nama Kriteria</th>
                <th style={{ width: '110px' }}>Sifat / Tipe</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Bobot (%)</th>
                <th>Deskripsi Penilaian</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((c, idx) => (
                <tr key={c.id}>
                  <td>{idx + 1}</td>
                  <td><strong>{c.code}</strong></td>
                  <td>{c.name}</td>
                  <td>
                    <span className={`badge ${c.type === 'benefit' ? 'badge-benefit' : 'badge-cost'}`}>
                      {c.type}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: '700' }}>{c.weight}%</td>
                  <td style={{ fontSize: '12px' }}>{c.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. Rekapitulasi Nilai Asli Penilaian */}
        <div className="report-section-title">II. Matriks Penilaian Kinerja Asli (X)</div>
        <div className="table-container" style={{ marginBottom: '20px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>No</th>
                <th style={{ width: '90px' }}>Kode</th>
                <th>Alternatif Supplier</th>
                {criteria.map((c) => (
                  <th key={c.id} style={{ textAlign: 'center' }}>
                    {c.code} ({c.name})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, idx) => (
                <tr key={s.id}>
                  <td>{idx + 1}</td>
                  <td><strong>{s.code}</strong></td>
                  <td>{s.name}</td>
                  {criteria.map((c) => (
                    <td key={c.id} style={{ textAlign: 'center', fontWeight: '600' }}>
                      {matrixX?.[s.id]?.[c.id] ?? '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Rekapitulasi Hasil Ranking Akhir SAW */}
        <div className="report-section-title">III. Hasil Ranking dan Rekomendasi Akhir</div>
        <div className="table-container" style={{ marginBottom: '24px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '80px', textAlign: 'center' }}>Peringkat</th>
                <th style={{ width: '90px' }}>Kode</th>
                <th>Nama Rekanan Supplier</th>
                <th>Kontak / WhatsApp</th>
                <th style={{ width: '150px', textAlign: 'center' }}>Nilai Preferensi (Vi)</th>
                <th style={{ minWidth: '180px' }}>Status Rekomendasi</th>
              </tr>
            </thead>
            <tbody>
              {displayedRankings.map((item, idx) => (
                <tr key={item.supplierId} style={{ backgroundColor: idx === 0 ? '#fafafa' : undefined }}>
                  <td style={{ textAlign: 'center', fontWeight: '800' }}>
                    #{item.rank}
                  </td>
                  <td><strong>{item.supplierCode}</strong></td>
                  <td>
                    <strong>{item.supplierName}</strong>
                    {idx === 0 && <span style={{ marginLeft: '6px', fontSize: '11px', color: 'var(--brand-600)' }}>(Pilihan Utama)</span>}
                  </td>
                  <td>{item.contact || '-'}</td>
                  <td style={{ textAlign: 'center', fontWeight: '700', fontFamily: 'monospace' }}>
                    {item.finalScore.toFixed(4)}
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>
                      {idx === 0
                        ? 'Sangat Direkomendasikan'
                        : idx <= 2
                        ? 'Direkomendasikan'
                        : 'Dipertimbangkan'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Catatan Kaki Kebijakan */}
        <div style={{ fontSize: '11.5px', color: 'var(--ink-500)', fontStyle: 'italic', marginBottom: '20px' }}>
          * Catatan: Sistem Pendukung Keputusan memberikan rekomendasi objektif berdasarkan bobot dan kriteria yang telah disepakati. Keputusan final penunjukan supplier tetap berada pada wewenang pemilik Bengkel Kimura.
        </div>

        {/* 5. Kolom Tanda Tangan Pengesahan */}
        <div className="report-signatures">
          <div className="signature-box">
            <div>Dibuat oleh,</div>
            <div style={{ fontSize: '11.5px', color: 'var(--ink-500)' }}>Administrator SPK</div>
            <div className="signature-line">
              ( Admin Bengkel Kimura )
            </div>
          </div>

          <div className="signature-box">
            <div>Mengetahui & Menyetujui,</div>
            <div style={{ fontSize: '11.5px', color: 'var(--ink-500)' }}>Pemilik Bengkel Kimura</div>
            <div className="signature-line">
              ( Pemilik Bengkel )
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
