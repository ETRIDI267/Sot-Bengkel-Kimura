import React from 'react';
import PlaceholderView from '../../components/ui/PlaceholderView';

export default function AssessmentsPlaceholder({ onNavigateBack }) {
  return (
    <PlaceholderView
      title="Modul Penilaian Supplier"
      stepNumber="Step 4"
      stepTitle="Step 4 — Bobot dan Penilaian"
      description="Modul input matriks evaluasi nilai kinerja alternatif supplier untuk masing-masing kriteria yang telah ditentukan."
      plannedFeatures={[
        'Matriks tabel input nilai kinerja (alternatif supplier × kriteria)',
        'Validasi tipe angka dan rentang skala penilaian',
        'Deteksi kelengkapan data sebelum diproses ke mesin SAW',
        'Penyimpanan nilai penilaian ke state terpusat'
      ]}
      onNavigateBack={onNavigateBack}
    />
  );
}
