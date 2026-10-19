import React, { useState, useMemo } from 'react';
import { useAppData } from '../../context/DataContext';
import Modal from '../../components/ui/Modal';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconAlert,
  IconCheck,
  IconCriteria
} from '../../components/ui/Icons';

export default function CriteriaPage() {
  const {
    criteria,
    addCriterion,
    updateCriterion,
    deleteCriterion,
    totalCriteriaWeight,
    isWeightsValid
  } = useAppData();

  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');

  // State Modal Form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCriterion, setEditingCriterion] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'benefit',
    weight: 25,
    description: ''
  });
  const [formError, setFormError] = useState('');

  // State Modal Konfirmasi Hapus
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filter daftar kriteria berdasarkan query pencarian
  const filteredCriteria = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return criteria;
    return criteria.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [criteria, searchQuery]);

  // Handler Buka Form Tambah
  const handleOpenAdd = () => {
    setEditingCriterion(null);
    setFormData({
      code: `C${criteria.length + 1}`,
      name: '',
      type: 'benefit',
      weight: 20,
      description: ''
    });
    setFormError('');
    setIsFormOpen(true);
  };

  // Handler Buka Form Edit
  const handleOpenEdit = (criterion) => {
    setEditingCriterion(criterion);
    setFormData({
      code: criterion.code,
      name: criterion.name,
      type: criterion.type,
      weight: criterion.weight,
      description: criterion.description || ''
    });
    setFormError('');
    setIsFormOpen(true);
  };

  // Handler Submit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Nama kriteria wajib diisi.');
      return;
    }
    const weightVal = Number(formData.weight);
    if (isNaN(weightVal) || weightVal <= 0) {
      setFormError('Bobot kriteria harus berupa angka positif lebih dari 0.');
      return;
    }

    if (editingCriterion) {
      updateCriterion(editingCriterion.id, formData);
      setNotification(`Kriteria "${formData.name}" berhasil diperbarui.`);
    } else {
      addCriterion(formData);
      setNotification(`Kriteria "${formData.name}" berhasil ditambahkan.`);
    }

    setIsFormOpen(false);
    setTimeout(() => setNotification(''), 4000);
  };

  // Handler Eksekusi Hapus
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteCriterion(deleteTarget.id);
      setNotification(`Kriteria "${deleteTarget.name}" berhasil dihapus.`);
      setDeleteTarget(null);
      setTimeout(() => setNotification(''), 4000);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>Data Master Kriteria</h2>
          <p>
            Definisikan kriteria penilaian supplier suku cadang serta sifat atribut (Benefit / Cost).
          </p>
        </div>
        <div>
          <button type="button" className="btn btn-primary" onClick={handleOpenAdd}>
            <IconPlus size={16} />
            <span>Tambah Kriteria</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="alert-box alert-info" style={{ marginBottom: '16px' }} role="status">
          <IconCheck size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
          <span>{notification}</span>
        </div>
      )}

      {/* Status Akumulasi Bobot Kriteria */}
      <div
        className={`alert-box ${isWeightsValid ? 'alert-info' : 'alert-warning'}`}
        style={{ marginBottom: '20px' }}
      >
        {isWeightsValid ? (
          <IconCheck size={20} style={{ color: 'var(--success)', flexShrink: 0 }} />
        ) : (
          <IconAlert size={20} style={{ color: 'var(--warning)', flexShrink: 0 }} />
        )}
        <div style={{ fontSize: '13px' }}>
          <strong>Akumulasi Total Bobot: {totalCriteriaWeight}%</strong>
          <span style={{ marginLeft: '8px' }}>
            {isWeightsValid
              ? '— Seluruh bobot telah valid dan seimbang (tepat 100%).'
              : '— Peringatan: Total bobot seluruh kriteria aktif harus berjumlah tepat 100% untuk hasil SAW yang akurat.'}
          </span>
        </div>
      </div>

      {/* Toolbar Pencarian & Info Total */}
      <div className="toolbar">
        <div className="search-box">
          <span className="search-icon">
            <IconSearch size={16} />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Cari kode, nama, atau tipe kriteria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ fontSize: '13px', color: 'var(--ink-600)' }}>
          Menampilkan <strong>{filteredCriteria.length}</strong> dari{' '}
          <strong>{criteria.length}</strong> kriteria
        </div>
      </div>

      {/* Tabel Data Kriteria */}
      {filteredCriteria.length > 0 ? (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>No</th>
                <th style={{ width: '100px' }}>Kode</th>
                <th>Nama Kriteria</th>
                <th style={{ width: '120px' }}>Sifat / Tipe</th>
                <th style={{ width: '110px' }}>Bobot (%)</th>
                <th>Deskripsi & Indikator</th>
                <th style={{ width: '160px', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCriteria.map((criterion, idx) => (
                <tr key={criterion.id}>
                  <td style={{ color: 'var(--ink-500)' }}>{idx + 1}</td>
                  <td>
                    <span
                      style={{
                        fontWeight: '700',
                        fontSize: '12px',
                        backgroundColor: '#f3f4f6',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {criterion.code}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--ink-950)' }}>
                      {criterion.name}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        criterion.type === 'benefit' ? 'badge-benefit' : 'badge-cost'
                      }`}
                      title={
                        criterion.type === 'benefit'
                          ? 'Benefit: Nilai semakin besar semakin baik'
                          : 'Cost: Nilai semakin kecil semakin baik'
                      }
                    >
                      {criterion.type}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: '700', color: 'var(--ink-950)' }}>
                      {criterion.weight}%
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12.5px', color: 'var(--ink-600)' }}>
                      {criterion.description || '-'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="btn-icon-action"
                        onClick={() => handleOpenEdit(criterion)}
                        title="Ubah kriteria"
                      >
                        <IconEdit size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        className="btn-icon-action btn-icon-danger"
                        onClick={() => setDeleteTarget(criterion)}
                        title="Hapus kriteria"
                      >
                        <IconTrash size={14} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <IconCriteria size={26} />
          </div>
          <h3 className="empty-state-title">
            {searchQuery ? 'Kriteria tidak ditemukan' : 'Belum ada data kriteria'}
          </h3>
          <p className="empty-state-desc">
            {searchQuery
              ? `Tidak ada kriteria yang cocok dengan kata kunci "${searchQuery}". Coba gunakan kata kunci lain.`
              : 'Silakan tambahkan data kriteria evaluasi (seperti Harga, Kualitas, Stok) untuk memulai perhitungan SPK.'}
          </p>
          {searchQuery ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSearchQuery('')}
            >
              Hapus Filter Pencarian
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={handleOpenAdd}>
              <IconPlus size={16} />
              <span>Tambah Kriteria Pertama</span>
            </button>
          )}
        </div>
      )}

      {/* Modal Form Tambah / Edit */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingCriterion ? 'Ubah Data Kriteria' : 'Tambah Kriteria Baru'}
      >
        {formError && (
          <div className="alert-box alert-warning" style={{ marginBottom: '16px', padding: '10px 14px' }}>
            <IconAlert size={16} />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmitForm} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="crit-code" className="form-label">
              Kode Kriteria
            </label>
            <input
              id="crit-code"
              type="text"
              className="form-input"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Contoh: C1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="crit-name" className="form-label">
              Nama Kriteria <span style={{ color: 'var(--brand-600)' }}>*</span>
            </label>
            <input
              id="crit-name"
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Kualitas Barang"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="crit-type" className="form-label">
              Sifat / Tipe Kriteria <span style={{ color: 'var(--brand-600)' }}>*</span>
            </label>
            <select
              id="crit-type"
              className="form-input"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="benefit">Benefit (Nilai makin tinggi makin baik/menguntungkan)</option>
              <option value="cost">Cost (Nilai makin rendah makin baik/hemat biaya)</option>
            </select>
            <span className="form-helper">
              Sifat kriteria menentukan rumus normalisasi pada perhitungan SAW.
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="crit-weight" className="form-label">
              Bobot Kriteria (%) <span style={{ color: 'var(--brand-600)' }}>*</span>
            </label>
            <input
              id="crit-weight"
              type="number"
              step="any"
              min="1"
              max="100"
              className="form-input"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="Contoh: 25"
              required
            />
            <span className="form-helper">
              Persentase tingkat kepentingan kriteria (Total akumulasi harus 100%).
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="crit-desc" className="form-label">
              Deskripsi & Indikator
            </label>
            <textarea
              id="crit-desc"
              className="form-input"
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Penjelasan kriteria penilaian..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsFormOpen(false)}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              {editingCriterion ? 'Simpan Perubahan' : 'Tambahkan Kriteria'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Dialog Konfirmasi Hapus */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Konfirmasi Hapus Kriteria"
        maxWidth="440px"
      >
        <div>
          <p style={{ fontSize: '14px', color: 'var(--ink-700)', lineHeight: '1.5', marginBottom: '16px' }}>
            Apakah Anda yakin ingin menghapus kriteria{' '}
            <strong style={{ color: 'var(--ink-950)' }}>"{deleteTarget?.name}"</strong> ({deleteTarget?.code})?
          </p>
          <div className="alert-box alert-warning" style={{ padding: '10px 14px', marginBottom: '20px' }}>
            <IconAlert size={16} />
            <span style={{ fontSize: '12.5px' }}>
              Nilai evaluasi kriteria ini pada seluruh supplier akan dihapus dan bobot total akan berubah.
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setDeleteTarget(null)}
            >
              Batal
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirmDelete}
            >
              Ya, Hapus Kriteria
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
