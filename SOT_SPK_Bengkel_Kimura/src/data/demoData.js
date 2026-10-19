/**
 * Data Demo / Contoh Awal — KIMURA SPK
 * 
 * CATATAN PENTING (Sesuai PRD.md & AGENTS.md):
 * Seluruh data di bawah ini adalah data ilustrasi awal (mock/demo data)
 * untuk pengujian prototype antarmuka dan perhitungan.
 * Kriteria, bobot, dan data supplier harus divalidasi dengan pemilik Bengkel Kimura.
 */

export const DEMO_SUPPLIERS = [
  {
    id: 'sup-1',
    code: 'SUP-01',
    name: 'PT Sumber Motor Sejahtera',
    contact: '0812-3456-7890',
    address: 'Jl. Otista Raya No. 45, Jakarta Timur',
    notes: 'Distributor resmi kampas rem dan filter oli'
  },
  {
    id: 'sup-2',
    code: 'SUP-02',
    name: 'CV Sentosa Abadi Sparepart',
    contact: '0813-8899-1122',
    address: 'Jl. Raden Inten II No. 12, Duren Sawit',
    notes: 'Spesialis rantai, gir, dan belt transmisi'
  },
  {
    id: 'sup-3',
    code: 'SUP-03',
    name: 'Toko Jaya Motor Parts',
    contact: '0857-1234-5678',
    address: 'Jl. Bekasi Timur Raya No. 88',
    notes: 'Toko grosir busi, aki, dan kelistrikan'
  },
  {
    id: 'sup-4',
    code: 'SUP-04',
    name: 'Berkah Autoparts',
    contact: '0878-9900-3344',
    address: 'Kawasan Industri Pulogadung Blok C',
    notes: 'Pemasok bearing, seal, dan suspensi'
  },
  {
    id: 'sup-5',
    code: 'SUP-05',
    name: 'Mega Motorindo Supply',
    contact: '0819-0505-6789',
    address: 'Jl. Raya Pondok Kelapa No. 10',
    notes: 'Supplier ban motor dan pelumas mesin'
  }
];

export const DEMO_CRITERIA = [
  {
    id: 'crit-1',
    code: 'C1',
    name: 'Harga',
    type: 'cost', // Biaya: Semakin rendah harga semakin baik
    weight: 25, // Persentase bobot (%)
    description: 'Tingkat harga produk dan fleksibilitas diskon kuantiti'
  },
  {
    id: 'crit-2',
    code: 'C2',
    name: 'Kualitas Barang',
    type: 'benefit', // Manfaat: Semakin tinggi kualitas semakin baik
    weight: 30, // Persentase bobot (%)
    description: 'Keaslian komponen, mutu material, dan ketahanan part'
  },
  {
    id: 'crit-3',
    code: 'C3',
    name: 'Ketersediaan Stok',
    type: 'benefit', // Manfaat: Semakin siap stok semakin baik
    weight: 25, // Persentase bobot (%)
    description: 'Kemampuan pemenuhan pesanan rutin dan stok barang fast moving'
  },
  {
    id: 'crit-4',
    code: 'C4',
    name: 'Pelayanan & Pengiriman',
    type: 'benefit', // Manfaat: Semakin cepat pengiriman semakin baik
    weight: 20, // Persentase bobot (%)
    description: 'Kecepatan pengiriman, garansi retur cacat, dan respon CS'
  }
];

/**
 * Matriks Nilai Contoh (Skala Penilaian 1 - 100):
 * Format: { [supplierId]: { [criterionId]: number } }
 */
export const DEMO_ASSESSMENTS = {
  'sup-1': {
    'crit-1': 80, // Harga
    'crit-2': 90, // Kualitas
    'crit-3': 85, // Stok
    'crit-4': 85  // Pelayanan
  },
  'sup-2': {
    'crit-1': 70,
    'crit-2': 85,
    'crit-3': 90,
    'crit-4': 80
  },
  'sup-3': {
    'crit-1': 85,
    'crit-2': 75,
    'crit-3': 80,
    'crit-4': 75
  },
  'sup-4': {
    'crit-1': 75,
    'crit-2': 80,
    'crit-3': 70,
    'crit-4': 80
  },
  'sup-5': {
    'crit-1': 90,
    'crit-2': 70,
    'crit-3': 75,
    'crit-4': 70
  }
};
