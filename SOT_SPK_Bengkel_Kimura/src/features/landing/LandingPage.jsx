import React, { useState } from 'react';
import {
  IconArrowRight,
  IconShield,
  IconZap,
  IconAward,
  IconTrendingUp,
  IconCheckCircle,
  IconSuppliers,
  IconCriteria,
  IconWeights,
  IconAssessments,
  IconSaw,
  IconRanking,
  IconCheck,
  IconAlert,
  IconInfo,
  IconMenu,
  IconClose
} from '../../components/ui/Icons';

export default function LandingPage({ onGoToLogin, onGoToDashboard, isAuthenticated }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-wrapper">
      {/* ===================================================================
          1. NAVBAR (Sticky & Elegant)
          =================================================================== */}
      <nav className="landing-nav">
        <div className="landing-nav-container">
          <div className="landing-nav-left" onClick={() => scrollToSection('beranda')} style={{ cursor: 'pointer' }}>
            <div className="brand-logo-box">K</div>
            <div className="brand-title-wrap">
              <span className="brand-title-main">KIMURA SPK</span>
              <span className="brand-title-tag">Bengkel Kimura Motorindo</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="landing-nav-center">
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('beranda')}>
              Beranda
            </button>
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('tentang')}>
              Tentang Sistem
            </button>
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('keunggulan')}>
              Keunggulan
            </button>
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('kriteria')}>
              Kriteria Penilaian
            </button>
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('alur-saw')}>
              Alur SAW
            </button>
          </div>

          {/* Right Action */}
          <div className="landing-nav-right">
            {isAuthenticated ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={onGoToDashboard}
              >
                <span>Buka Dashboard</span>
                <IconArrowRight size={16} />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-secondary nav-login-btn"
                  onClick={onGoToLogin}
                >
                  Login Admin
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onGoToLogin}
                >
                  <span>Mulai Sekarang</span>
                  <IconArrowRight size={16} />
                </button>
              </>
            )}

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-nav-dropdown">
            <button type="button" className="mobile-nav-item" onClick={() => scrollToSection('beranda')}>
              Beranda
            </button>
            <button type="button" className="mobile-nav-item" onClick={() => scrollToSection('tentang')}>
              Tentang Sistem
            </button>
            <button type="button" className="mobile-nav-item" onClick={() => scrollToSection('keunggulan')}>
              Keunggulan
            </button>
            <button type="button" className="mobile-nav-item" onClick={() => scrollToSection('kriteria')}>
              Kriteria Penilaian
            </button>
            <button type="button" className="mobile-nav-item" onClick={() => scrollToSection('alur-saw')}>
              Alur SAW
            </button>
            <div style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={isAuthenticated ? onGoToDashboard : onGoToLogin}
              >
                {isAuthenticated ? 'Buka Dashboard' : 'Login Admin'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ===================================================================
          2. HERO SECTION (Two-Column Layout with Real Mockup)
          =================================================================== */}
      <section id="beranda" className="hero-section">
        <div className="hero-container">
          {/* Left Column: Headline, Description, and CTAs */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-pill">Sistem Pendukung Keputusan</span>
              <span className="hero-badge-text">Metode Simple Additive Weighting (SAW)</span>
            </div>

            <h1 className="hero-headline">
              Temukan <span className="text-red">Supplier Sparepart Terbaik</span> untuk Bengkel Anda.
            </h1>

            <p className="hero-description">
              KIMURA SPK membantu Bengkel Kimura membandingkan dan menentukan supplier sparepart berdasarkan kriteria penilaian menggunakan metode Simple Additive Weighting (SAW).
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary btn-hero"
                onClick={isAuthenticated ? onGoToDashboard : onGoToLogin}
              >
                <span>{isAuthenticated ? 'Masuk ke Dashboard' : 'Mulai Sekarang'}</span>
                <IconArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-hero"
                onClick={() => scrollToSection('tentang')}
              >
                <span>Pelajari Sistem</span>
              </button>
            </div>

            <div className="hero-features-list">
              <div className="hero-feature-item">
                <IconCheckCircle size={16} className="text-red" />
                <span>Multi-Kriteria Terbobot</span>
              </div>
              <div className="hero-feature-item">
                <IconCheckCircle size={16} className="text-red" />
                <span>Normalisasi Benefit & Cost</span>
              </div>
              <div className="hero-feature-item">
                <IconCheckCircle size={16} className="text-red" />
                <span>Hasil Ranking Objektif</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic UI Mockup of the SPK Dashboard */}
          <div className="hero-right">
            <div className="mockup-frame">
              {/* Window Header Bar */}
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="mockup-dot dot-red"></span>
                  <span className="mockup-dot dot-yellow"></span>
                  <span className="mockup-dot dot-green"></span>
                </div>
                <div className="mockup-header-title">
                  <span>kimura-spk.internal / dashboard / ranking</span>
                </div>
                <div className="mockup-status-tag">
                  <span>Metode SAW Aktif</span>
                </div>
              </div>

              {/* Mockup Body Content */}
              <div className="mockup-body">
                {/* Top Highlight Card: Supplier Pemenang */}
                <div className="mockup-top-card">
                  <div className="mockup-top-info">
                    <div className="mockup-rank-pill">
                      <IconAward size={13} />
                      <span>Rekomendasi Peringkat #1</span>
                    </div>
                    <div className="mockup-winner-name">CV Sentosa Abadi Sparepart</div>
                    <div className="mockup-winner-meta">Mitra Rantai, Gir & Transmisi • Skor Preferensi SAW</div>
                  </div>
                  <div className="mockup-winner-score">
                    <span className="score-val">0.9715</span>
                    <span className="score-label">Nilai Vi</span>
                  </div>
                </div>

                {/* Metric Summary Bars */}
                <div className="mockup-criteria-bars">
                  <div className="mockup-bar-item">
                    <div className="bar-labels">
                      <span className="bar-name">Harga (Cost 25%)</span>
                      <span className="bar-val">Score: 70 (r: 1.000)</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '100%', backgroundColor: 'var(--brand-600)' }}></div>
                    </div>
                  </div>

                  <div className="mockup-bar-item">
                    <div className="bar-labels">
                      <span className="bar-name">Kualitas Barang (Benefit 30%)</span>
                      <span className="bar-val">Score: 85 (r: 0.944)</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '94%', backgroundColor: '#111111' }}></div>
                    </div>
                  </div>

                  <div className="mockup-bar-item">
                    <div className="bar-labels">
                      <span className="bar-name">Ketersediaan Stok (Benefit 25%)</span>
                      <span className="bar-val">Score: 90 (r: 1.000)</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '100%', backgroundColor: 'var(--brand-600)' }}></div>
                    </div>
                  </div>

                  <div className="mockup-bar-item">
                    <div className="bar-labels">
                      <span className="bar-name">Pelayanan & Kirim (Benefit 20%)</span>
                      <span className="bar-val">Score: 80 (r: 0.941)</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '94%', backgroundColor: '#111111' }}></div>
                    </div>
                  </div>
                </div>

                {/* Mini Ranking Table Preview */}
                <div className="mockup-mini-table">
                  <div className="mini-table-head">
                    <span>Rank</span>
                    <span>Supplier</span>
                    <span style={{ textAlign: 'right' }}>Nilai SAW</span>
                    <span style={{ textAlign: 'right' }}>Status</span>
                  </div>

                  <div className="mini-table-row active-row">
                    <span className="rank-num rank-1">#1</span>
                    <span className="sup-title">CV Sentosa Abadi</span>
                    <span className="sup-score">0.9715</span>
                    <span className="sup-badge badge-green">Pilihan Utama</span>
                  </div>

                  <div className="mini-table-row">
                    <span className="rank-num">#2</span>
                    <span className="sup-title">PT Sumber Motor Sejahtera</span>
                    <span className="sup-score">0.9549</span>
                    <span className="sup-badge badge-blue">Cadangan</span>
                  </div>

                  <div className="mini-table-row">
                    <span className="rank-num">#3</span>
                    <span className="sup-title">Toko Jaya Motor Parts</span>
                    <span className="sup-score">0.8938</span>
                    <span className="sup-badge badge-gray">Cadangan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. TENTANG SISTEM (Purpose & Role for Workshop Owner)
          =================================================================== */}
      <section id="tentang" className="landing-block bg-white">
        <div className="landing-container">
          <div className="section-heading-box">
            <span className="heading-tag">Tentang Sistem</span>
            <h2 className="heading-title">Mengenal Lebih Dekat KIMURA SPK</h2>
            <p className="heading-desc">
              Sistem Pendukung Keputusan yang dirancang khusus untuk memodernisasi cara Bengkel Kimura memilih rekanan suku cadang sepeda motor.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-content-card">
              <div className="about-icon-header">
                <IconShield size={28} className="text-red" />
              </div>
              <h3 className="about-card-title">Apa itu KIMURA SPK?</h3>
              <p className="about-card-text">
                <strong>KIMURA SPK</strong> adalah aplikasi web Sistem Pendukung Keputusan (<em>Decision Support System</em>) berbasis metode <strong>Simple Additive Weighting (SAW)</strong>. Sistem ini dikembangkan untuk memecahkan dilema dalam menentukan supplier suku cadang sepeda motor bagi Bengkel Kimura.
              </p>
              <p className="about-card-text">
                Dengan menerapkan algoritma penjumlahan terbobot, sistem mengubah evaluasi kualitatif dan kuantitatif dari beberapa kriteria menjadi satu nilai preferensi akhir yang objektif.
              </p>
            </div>

            <div className="about-content-card">
              <div className="about-icon-header">
                <IconTrendingUp size={28} className="text-red" />
              </div>
              <h3 className="about-card-title">Tujuan Pembuatan Sistem</h3>
              <p className="about-card-text">
                Tujuan utama sistem ini adalah meniadakan proses seleksi pemasok yang selama ini masih bersifat intuitif, manual, atau hanya mengandalkan perkiraan harga semata.
              </p>
              <p className="about-card-text">
                Sistem memberikan landasan analitis yang jelas agar modal pengadaan sparepart dapat dialokasikan ke supplier yang tidak hanya menawarkan harga terjangkau, tetapi juga menjamin keaslian barang, kesiapan stok barang fast-moving, dan pengiriman yang tepat waktu.
              </p>
            </div>

            <div className="about-content-card full-span-card">
              <div className="about-icon-header">
                <IconAward size={28} className="text-red" />
              </div>
              <h3 className="about-card-title">Bagaimana Sistem Membantu Pemilik Bengkel?</h3>
              <div className="owner-benefit-grid">
                <div className="owner-benefit-item">
                  <div className="benefit-number">01</div>
                  <h4>Pengambilan Keputusan Cepat & Terukur</h4>
                  <p>Pemilik bengkel tidak perlu lagi menghitung manual ribuan opsi suku cadang; sistem menghasilkan urutan ranking siap pakai dalam hitungan detik.</p>
                </div>
                <div className="owner-benefit-item">
                  <div className="benefit-number">02</div>
                  <h4>Transparansi Multi-Kriteria</h4>
                  <p>Setiap rekomendasi dapat diaudit secara rinci hingga ke nilai normalisasi matriks, sehingga alasan pemilihan supplier dapat dipertanggungjawabkan.</p>
                </div>
                <div className="owner-benefit-item">
                  <div className="benefit-number">03</div>
                  <h4>Dokumentasi & Laporan Formal</h4>
                  <p>Menghasilkan rekapitulasi penilaian siap cetak dengan format pengesahan tanda tangan antara Admin SPK dan Pemilik Bengkel untuk arsip pembukuan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. KEUNGGULAN SISTEM (Four Modern Cards)
          =================================================================== */}
      <section id="keunggulan" className="landing-block bg-canvas">
        <div className="landing-container">
          <div className="section-heading-box">
            <span className="heading-tag">Keunggulan Sistem</span>
            <h2 className="heading-title">Dirancang untuk Efisiensi & Ketepatan</h2>
            <p className="heading-desc">
              Empat keunggulan utama yang membedakan KIMURA SPK dengan metode pemilihan konvensional.
            </p>
          </div>

          <div className="advantages-grid">
            {/* Card 1 */}
            <div className="advantage-card">
              <div className="advantage-icon-box">
                <IconAssessments size={24} />
              </div>
              <h3 className="advantage-title">Penilaian Lebih Terstruktur</h3>
              <p className="advantage-text">
                Parameter penilaian didefinisikan secara baku dengan skala terstandar (1–100), memastikan seluruh alternatif supplier diuji dengan instrumen ukur yang adil dan konsisten.
              </p>
              <div className="advantage-footer">
                <span className="advantage-pill">Skala Terstandar</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="advantage-card">
              <div className="advantage-icon-box">
                <IconSuppliers size={24} />
              </div>
              <h3 className="advantage-title">Perbandingan Supplier</h3>
              <p className="advantage-text">
                Membandingkan kelebihan dan kekurangan banyak rekanan supplier secara simultan, memberikan komparasi seimbang antara faktor biaya dan keandalan operasional.
              </p>
              <div className="advantage-footer">
                <span className="advantage-pill">Komparasi Simultan</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="advantage-card">
              <div className="advantage-icon-box">
                <IconSaw size={24} />
              </div>
              <h3 className="advantage-title">Perhitungan Metode SAW</h3>
              <p className="advantage-text">
                Menggunakan algoritma Simple Additive Weighting yang teruji secara akademis dan praktis, dengan pemisahan rumus normalisasi kriteria Benefit dan Cost secara presisi.
              </p>
              <div className="advantage-footer">
                <span className="advantage-pill">Algoritma Teruji</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="advantage-card">
              <div className="advantage-icon-box">
                <IconRanking size={24} />
              </div>
              <h3 className="advantage-title">Hasil Ranking Mudah Dipahami</h3>
              <p className="advantage-text">
                Penyajian hasil perankingan yang ringkas, dilengkapi skor akhir preferensi (Vi), lencana status rekomendasi prioritas, serta rincian kontribusi skor per kriteria.
              </p>
              <div className="advantage-footer">
                <span className="advantage-pill">Visual Intuitif</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. KRITERIA PENILAIAN (Four Clean Cards + Owner Note)
          =================================================================== */}
      <section id="kriteria" className="landing-block bg-white">
        <div className="landing-container">
          <div className="section-heading-box">
            <span className="heading-tag">Kriteria Penilaian</span>
            <h2 className="heading-title">Parameter Evaluasi Supplier</h2>
            <p className="heading-desc">
              Empat pilar kriteria utama yang menjadi acuan penilaian kinerja supplier suku cadang Bengkel Kimura.
            </p>
          </div>

          <div className="criteria-grid">
            {/* Kriteria 1: Harga */}
            <div className="criterion-card">
              <div className="criterion-header">
                <span className="criterion-code">C1</span>
                <span className="badge badge-cost">Tipe: Cost</span>
              </div>
              <h3 className="criterion-name">Harga Suku Cadang</h3>
              <p className="criterion-desc">
                Mengukur tingkat keterjangkauan harga grosir komponen dan fleksibilitas potongan harga. Pada kriteria Cost, nilai yang semakin rendah dianggap semakin baik karena menghemat modal bengkel.
              </p>
              <div className="criterion-formula">
                <span>Normalisasi:</span>
                <code>rij = Min(xj) / xij</code>
              </div>
            </div>

            {/* Kriteria 2: Kualitas */}
            <div className="criterion-card">
              <div className="criterion-header">
                <span className="criterion-code">C2</span>
                <span className="badge badge-benefit">Tipe: Benefit</span>
              </div>
              <h3 className="criterion-name">Kualitas Barang</h3>
              <p className="criterion-desc">
                Menilai keaslian komponen (originalitas part), mutu material, dan ketahanan pakai. Pada kriteria Benefit, nilai yang semakin tinggi dianggap semakin menguntungkan bengkel dan pelanggan.
              </p>
              <div className="criterion-formula">
                <span>Normalisasi:</span>
                <code>rij = xij / Max(xj)</code>
              </div>
            </div>

            {/* Kriteria 3: Ketersediaan Barang */}
            <div className="criterion-card">
              <div className="criterion-header">
                <span className="criterion-code">C3</span>
                <span className="badge badge-benefit">Tipe: Benefit</span>
              </div>
              <h3 className="criterion-name">Ketersediaan Barang</h3>
              <p className="criterion-desc">
                Menilai kesiapan stok barang kategori fast-moving (oli, kampas rem, busi, aki, ban, filter) agar stok bengkel selalu siap dan servis motor pelanggan tidak tertunda.
              </p>
              <div className="criterion-formula">
                <span>Normalisasi:</span>
                <code>rij = xij / Max(xj)</code>
              </div>
            </div>

            {/* Kriteria 4: Pelayanan */}
            <div className="criterion-card">
              <div className="criterion-header">
                <span className="criterion-code">C4</span>
                <span className="badge badge-benefit">Tipe: Benefit</span>
              </div>
              <h3 className="criterion-name">Pelayanan</h3>
              <p className="criterion-desc">
                Menilai kecepatan pengiriman suku cadang ke bengkel, garansi retur jika barang cacat, serta kemudahan komunikasi dan respon layanan pelanggan supplier.
              </p>
              <div className="criterion-formula">
                <span>Normalisasi:</span>
                <code>rij = xij / Max(xj)</code>
              </div>
            </div>
          </div>

          {/* Catatan Wajib: Usulan Awal Pemilik Bengkel */}
          <div className="criteria-notice-card">
            <div className="notice-icon-wrap">
              <IconInfo size={20} className="text-red" />
            </div>
            <div className="notice-content">
              <strong>Catatan Validasi Kriteria:</strong>
              <p>
                Keempat kriteria dan pembobotan di atas merupakan <strong>usulan rancangan awal</strong> sistem yang dirumuskan berdasarkan operasional bengkel motor umum, dan <strong>perlu dikonfirmasi serta divalidasi langsung dengan pemilik Bengkel Kimura</strong> sebelum diterapkan secara final pada kontrak pengadaan resmi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. ALUR METODE SAW (Pipeline Step Cards)
          =================================================================== */}
      <section id="alur-saw" className="landing-block bg-canvas">
        <div className="landing-container">
          <div className="section-heading-box">
            <span className="heading-tag">Alur SAW</span>
            <h2 className="heading-title">Proses Pengambilan Keputusan SAW</h2>
            <p className="heading-desc">
              Tahapan sistematis dari pengumpulan data hingga menghasilkan rekomendasi peringkat supplier.
            </p>
          </div>

          <div className="workflow-grid">
            <div className="flow-card">
              <div className="flow-number">01</div>
              <div className="flow-icon-circle"><IconSuppliers size={20} /></div>
              <h4 className="flow-title">Data Supplier</h4>
              <p className="flow-desc">Mendaftarkan profil rekanan supplier sparepart motor beserta kontak dan alamat.</p>
            </div>

            <div className="flow-card">
              <div className="flow-number">02</div>
              <div className="flow-icon-circle"><IconCriteria size={20} /></div>
              <h4 className="flow-title">Kriteria</h4>
              <p className="flow-desc">Menentukan parameter evaluasi beserta sifat atributnya (Benefit / Cost).</p>
            </div>

            <div className="flow-card">
              <div className="flow-number">03</div>
              <div className="flow-icon-circle"><IconWeights size={20} /></div>
              <h4 className="flow-title">Bobot</h4>
              <p className="flow-desc">Mengatur bobot tingkat kepentingan (W) dengan validasi akumulasi tepat 100%.</p>
            </div>

            <div className="flow-card">
              <div className="flow-number">04</div>
              <div className="flow-icon-circle"><IconAssessments size={20} /></div>
              <h4 className="flow-title">Penilaian</h4>
              <p className="flow-desc">Memasukkan nilai kinerja supplier (skala 1–100) pada matriks keputusan (X).</p>
            </div>

            <div className="flow-card">
              <div className="flow-number">05</div>
              <div className="flow-icon-circle"><IconSaw size={20} /></div>
              <h4 className="flow-title">Perhitungan SAW</h4>
              <p className="flow-desc">Normalisasi matriks (R) dan perkalian dengan vektor bobot untuk mendapatkan nilai Vi.</p>
            </div>

            <div className="flow-card highlight-flow">
              <div className="flow-number" style={{ backgroundColor: 'var(--brand-600)', color: '#fff' }}>06</div>
              <div className="flow-icon-circle" style={{ backgroundColor: 'var(--brand-50)', color: 'var(--brand-600)' }}>
                <IconRanking size={20} />
              </div>
              <h4 className="flow-title">Hasil Ranking</h4>
              <p className="flow-desc">Penyusunan urutan prioritas supplier terbaik dan pembuatan laporan cetak resmi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          7. FOOTER (Branding, Navigation, and Workshop Identity)
          =================================================================== */}
      <footer className="landing-footer-dark">
        <div className="landing-container">
          <div className="footer-main-row">
            {/* Col 1: Brand & Identity */}
            <div className="footer-col-brand">
              <div className="brand-logo-wrap">
                <div className="brand-logo-box">K</div>
                <div className="brand-title-wrap">
                  <span className="brand-title-main" style={{ color: '#ffffff' }}>KIMURA SPK</span>
                  <span className="brand-title-tag">Bengkel Kimura Motorindo</span>
                </div>
              </div>
              <p className="footer-brand-text">
                Sistem Pendukung Keputusan Pemilihan Supplier Sparepart pada Bengkel Kimura Menggunakan Metode Simple Additive Weighting (SAW) Berbasis Web.
              </p>
              <div className="footer-badge-tech">
                <span>React</span> • <span>Vite</span> • <span>Tailwind CSS</span> • <span>SAW Engine</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="footer-col-nav">
              <h4 className="footer-header-text">Navigasi Halaman</h4>
              <ul className="footer-link-list">
                <li><button type="button" onClick={() => scrollToSection('beranda')}>Beranda Utama</button></li>
                <li><button type="button" onClick={() => scrollToSection('tentang')}>Tentang Sistem</button></li>
                <li><button type="button" onClick={() => scrollToSection('keunggulan')}>Keunggulan Sistem</button></li>
                <li><button type="button" onClick={() => scrollToSection('kriteria')}>Kriteria Penilaian</button></li>
                <li><button type="button" onClick={() => scrollToSection('alur-saw')}>Alur Metode SAW</button></li>
              </ul>
            </div>

            {/* Col 3: Workshop Identity & Contact */}
            <div className="footer-col-info">
              <h4 className="footer-header-text">Identitas Bengkel</h4>
              <div className="footer-contact-box">
                <p><strong>Bengkel Kimura Motorindo</strong></p>
                <p>Jl. Raden Inten II No. 45, Duren Sawit, Jakarta Timur</p>
                <p>Telepon: (021) 8620-1122</p>
                <p>Spesialis Perawatan Berkala & Penyedia Suku Cadang Resmi Motor</p>
              </div>
            </div>
          </div>

          <div className="footer-copyright-row">
            <div>
              &copy; 2026 <strong>Bengkel Kimura Motorindo</strong>. Seluruh Hak Cipta Dilindungi.
            </div>
            <div className="footer-academic-tag">
              Implementasi Metode Simple Additive Weighting (SAW) Berbasis Web
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
