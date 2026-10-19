# AGENTS.md — Kimura SPK

## Misi
Bangun aplikasi web **Sistem Pendukung Keputusan Pemilihan Supplier Sparepart pada Bengkel Kimura Menggunakan Metode SAW Berbasis Web** sesuai `PRD.md`, `UI-GUIDELINE.md`, dan `IMPLEMENTATION_PLAN.md`.

## Sumber Kebenaran
1. `PRD.md` — kebutuhan dan batasan produk.
2. `UI-GUIDELINE.md` — tampilan dan perilaku UI.
3. `IMPLEMENTATION_PLAN.md` — urutan implementasi dan kriteria selesai.
Jika instruksi bertentangan, jangan menebak. Jelaskan konflik dan minta persetujuan pengguna.

## Aturan Wajib
- Kerjakan hanya dalam ruang lingkup dokumen.
- Jangan menambah fitur atau dependensi besar tanpa persetujuan.
- Jangan menghapus atau merombak pekerjaan yang sudah ada tanpa memeriksa struktur proyek.
- Jangan mengklaim backend, autentikasi aman, atau database produksi tersedia jika belum dibuat.
- Data contoh harus ditandai sebagai demo.
- Jangan hard-code nilai ranking; semua hasil harus berasal dari perhitungan SAW.
- Pisahkan logika bisnis SAW dari UI.
- Gunakan komponen reusable, penamaan jelas, dan kode yang mudah dipahami pemula.
- Semua tombol dan form utama harus berfungsi; kontrol yang belum tersedia harus diberi status jelas, bukan berpura-pura berfungsi.
- Pertahankan identitas visual merah, hitam, dan putih.
- Pastikan UI responsif dan memiliki label, focus state, validasi, empty state, serta feedback.
- Jangan menaruh rahasia, token, atau kredensial di source control.

## Protokol Phase
- Implementasikan satu step dari `IMPLEMENTATION_PLAN.md` pada satu waktu.
- Sebelum memulai step, rangkum tujuan dan file yang akan disentuh.
- Jika perubahan memerlukan keputusan di luar dokumen, berhenti dan minta persetujuan.
- Setelah step selesai, laporkan file yang dibuat/diubah, cara menguji, hasil pemeriksaan, dan keterbatasan.
- Jangan otomatis melanjutkan ke step berikutnya tanpa persetujuan pengguna.

## Kualitas
- Jalankan lint/test/build yang tersedia bila memungkinkan.
- Perbaiki error yang disebabkan oleh perubahan sendiri.
- Jangan menyatakan tes berhasil jika tidak benar-benar dijalankan.
- Untuk perhitungan SAW, sediakan pengujian yang mencakup benefit, cost, bobot, data kosong, dan pembagian dengan nol.
