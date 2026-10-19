import React from 'react';
import PlaceholderView from '../../components/ui/PlaceholderView';

export default function SuppliersPlaceholder({ onNavigateBack }) {
  return (
    <PlaceholderView
      title="Modul Data Supplier"
      stepNumber="Step 3"
      stepTitle="Step 3 — CRUD Supplier dan Kriteria"
      description="Modul untuk mengelola data master supplier suku cadang / sparepart Bengkel Kimura (melihat daftar, menambah, mengubah, mencari, dan menghapus)."
      plannedFeatures={[
        'Tabel daftar supplier dengan pencarian instan',
        'Form tambah & edit supplier (nama, kontak, alamat, kategori)',
        'Konfirmasi dialog sebelum penghapusan',
        'Penyimpanan state lokal / localStorage sesuai Step 2'
      ]}
      onNavigateBack={onNavigateBack}
    />
  );
}
