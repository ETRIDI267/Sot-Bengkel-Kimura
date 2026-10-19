export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'IconDashboard',
    path: '#dashboard',
    description: 'Ringkasan data, status sistem, dan metrik contoh'
  },
  {
    id: 'suppliers',
    label: 'Data Supplier',
    icon: 'IconSuppliers',
    path: '#suppliers',
    description: 'Pengelolaan data master supplier sparepart'
  },
  {
    id: 'criteria',
    label: 'Data Kriteria',
    icon: 'IconCriteria',
    path: '#criteria',
    description: 'Definisi kriteria penilaian (Benefit & Cost)'
  },
  {
    id: 'weights',
    label: 'Bobot Kriteria',
    icon: 'IconWeights',
    path: '#weights',
    description: 'Penetapan dan validasi bobot preferensi (Total 100%)'
  },
  {
    id: 'assessments',
    label: 'Penilaian Supplier',
    icon: 'IconAssessments',
    path: '#assessments',
    description: 'Matriks evaluasi nilai supplier per kriteria'
  },
  {
    id: 'saw',
    label: 'Perhitungan SAW',
    icon: 'IconSaw',
    path: '#saw',
    description: 'Matriks keputusan, normalisasi, dan perkalian bobot'
  },
  {
    id: 'ranking',
    label: 'Hasil Ranking',
    icon: 'IconRanking',
    path: '#ranking',
    description: 'Peringkat prioritas supplier sparepart teratas'
  },
  {
    id: 'reports',
    label: 'Laporan',
    icon: 'IconReports',
    path: '#reports',
    description: 'Ringkasan laporan penilaian dan fungsi cetak browser'
  }
];

export const DEFAULT_ROUTE = 'dashboard';
