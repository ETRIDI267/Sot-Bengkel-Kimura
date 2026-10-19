# UI Guideline — Kimura SPK

- **Versi:** 1.0
- **Arah visual:** modern futuristic SaaS, profesional, bersih, tidak berlebihan
- **Brand palette:** merah, hitam, putih

## 1. Prinsip Desain
- Dashboard SaaS yang rapi dan berorientasi data.
- Merah digunakan untuk aksi utama, status penting, dan penekanan secukupnya.
- Hitam/abu gelap untuk navigasi dan teks kuat; putih/abu muda untuk area kerja.
- Hindari glow, gradient, blur, dan ornamen futuristik berlebihan yang mengurangi keterbacaan.
- Prioritaskan hierarki visual, ruang kosong, tabel yang jelas, dan responsivitas.

## 2. Token Warna
- `brand-600`: `#D92D35` — tombol utama, link aktif, highlight.
- `brand-700`: `#B91C1C` — hover/pressed.
- `ink-950`: `#111111` — sidebar gelap dan teks utama.
- `ink-800`: `#262626` — elemen gelap sekunder.
- `ink-600`: `#525252` — teks sekunder.
- `surface`: `#FFFFFF` — kartu dan panel.
- `canvas`: `#F5F5F5` — latar area kerja.
- `border`: `#E5E5E5` — garis pembatas.
- `success`: `#15803D`; `warning`: `#B45309`; `danger`: `#B91C1C`.
Pastikan teks tetap memiliki kontras yang memadai.

## 3. Tipografi dan Spacing
- Gunakan font sans-serif modern, misalnya Inter jika dapat dipasang; fallback ke system sans-serif.
- H1 halaman: 24–30 px; heading section: 16–20 px; body: 14–16 px; label/helper: 12–14 px.
- Sistem spacing berbasis kelipatan 4 atau 8 px.
- Radius kartu 12–16 px; input dan tombol 8–10 px.
- Shadow tipis dan konsisten; jangan menumpuk banyak efek.

## 4. Layout
- Desktop: sidebar kiri sekitar 240–260 px, topbar ringkas, area konten fleksibel.
- Tablet: sidebar dapat diciutkan.
- Mobile: sidebar menjadi drawer; tabel mempunyai overflow horizontal atau tampilan kartu yang sesuai.
- Konten halaman menggunakan lebar yang nyaman dan jarak konsisten.
- Tampilkan breadcrumb/judul halaman bila membantu orientasi.

## 5. Navigasi
Menu utama:
1. Dashboard
2. Data Supplier
3. Data Kriteria
4. Bobot Kriteria
5. Penilaian Supplier
6. Perhitungan SAW
7. Hasil Ranking
8. Laporan
9. Logout

Login berada di luar layout aplikasi yang sudah masuk. Tampilkan nama aplikasi **KIMURA SPK** dengan deskripsi singkat.

## 6. Komponen
- **Button:** primary merah, secondary putih dengan border, danger untuk tindakan hapus.
- **Input/select:** label di atas field, helper/error di bawah, focus ring terlihat.
- **Card:** latar putih, border halus, padding konsisten.
- **Table:** header mudah dibedakan, angka rata kanan, aksi dikelompokkan, state kosong tersedia.
- **Badge:** status ringkas; jangan gunakan warna sebagai satu-satunya pembeda.
- **Modal/dialog:** konfirmasi sebelum penghapusan.
- **Toast/alert:** sukses dan gagal dengan pesan yang spesifik.
- **Metric card:** angka ringkasan dan label, tanpa grafik dekoratif yang tidak membantu.

## 7. Pedoman per Halaman
- **Login:** panel login ringkas, branding, validasi input, indikator demo jika belum memakai backend.
- **Dashboard:** kartu jumlah supplier/kriteria dan ringkasan ranking; jangan mengarang data nyata.
- **Data Supplier:** pencarian, tabel, tombol tambah, form tambah/edit, konfirmasi hapus.
- **Data Kriteria:** nama, tipe benefit/cost, deskripsi opsional.
- **Bobot Kriteria:** input bobot, indikator total bobot, validasi total.
- **Penilaian Supplier:** tabel matriks supplier × kriteria, input nilai dengan batas yang jelas.
- **Perhitungan SAW:** tampilkan langkah normalisasi dan nilai preferensi agar bisa diaudit.
- **Hasil Ranking:** ranking, nama supplier, nilai akhir, aksi melihat detail.
- **Laporan:** filter sederhana bila relevan, ringkasan, tabel, tombol cetak.

## 8. Interaksi dan Status
- Semua aksi utama harus berfungsi dan memberi feedback.
- Form mempertahankan data ketika validasi gagal.
- Sediakan empty state dengan ajakan tindakan yang relevan.
- Sediakan loading/error state jika ada proses asynchronous.
- Tampilkan dialog konfirmasi untuk penghapusan.
- Hindari animasi yang menghambat pekerjaan; transisi singkat dan halus saja.

## 9. Responsivitas dan Aksesibilitas
- Gunakan layout fluid dan breakpoint standar.
- Kontrol dapat dioperasikan dengan keyboard.
- Semua input mempunyai label.
- Fokus keyboard terlihat.
- Jangan menyampaikan informasi hanya melalui warna.
- Hormati `prefers-reduced-motion` bila animasi digunakan.

## 10. Batasan Visual
Jangan menambahkan fitur di luar PRD. Jangan membuat halaman marketing, e-commerce, chat, notifikasi eksternal, atau fitur operasional bengkel lain tanpa persetujuan.
