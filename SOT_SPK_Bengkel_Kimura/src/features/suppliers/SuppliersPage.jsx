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
  IconSuppliers
} from '../../components/ui/Icons';

export default function SuppliersPage() {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useAppData();

  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');

  // State Modal Form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    contact: '',
    address: '',
    notes: ''
  });
  const [formError, setFormError] = useState('');

  // State Modal Konfirmasi Hapus
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filter daftar supplier berdasarkan query pencarian
  const filteredSuppliers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return suppliers;
    return suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        (s.contact && s.contact.toLowerCase().includes(q)) ||
        (s.address && s.address.toLowerCase().includes(q))
    );
  }, [suppliers, searchQuery]);

  // Handler Buka Form Tambah
  const handleOpenAdd = () => {
    setEditingSupplier(null);
    setFormData({
      code: `SUP-${String(suppliers.length + 1).padStart(2, '0')}`,
      name: '',
      contact: '',
      address: '',
      notes: ''
    });
    setFormError('');
    setIsFormOpen(true);
  };

  // Handler Buka Form Edit
  const handleOpenEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      code: supplier.code,
      name: supplier.name,
      contact: supplier.contact || '',
      address: supplier.address || '',
      notes: supplier.notes || ''
    });
    setFormError('');
    setIsFormOpen(true);
  };

  // Handler Submit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Nama supplier wajib diisi.');
      return;
    }
    if (!formData.contact.trim()) {
      setFormError('Nomor kontak supplier wajib diisi.');
      return;
    }

    if (editingSupplier) {
      updateSupplier(editingSupplier.id, formData);
      setNotification(`Supplier "${formData.name}" berhasil diperbarui.`);
    } else {
      addSupplier(formData);
      setNotification(`Supplier "${formData.name}" berhasil ditambahkan.`);
    }

    setIsFormOpen(false);
    setTimeout(() => setNotification(''), 4000);
  };

  // Handler Eksekusi Hapus
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteSupplier(deleteTarget.id);
      setNotification(`Supplier "${deleteTarget.name}" berhasil dihapus.`);
      setDeleteTarget(null);
      setTimeout(() => setNotification(''), 4000);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>Data Master Supplier</h2>
          <p>
            Kelola daftar rekanan supplier suku cadang / sparepart pada Bengkel Kimura.
          </p>
        </div>
        <div>
          <button type="button" className="btn btn-primary" onClick={handleOpenAdd}>
            <IconPlus size={16} />
            <span>Tambah Supplier</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="alert-box alert-info" style={{ marginBottom: '16px' }} role="status">
          <IconCheck size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
          <span>{notification}</span>
        </div>
      )}

      {/* Toolbar Pencarian & Info Total */}
      <div className="toolbar">
        <div className="search-box">
          <span className="search-icon">
            <IconSearch size={16} />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Cari kode, nama, atau kontak supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ fontSize: '13px', color: 'var(--ink-600)' }}>
          Menampilkan <strong>{filteredSuppliers.length}</strong> dari{' '}
          <strong>{suppliers.length}</strong> supplier
        </div>
      </div>

      {/* Tabel Data Supplier */}
      {filteredSuppliers.length > 0 ? (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>No</th>
                <th style={{ width: '110px' }}>Kode</th>
                <th>Nama Supplier</th>
                <th>Kontak</th>
                <th>Alamat</th>
                <th>Catatan</th>
                <th style={{ width: '160px', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, idx) => (
                <tr key={supplier.id}>
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
                      {supplier.code}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--ink-950)' }}>
                      {supplier.name}
                    </div>
                  </td>
                  <td>{supplier.contact || '-'}</td>
                  <td>
                    <div
                      style={{
                        maxWidth: '220px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                      title={supplier.address}
                    >
                      {supplier.address || '-'}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '12.5px', color: 'var(--ink-500)' }}>
                      {supplier.notes || '-'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="btn-icon-action"
                        onClick={() => handleOpenEdit(supplier)}
                        title="Ubah data supplier"
                      >
                        <IconEdit size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        className="btn-icon-action btn-icon-danger"
                        onClick={() => setDeleteTarget(supplier)}
                        title="Hapus supplier"
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
            <IconSuppliers size={26} />
          </div>
          <h3 className="empty-state-title">
            {searchQuery ? 'Supplier tidak ditemukan' : 'Belum ada data supplier'}
          </h3>
          <p className="empty-state-desc">
            {searchQuery
              ? `Tidak ada supplier yang cocok dengan kata kunci "${searchQuery}". Coba gunakan kata kunci lain.`
              : 'Silakan tambahkan data rekanan supplier sparepart baru untuk memulai proses pemilihan SPK.'}
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
              <span>Tambah Supplier Pertama</span>
            </button>
          )}
        </div>
      )}

      {/* Modal Form Tambah / Edit */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingSupplier ? 'Ubah Data Supplier' : 'Tambah Supplier Baru'}
      >
        {formError && (
          <div className="alert-box alert-warning" style={{ marginBottom: '16px', padding: '10px 14px' }}>
            <IconAlert size={16} />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmitForm} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="sup-code" className="form-label">
              Kode Supplier
            </label>
            <input
              id="sup-code"
              type="text"
              className="form-input"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Contoh: SUP-01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sup-name" className="form-label">
              Nama Supplier <span style={{ color: 'var(--brand-600)' }}>*</span>
            </label>
            <input
              id="sup-name"
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: PT Sumber Motor Sejahtera"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sup-contact" className="form-label">
              Nomor Kontak / WhatsApp <span style={{ color: 'var(--brand-600)' }}>*</span>
            </label>
            <input
              id="sup-contact"
              type="text"
              className="form-input"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="Contoh: 0812-3456-7890"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sup-address" className="form-label">
              Alamat Kantor / Gudang
            </label>
            <textarea
              id="sup-address"
              className="form-input"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Alamat lengkap supplier..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="sup-notes" className="form-label">
              Catatan / Spesialisasi Produk
            </label>
            <input
              id="sup-notes"
              type="text"
              className="form-input"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Contoh: Distributor resmi kampas rem dan aki"
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
              {editingSupplier ? 'Simpan Perubahan' : 'Tambahkan Supplier'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Dialog Konfirmasi Hapus */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Konfirmasi Hapus Supplier"
        maxWidth="440px"
      >
        <div>
          <p style={{ fontSize: '14px', color: 'var(--ink-700)', lineHeight: '1.5', marginBottom: '16px' }}>
            Apakah Anda yakin ingin menghapus data supplier{' '}
            <strong style={{ color: 'var(--ink-950)' }}>"{deleteTarget?.name}"</strong> ({deleteTarget?.code})?
          </p>
          <div className="alert-box alert-warning" style={{ padding: '10px 14px', marginBottom: '20px' }}>
            <IconAlert size={16} />
            <span style={{ fontSize: '12.5px' }}>
              Data penilaian terkait supplier ini pada matriks SAW juga akan dihapus secara otomatis.
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
              Ya, Hapus Supplier
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
