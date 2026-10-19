# PRD — SPK Pemilihan Supplier Sparepart Bengkel Kimura

- **Versi:** 1.0
- **Status:** Draft untuk ditinjau
- **Produk:** Sistem Pendukung Keputusan Pemilihan Supplier Sparepart pada Bengkel Kimura Menggunakan Metode SAW Berbasis Web
- **Front-end:** React + Vite
- **Metode SPK:** SAW (Simple Additive Weighting)
- **Metode pengembangan:** Prototype

## 1. Ringkasan Produk
Aplikasi web membantu Bengkel Kimura membandingkan supplier sparepart menggunakan kriteria yang disepakati, bobot kriteria, penilaian supplier, dan perhitungan SAW. Hasilnya adalah ranking sebagai bahan pertimbangan pemilik bengkel.

## 2. Tujuan
- Mengelola data supplier dan kriteria penilaian.
- Mengatur bobot kriteria.
- Memasukkan nilai supplier secara terstruktur.
- Menghitung nilai akhir dengan SAW dan menampilkan ranking.
- Menampilkan serta mencetak laporan penilaian.

## 3. Pengguna
- **Admin:** mengelola supplier, kriteria, bobot, dan nilai penilaian.
- **Pemilik bengkel:** meninjau dashboard, hasil ranking, detail perhitungan, dan laporan.

Untuk prototype front-end, autentikasi boleh disimulasikan. Login simulasi bukan mekanisme keamanan produksi.

## 4. Ruang Lingkup Fitur
1. **Login:** form masuk dan validasi sisi UI; beri label demo bila autentikasi belum terhubung backend.
2. **Dashboard:** ringkasan jumlah supplier, jumlah kriteria, penilaian terbaru, dan supplier peringkat pertama dari data yang tersedia.
3. **Data Supplier:** lihat, tambah, ubah, hapus, dan cari supplier.
4. **Data Kriteria:** lihat, tambah, ubah, hapus kriteria; tipe kriteria Benefit atau Cost.
5. **Bobot Kriteria:** mengatur bobot tiap kriteria; validasi total bobot = 1 atau 100%.
6. **Penilaian Supplier:** memasukkan nilai supplier untuk setiap kriteria.
7. **Perhitungan SAW:** normalisasi matriks dan menghitung nilai preferensi akhir.
8. **Hasil Ranking:** urutkan supplier dari nilai akhir tertinggi ke terendah dan tampilkan detail nilai.
9. **Laporan:** meninjau laporan dan menggunakan fungsi cetak browser.

## 5. Aturan Bisnis SAW
- Setiap kriteria mempunyai nama, tipe (`benefit` atau `cost`), dan bobot positif.
- Total bobot kriteria aktif harus sama dengan 1 (toleransi pembulatan yang wajar) atau 100%; pilih satu format internal yang konsisten.
- Untuk kriteria **benefit**, normalisasi: `rij = xij / max(xj)`.
- Untuk kriteria **cost**, normalisasi: `rij = min(xj) / xij`.
- Nilai preferensi: `Vi = Σ(wj × rij)`.
- Ranking disusun dari nilai `Vi` terbesar ke terkecil.
- Cegah pembagian dengan nol dan tampilkan pesan validasi jika data belum lengkap atau tidak valid.
- Data supplier, nilai, bobot, dan kriteria contoh harus ditandai sebagai data demo sampai dikonfirmasi dengan pemilik Bengkel Kimura.
- Sistem memberikan rekomendasi; keputusan akhir tetap pada pemilik bengkel.

## 6. Data Awal yang Diusulkan
Kriteria awal untuk dikonfirmasi:
- Harga — Cost
- Kualitas — Benefit
- Ketersediaan barang — Benefit
- Pelayanan — Benefit

Jangan menganggap kriteria, bobot, atau data supplier ini sebagai fakta terverifikasi sebelum dikonfirmasi ke pemilik bengkel.

## 7. Kebutuhan Nonfungsional
- UI responsif untuk desktop, tablet, dan ponsel.
- Navigasi konsisten dan mudah dipahami.
- Status kosong, loading, sukses, dan error ditangani dengan jelas.
- Form mempunyai label, validasi, dan pesan kesalahan yang mudah dimengerti.
- Komponen dapat digunakan ulang; struktur kode terorganisasi.
- Tidak menampilkan tombol yang tidak berfungsi. Jika belum tersedia, beri status nonaktif atau implementasikan interaksi lokal yang nyata.
- Aksesibilitas dasar: kontras memadai, fokus keyboard terlihat, label input jelas.

## 8. Di Luar Cakupan
- Kasir, transaksi servis, pengelolaan mekanik, inventaris penuh, akuntansi, aplikasi mobile native.
- Integrasi backend, database produksi, dan autentikasi aman kecuali diminta sebagai pekerjaan terpisah.
- Integrasi pemasok atau API pihak ketiga.

## 9. Kriteria Penerimaan
- Kesembilan fitur utama dapat dinavigasi.
- CRUD supplier dan kriteria bekerja pada lingkup penyimpanan yang ditetapkan.
- Validasi bobot dan nilai berjalan.
- Perhitungan SAW mengikuti tipe benefit/cost dan menghasilkan ranking yang benar untuk data valid.
- Hasil ranking dapat dilihat dalam tabel dan laporan dapat dicetak melalui browser.
- UI responsif, tidak ada error konsol yang diketahui, dan instruksi menjalankan proyek tersedia.

## 10. Asumsi dan Risiko
- Versi awal berfokus pada front-end React + Vite dengan data demo/local storage agar dapat dipreview tanpa backend.
- Data lokal bukan penyimpanan multi-user dan bukan pengganti database produksi.
- Kriteria, bobot, skala penilaian, dan supplier perlu divalidasi dengan pemilik Bengkel Kimura.
- Integrasi PHP + MySQL dapat ditambahkan kemudian melalui lapisan layanan/API yang terpisah.
