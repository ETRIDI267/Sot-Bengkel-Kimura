import React from 'react';
import PlaceholderView from '../../components/ui/PlaceholderView';

export default function RankingPlaceholder({ onNavigateBack }) {
  return (
    <PlaceholderView
      title="Modul Hasil Ranking"
      stepNumber="Step 6"
      stepTitle="Step 6 — Ranking dan Detail Perhitungan"
      description="Modul tampilan perangkingan supplier dari nilai preferensi tertinggi ke terendah sebagai rekomendasi objektif bagi pemilik Bengkel Kimura."
      plannedFeatures={[
        'Pengurutan nilai preferensi akhir (Vi = Σ(wj × rij)) secara descending',
        'Penetapan urutan peringkat (Peringkat 1, 2, 3, dst.)',
        'Penanganan konsisten untuk nilai seri',
        'Detail breakdown kontribusi skor per kriteria',
        'Badge rekomendasi supplier terbaik'
      ]}
      onNavigateBack={onNavigateBack}
    />
  );
}
