# KIMURA SPK — Sistem Pendukung Keputusan Pemilihan Supplier Sparepart Bengkel Kimura

Aplikasi web **Sistem Pendukung Keputusan (SPK)** untuk membantu **Bengkel Kimura** mengevaluasi dan memilih rekanan supplier suku cadang / sparepart terbaik menggunakan metode **Simple Additive Weighting (SAW)**.

---

## 📌 Ringkasan Proyek

- **Nama Aplikasi:** KIMURA SPK
- **Studi Kasus:** Bengkel Kimura Motorindo
- **Metode SPK:** Simple Additive Weighting (SAW)
- **Teknologi Front-End:** React 18, Vite 6, Vanilla CSS (Design Tokens SaaS)
- **Arsitektur Penyimpanan:** Layered Storage Service (Persistensi `localStorage` dengan fallback in-memory)
- **Status Pengembangan:** Selesai (Step 1 s/d Step 8 Sesuai `IMPLEMENTATION_PLAN.md`)

---

## 🚀 Fitur Utama Aplikasi

1. **Dashboard Eksekutif:**
   - Ringkasan jumlah supplier terdaftar, kriteria aktif, dan akumulasi bobot.
   - Kartu sorotan supplier peringkat #1 yang diperbarui secara dinamis langsung dari mesin kalkulasi SAW.
   - Status driver penyimpanan lokal (`localStorage`).
   - Tombol *Reset ke Data Demo* untuk mengembalikan data awal bawaan kapan saja.

2. **Data Master Supplier:**
   - Tabel data master supplier (Kode, Nama, Nomor Kontak/WhatsApp, Alamat, dan Catatan).
   - Pencarian instan (*real-time search*).
   - Modal form Tambah dan Ubah supplier dengan validasi input.
   - Modal dialog konfirmasi sebelum penghapusan data.
   - Tampilan *Empty State* jika data kosong atau hasil pencarian nihil.

3. **Data Master Kriteria:**
   - Pengelolaan kriteria evaluasi (Kode, Nama, Sifat Benefit / Cost, Bobot %, Deskripsi).
   - Indikator badge visual pembeda sifat: hijau untuk **Benefit** (*makin tinggi makin baik*) dan merah untuk **Cost** (*makin rendah makin hemat*).
   - Modal form Tambah dan Ubah kriteria beserta validasi.

4. **Konfigurasi Bobot Kriteria:**
   - Form penentuan bobot preferensi ($W$) per kriteria.
   - Indikator visual akumulasi total bobot real-time (progress bar dan status selisih).
   - Fitur bantuan *"Bagi Rata (100% / N)"* untuk pembagian proporsional otomatis.
   - Validasi ketat: Tombol simpan dinonaktifkan jika total bobot belum tepat 100%.

5. **Matriks Penilaian Supplier:**
   - Matriks tabel penilaian alternatif supplier terhadap seluruh kriteria (skala 1 s/d 100).
   - Validasi per-sel dengan pencegahan nilai negatif atau melebihi 100.
   - Status kelengkapan per supplier (*Lengkap* vs *Belum Lengkap*).
   - Peringatan sistem bahwa data yang belum lengkap atau bernilai 0 tidak dapat diproses ke mesin SAW.

6. **Audit Perhitungan SAW Transparan:**
   - **Langkah 1: Matriks Keputusan ($X$)** lengkap dengan nilai rujukan ekstrem ($\text{Max}$ untuk benefit dan $\text{Min}$ untuk cost).
   - **Langkah 2: Matriks Ternormalisasi ($R$)** presisi 4 desimal dengan rumus:
     - Benefit: $r_{ij} = \frac{x_{ij}}{\max(x_j)}$
     - Cost: $r_{ij} = \frac{\min(x_j)}{x_{ij}}$
   - **Langkah 3: Perkalian Terbobot & Nilai Preferensi ($V_i$)** dari rumus:
     $$V_i = \sum_{j=1}^{n} (w_j \times r_{ij})$$

7. **Hasil Ranking Supplier:**
   - Pengurutan supplier dari skor preferensi $V_i$ tertinggi ke terendah secara otomatis.
   - Highlight kartu pemenang peringkat #1.
   - Penanganan nilai seri (*tie-breaking*) yang konsisten.
   - Lencana status rekomendasi (*Pilihan Utama*, *Alternatif Cadangan*, *Dipertimbangkan*).
   - Modal *"Detail"* per supplier untuk melihat breakdown kontribusi skor per kriteria.

8. **Laporan & Cetak Dokumen Resmi:**
   - Format laporan resmi Bengkel Kimura lengkap dengan Kop Surat, Ringkasan Eksekutif, Rekap Kriteria, Rekap Matriks Asli, Rekap Ranking Akhir, dan Kolom Tanda Tangan Pengesahan.
   - Tombol *"Cetak Dokumen Laporan"* (`window.print()`).
   - Opsi filter tampilan: Semua Supplier atau 3 Terbaik saja.
   - Desain cetak responsif via CSS `@media print` (menyembunyikan sidebar/topbar/tombol dan mengoptimalkan kontras kertas A4 / ekspor PDF).

