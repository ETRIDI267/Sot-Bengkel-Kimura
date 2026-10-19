import React from 'react';
import PlaceholderView from '../../components/ui/PlaceholderView';

export default function CriteriaPlaceholder({ onNavigateBack }) {
  return (
    <PlaceholderView
      title="Modul Data Kriteria"
      stepNumber="Step 3"
      stepTitle="Step 3 — CRUD Supplier dan Kriteria"
      description="Modul untuk mendefinisikan kriteria evaluasi supplier sparepart beserta sifat kriteria (Benefit vs Cost)."
      plannedFeatures={[
        'Pengelolaan daftar kriteria (Harga, Kualitas, Ketersediaan Stok, Pelayanan)',
        'Penetapan sifat kriteria: Benefit (keuntungan) atau Cost (biaya)',
        'Deskripsi dan penjelasan indikator penilaian kriteria',
        'Validasi input kriteria agar tidak duplikat'
      ]}
      onNavigateBack={onNavigateBack}
    />
  );
}
