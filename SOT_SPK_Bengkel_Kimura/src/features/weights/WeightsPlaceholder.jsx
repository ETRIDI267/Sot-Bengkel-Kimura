import React from 'react';
import PlaceholderView from '../../components/ui/PlaceholderView';

export default function WeightsPlaceholder({ onNavigateBack }) {
  return (
    <PlaceholderView
      title="Modul Bobot Kriteria"
      stepNumber="Step 4"
      stepTitle="Step 4 — Bobot dan Penilaian"
      description="Modul untuk mengatur bobot preferensi (W) untuk masing-masing kriteria evaluasi dengan validasi total akumulasi bobot harus tepat 100% (atau 1.0)."
      plannedFeatures={[
        'Input bobot tiap kriteria dengan batas nilai positif',
        'Indikator visual akumulasi total bobot secara real-time',
        'Validasi strict: total bobot harus tepat 100% sebelum dapat disimpan',
        'Umpan balik pencegahan error jika bobot melebihi atau kurang dari 100%'
      ]}
      onNavigateBack={onNavigateBack}
    />
  );
}
