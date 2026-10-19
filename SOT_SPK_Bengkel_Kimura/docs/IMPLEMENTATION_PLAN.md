# Implementation Plan — Kimura SPK

- **Versi:** 1.0
- **Stack awal:** React + Vite, JavaScript, CSS/Tailwind sesuai keputusan implementasi
- **Mode awal yang disarankan:** front-end prototype dengan data simulasi; struktur disiapkan agar layanan data dapat diganti API di masa depan.

## 1. Struktur Folder Usulan
```text
src/
  app/
    App.jsx
    routes.js
  components/
    layout/
    ui/
    feedback/
  features/
    auth/
    dashboard/
    suppliers/
    criteria/
    weights/
    assessments/
    saw/
    ranking/
    reports/
  services/
    storage.js
    saw.js
  data/
    demoData.js
  styles/
    index.css
  main.jsx
```

## 2. Urutan Implementasi
### Step 1 — Bootstrap dan Shell
- Inisialisasi React + Vite.
- Siapkan style tokens, font, layout sidebar/topbar, routing/navigasi.
- Buat halaman login dan shell dashboard.
- **Done jika:** aplikasi dapat dijalankan, layout responsif, menu navigasi bekerja.

### Step 2 — Model Data dan Penyimpanan
- Definisikan model Supplier, Criterion, dan Assessment.
- Buat data demo yang jelas diberi label.
- Pilih penyimpanan awal: state/localStorage untuk prototype.
- Pisahkan operasi data ke service agar dapat diganti API.
- **Done jika:** data dapat dibaca dan perubahan lokal bertahan sesuai strategi penyimpanan.

### Step 3 — CRUD Supplier dan Kriteria
- Implementasikan daftar, pencarian, tambah, edit, hapus, validasi, empty state, dan dialog konfirmasi.
- Kriteria memiliki tipe benefit/cost.
- **Done jika:** operasi CRUD berfungsi dan state UI konsisten.

### Step 4 — Bobot dan Penilaian
- Buat form bobot dan indikator total.
- Validasi bobot positif dan total = 1 atau 100%.
- Buat input matriks nilai supplier-kriteria.
- **Done jika:** nilai invalid atau belum lengkap tidak masuk ke perhitungan.

### Step 5 — Mesin SAW
- Implementasikan normalisasi benefit dan cost.
- Hitung nilai preferensi berdasarkan bobot.
- Tangani nilai nol, data kosong, dan pembagian dengan nol.
- Buat unit test untuk kasus normal dan edge cases.
- **Done jika:** contoh perhitungan yang dihitung manual cocok dengan output aplikasi.

### Step 6 — Ranking dan Detail Perhitungan
- Urutkan nilai preferensi tertinggi ke terendah.
- Tampilkan nilai akhir, posisi ranking, dan detail normalisasi.
- Tangani nilai seri secara konsisten.
- **Done jika:** ranking berasal dari mesin SAW, bukan angka hard-coded.

### Step 7 — Laporan dan Cetak
- Buat tampilan laporan berdasarkan data penilaian aktif.
- Tambahkan CSS print agar hasil cetak rapi.
- **Done jika:** laporan dan tombol cetak bekerja di browser.

### Step 8 — QA dan Handover
- Uji semua navigasi, form, validasi, perhitungan, responsivitas, dan print.
- Periksa console error dan aksesibilitas dasar.
- Perbarui README dengan cara instalasi dan menjalankan aplikasi.
- **Done jika:** seluruh kriteria penerimaan PRD terpenuhi.

## 3. Panduan Teknis
- Gunakan komponen reusable; hindari satu file komponen yang terlalu besar.
- Gunakan nama variabel dan komponen yang jelas.
- Pisahkan fungsi SAW dari komponen UI.
- Jangan hard-code ranking atau hasil hitung.
- Jangan menyimpan kredensial nyata dalam source code.
- Jelaskan keterbatasan login simulasi dan localStorage.
- Jangan menambah backend, framework, atau fitur di luar cakupan tanpa persetujuan.
- Bila memilih Tailwind CSS, gunakan versi dan konfigurasi yang sesuai dengan setup Vite saat ini; jika tidak, CSS modular tetap diperbolehkan.

## 4. Rencana Pengujian Minimum
- Bobot tidak lengkap atau totalnya salah.
- Kriteria benefit dengan nilai valid.
- Kriteria cost dengan nilai valid.
- Nilai nol pada kriteria cost.
- Supplier tanpa penilaian lengkap.
- Dua supplier memiliki nilai akhir sama.
- Daftar supplier/kriteria kosong.
- CRUD setelah refresh sesuai strategi penyimpanan.
- Tampilan desktop dan mobile.
- Cetak laporan.

## 5. Definition of Done
- Fitur sesuai PRD.
- Tampilan sesuai UI-GUIDELINE.
- Semua kontrol utama berfungsi.
- Perhitungan SAW benar dan dapat dijelaskan.
- Validasi dan error state tersedia.
- README berisi instruksi setup.
- Tidak ada fitur di luar cakupan yang ditambahkan tanpa persetujuan.