---

## 📁 Struktur Folder Proyek

```text
SOT_SPK_Bengkel_Kimura/
├── docs/
│   ├── PRD.md                    # Product Requirements Document
│   ├── UI-GUIDELINE.md           # Pedoman Desain dan Visual
│   └── IMPLEMENTATION_PLAN.md    # Rencana Tahapan Kerja (Step 1-8)
├── tests/
│   └── saw.test.js               # Pengujian Matematis Mesin SAW (13 Tests)
├── src/
│   ├── app/
│   │   ├── App.jsx               # Root Controller & Route Switching
│   │   └── routes.js             # Definisi Metadata 8 Modul Navigasi
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx     # Shell Layout Container
│   │   │   ├── Sidebar.jsx       # Sidebar SaaS Responsif
│   │   │   └── Topbar.jsx        # Topbar & Breadcrumb
│   │   └── ui/
│   │       ├── Icons.jsx         # Ikon SVG Modular Mandiri
│   │       ├── Modal.jsx         # Modal Dialog Reusable
│   │       └── PlaceholderView.jsx
│   ├── context/
│   │   └── DataContext.jsx       # State Management Terpusat & Sinkronisasi
│   ├── data/
│   │   └── demoData.js           # Data Contoh Awal (Supplier, Kriteria, Bobot)
│   ├── features/
│   │   ├── auth/LoginPage.jsx
│   │   ├── dashboard/DashboardPage.jsx
│   │   ├── suppliers/SuppliersPage.jsx
│   │   ├── criteria/CriteriaPage.jsx
│   │   ├── weights/WeightsPage.jsx
│   │   ├── assessments/AssessmentsPage.jsx
│   │   ├── saw/SawPage.jsx
│   │   ├── ranking/RankingPage.jsx
│   │   └── reports/ReportsPage.jsx
│   ├── services/
│   │   ├── storage.js            # Layer Abstraksi Penyimpanan (LocalStorage)
│   │   └── saw.js                # Mesin Matematis Normalisasi & Skor SAW
│   ├── styles/
│   │   └── index.css             # Design Tokens & @media print CSS
│   └── main.jsx                  # Entrypoint React 18
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🛠️ Panduan Instalasi dan Menjalankan Aplikasi

### Prasyarat
- **Node.js** versi 18 ke atas (Direkomendasikan v20 / v24).
- **npm** versi 9 ke atas.

### Langkah-langkah:

1. **Buka Terminal** dan masuk ke direktori proyek:
   ```bash
   cd c:\Users\Msaif\Downloads\SOT_SPK_Bengkel_Kimura\SOT_SPK_Bengkel_Kimura
   ```

2. **Instal Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   *(Catatan untuk pengguna Windows PowerShell: jika script execution policy membatasi npm.ps1, gunakan `cmd /c "npm run dev"`).*

4. **Buka Aplikasi di Browser:**
   Akses URL lokal:
   ```text
   http://localhost:5173/
   ```

5. **Menjalankan Pengujian Unit Mesin SAW:**
   ```bash
   node tests/saw.test.js
   ```

6. **Membuat Bundle Produksi:**
   ```bash
   npm run build
   ```

---

## ⚖️ Verifikasi Aturan Bisnis SAW

1. **Sifat Benefit:**
   Nilai semakin besar semakin baik (contoh: Kualitas, Ketersediaan Stok, Pelayanan).
   Rumus normalisasi:
   $$r_{ij} = \frac{x_{ij}}{\max(x_j)}$$

2. **Sifat Cost:**
   Nilai semakin kecil semakin hemat / baik (contoh: Harga).
   Rumus normalisasi:
   $$r_{ij} = \frac{\min(x_j)}{x_{ij}}$$

3. **Pencegahan Pembagian dengan Nol:**
   Sistem menolak nilai $0$ pada kriteria Cost sebelum masuk ke perhitungan untuk memastikan integritas numerik.

4. **Total Bobot Preferensi:**
   Total akumulasi bobot harus berjumlah tepat $100\%$ ($W = 1.0$) sebelum proses perankingan dijalankan.

---

## 📋 Catatan Prototype & Disclaimer

- Data supplier, kriteria, dan bobot awal yang disediakan saat ini berstatus **Data Contoh / Mockup** untuk keperluan simulasi dan pengujian antarmuka. Data riil perlu dikonfirmasi dan divalidasi langsung dengan pemilik Bengkel Kimura.
- Autentikasi pada halaman Login berstatus **Prototype Front-End** (disimulasikan untuk kemudahan pratinjau multi-peran tanpa backend).
- Arsitektur data telah dipisahkan ke dalam service mandiri (`src/services/storage.js`) sehingga dapat dihubungkan ke backend database (seperti PHP & MySQL atau REST API) di masa depan tanpa mengubah komponen antarmuka pengguna.
