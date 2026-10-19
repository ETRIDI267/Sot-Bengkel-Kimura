import React from 'react';
import PlaceholderView from '../../components/ui/PlaceholderView';

export default function ReportsPlaceholder({ onNavigateBack }) {
  return (
    <PlaceholderView
      title="Modul Laporan & Cetak"
      stepNumber="Step 7"
      stepTitle="Step 7 — Laporan dan Cetak"
      description="Modul laporan rekapitulasi penilaian dan keputusan pemilihan supplier sparepart Bengkel Kimura yang siap dicetak."
      plannedFeatures={[
        'Rekapitulasi lengkap kriteria, bobot, nilai normalisasi, dan ranking akhir',
        'Format tata letak formal untuk kebutuhan pengarsipan bengkel',
        'Fungsi cetak langsung menggunakan print browser (@media print CSS)',
        'Kolom tanda tangan dan catatan rekomendasi pemilik bengkel'
      ]}
      onNavigateBack={onNavigateBack}
    />
  );
}
