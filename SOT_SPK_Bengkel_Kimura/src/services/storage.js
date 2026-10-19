/**
 * Storage Service — KIMURA SPK
 * 
 * Abstraksi penyimpanan data untuk memfasilitasi migrasi ke API / backend
 * di masa depan (sesuai Step 2 Implementation Plan).
 */

import { DEMO_SUPPLIERS, DEMO_CRITERIA, DEMO_ASSESSMENTS } from '../data/demoData';

const STORAGE_KEYS = {
  SUPPLIERS: 'kimura_spk_suppliers_v1',
  CRITERIA: 'kimura_spk_criteria_v1',
  ASSESSMENTS: 'kimura_spk_assessments_v1',
  INITIALIZED: 'kimura_spk_initialized_v1'
};

// Fallback in-memory jika browser memblokir LocalStorage (misal Incognito ekstrem)
const memoryStore = {};

function isLocalStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

const hasLocalStorage = typeof window !== 'undefined' && isLocalStorageAvailable();

function getItem(key, defaultValue) {
  try {
    if (hasLocalStorage) {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        return JSON.parse(stored);
      }
    } else if (memoryStore[key] !== undefined) {
      return memoryStore[key];
    }
  } catch (error) {
    console.error(`Gagal membaca storage untuk key ${key}:`, error);
  }
  return defaultValue;
}

function setItem(key, value) {
  try {
    if (hasLocalStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
    memoryStore[key] = value;
    return true;
  } catch (error) {
    console.error(`Gagal menyimpan storage untuk key ${key}:`, error);
    memoryStore[key] = value;
    return false;
  }
}

export const StorageService = {
  /**
   * Cek apakah sistem sudah pernah diinisialisasi
   */
  isInitialized() {
    return !!getItem(STORAGE_KEYS.INITIALIZED, false);
  },

  /**
   * Inisialisasi awal dengan data demo jika belum ada data tersimpan
   */
  initializeDefaults() {
    if (!this.isInitialized()) {
      this.resetToDemo();
    }
  },

  /**
   * Reset seluruh data lokal kembali ke data demo bawaan
   */
  resetToDemo() {
    setItem(STORAGE_KEYS.SUPPLIERS, DEMO_SUPPLIERS);
    setItem(STORAGE_KEYS.CRITERIA, DEMO_CRITERIA);
    setItem(STORAGE_KEYS.ASSESSMENTS, DEMO_ASSESSMENTS);
    setItem(STORAGE_KEYS.INITIALIZED, true);
    return {
      suppliers: DEMO_SUPPLIERS,
      criteria: DEMO_CRITERIA,
      assessments: DEMO_ASSESSMENTS
    };
  },

  /**
   * Mengambil data Suppliers
   */
  getSuppliers() {
    return getItem(STORAGE_KEYS.SUPPLIERS, DEMO_SUPPLIERS);
  },

  /**
   * Menyimpan data Suppliers
   */
  saveSuppliers(suppliers) {
    setItem(STORAGE_KEYS.SUPPLIERS, suppliers);
    return suppliers;
  },

  /**
   * Mengambil data Criteria
   */
  getCriteria() {
    return getItem(STORAGE_KEYS.CRITERIA, DEMO_CRITERIA);
  },

  /**
   * Menyimpan data Criteria
   */
  saveCriteria(criteria) {
    setItem(STORAGE_KEYS.CRITERIA, criteria);
    return criteria;
  },

  /**
   * Mengambil data Penilaian (Assessments)
   */
  getAssessments() {
    return getItem(STORAGE_KEYS.ASSESSMENTS, DEMO_ASSESSMENTS);
  },

  /**
   * Menyimpan data Penilaian (Assessments)
   */
  saveAssessments(assessments) {
    setItem(STORAGE_KEYS.ASSESSMENTS, assessments);
    return assessments;
  },

  /**
   * Informasi metadata driver penyimpanan
   */
  getStorageMeta() {
    return {
      type: hasLocalStorage ? 'localStorage' : 'in-memory',
      isPersistent: hasLocalStorage
    };
  }
};
