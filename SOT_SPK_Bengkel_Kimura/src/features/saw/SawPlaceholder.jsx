import React from 'react';
import PlaceholderView from '../../components/ui/PlaceholderView';

export default function SawPlaceholder({ onNavigateBack }) {
  return (
    <PlaceholderView
      title="Modul Perhitungan SAW"
      stepNumber="Step 5"
      stepTitle="Step 5 — Mesin SAW"
      description="Modul audit transparansi perhitungan Simple Additive Weighting, menampilkan langkah pembentukan matriks keputusan, matriks ternormalisasi (R), dan hasil perkalian dengan bobot kriteria."
      plannedFeatures={[
        'Matriks Keputusan (X) asli dari penilaian supplier',
        'Normalisasi Benefit: rij = xij / max(xj)',
        'Normalisasi Cost: rij = min(xj) / xij',
        'Perkalian matriks ternormalisasi dengan vektor bobot (W)',
        'Penanganan edge cases: nilai nol, data tidak lengkap, pembagian dengan nol'
      ]}
      onNavigateBack={onNavigateBack}
    />
  );
}
