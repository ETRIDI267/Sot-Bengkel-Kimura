import React, { createContext, useContext, useState } from 'react';
import { StorageService } from '../services/storage';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  // Inisialisasi awal
  const [suppliers, setSuppliersState] = useState(() => {
    StorageService.initializeDefaults();
    return StorageService.getSuppliers();
  });

  const [criteria, setCriteriaState] = useState(() => {
    return StorageService.getCriteria();
  });

  const [assessments, setAssessmentsState] = useState(() => {
    return StorageService.getAssessments();
  });

  const [storageMeta] = useState(() => StorageService.getStorageMeta());

  // Helper untuk update state dan persistensi
  const setSuppliers = (newSuppliers) => {
    const updated = typeof newSuppliers === 'function' ? newSuppliers(suppliers) : newSuppliers;
    setSuppliersState(updated);
    StorageService.saveSuppliers(updated);
  };

  const setCriteria = (newCriteria) => {
    const updated = typeof newCriteria === 'function' ? newCriteria(criteria) : newCriteria;
    setCriteriaState(updated);
    StorageService.saveCriteria(updated);
  };

  const setAssessments = (newAssessments) => {
    const updated = typeof newAssessments === 'function' ? newAssessments(assessments) : newAssessments;
    setAssessmentsState(updated);
    StorageService.saveAssessments(updated);
  };

  // ======================= CRUD SUPPLIERS =======================
  const addSupplier = (supplierData) => {
    const newId = `sup-${Date.now()}`;
    const newSupplier = {
      id: newId,
      code: supplierData.code || `SUP-${String(suppliers.length + 1).padStart(2, '0')}`,
      name: supplierData.name.trim(),
      contact: supplierData.contact.trim(),
      address: supplierData.address.trim(),
      notes: supplierData.notes ? supplierData.notes.trim() : ''
    };

    const updatedSuppliers = [...suppliers, newSupplier];
    setSuppliers(updatedSuppliers);

    // Inisialisasi nilai assessment default untuk supplier baru
    const updatedAssessments = { ...assessments };
    updatedAssessments[newId] = {};
    criteria.forEach((crit) => {
      updatedAssessments[newId][crit.id] = 75; // Nilai default awal
    });
    setAssessments(updatedAssessments);

    return newSupplier;
  };

  const updateSupplier = (id, supplierData) => {
    const updatedSuppliers = suppliers.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          code: supplierData.code || s.code,
          name: supplierData.name.trim(),
          contact: supplierData.contact.trim(),
          address: supplierData.address.trim(),
          notes: supplierData.notes ? supplierData.notes.trim() : ''
        };
      }
      return s;
    });
    setSuppliers(updatedSuppliers);
  };

  const deleteSupplier = (id) => {
    const updatedSuppliers = suppliers.filter((s) => s.id !== id);
    setSuppliers(updatedSuppliers);

    // Bersihkan data penilaian untuk supplier yang dihapus
    const updatedAssessments = { ...assessments };
    delete updatedAssessments[id];
    setAssessments(updatedAssessments);
  };

  // ======================= CRUD CRITERIA =======================
  const addCriterion = (criterionData) => {
    const newId = `crit-${Date.now()}`;
    const newCriterion = {
      id: newId,
      code: criterionData.code || `C${criteria.length + 1}`,
      name: criterionData.name.trim(),
      type: criterionData.type || 'benefit',
      weight: Number(criterionData.weight) || 0,
      description: criterionData.description ? criterionData.description.trim() : ''
    };

    const updatedCriteria = [...criteria, newCriterion];
    setCriteria(updatedCriteria);

    // Inisialisasi assessment untuk kriteria baru di setiap supplier
    const updatedAssessments = { ...assessments };
    suppliers.forEach((sup) => {
      if (!updatedAssessments[sup.id]) {
        updatedAssessments[sup.id] = {};
      }
      updatedAssessments[sup.id][newId] = 75; // Nilai default awal
    });
    setAssessments(updatedAssessments);

    return newCriterion;
  };

  const updateCriterion = (id, criterionData) => {
    const updatedCriteria = criteria.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          code: criterionData.code || c.code,
          name: criterionData.name.trim(),
          type: criterionData.type || c.type,
          weight: Number(criterionData.weight) >= 0 ? Number(criterionData.weight) : c.weight,
          description: criterionData.description ? criterionData.description.trim() : ''
        };
      }
      return c;
    });
    setCriteria(updatedCriteria);
  };

  const deleteCriterion = (id) => {
    const updatedCriteria = criteria.filter((c) => c.id !== id);
    setCriteria(updatedCriteria);

    // Bersihkan nilai kriteria ini dari seluruh supplier
    const updatedAssessments = { ...assessments };
    Object.keys(updatedAssessments).forEach((supId) => {
      if (updatedAssessments[supId] && updatedAssessments[supId][id] !== undefined) {
        delete updatedAssessments[supId][id];
      }
    });
    setAssessments(updatedAssessments);
  };

  // ======================= BOBOT (WEIGHTS) HELPER =======================
  const saveAllWeights = (weightsMap) => {
    const updatedCriteria = criteria.map((c) => {
      if (weightsMap[c.id] !== undefined) {
        return {
          ...c,
          weight: Number(weightsMap[c.id]) || 0
        };
      }
      return c;
    });
    setCriteria(updatedCriteria);
  };

  // ======================= PENILAIAN (ASSESSMENTS) HELPER =======================
  const updateAssessmentCell = (supplierId, criterionId, score) => {
    const numericScore = score === '' ? '' : Math.max(0, Math.min(100, Number(score) || 0));
    const updated = {
      ...assessments,
      [supplierId]: {
        ...(assessments[supplierId] || {}),
        [criterionId]: numericScore
      }
    };
    setAssessments(updated);
  };

  const saveMatrixAssessments = (newMatrix) => {
    setAssessments(newMatrix);
  };

  const resetDataToDemo = () => {
    const data = StorageService.resetToDemo();
    setSuppliersState(data.suppliers);
    setCriteriaState(data.criteria);
    setAssessmentsState(data.assessments);
  };

  // Ringkasan status data
  const totalCriteriaWeight = criteria.reduce((sum, c) => sum + (Number(c.weight) || 0), 0);
  const isWeightsValid = Math.abs(totalCriteriaWeight - 100) < 0.001;

  // Verifikasi kelengkapan penilaian supplier
  const checkSupplierCompleteness = (supplierId) => {
    if (!criteria.length) return false;
    const supValues = assessments[supplierId] || {};
    return criteria.every((crit) => {
      const val = supValues[crit.id];
      return typeof val === 'number' && !isNaN(val) && val > 0;
    });
  };

  const completeSuppliersCount = suppliers.filter((s) => checkSupplierCompleteness(s.id)).length;
  const isAllAssessmentsComplete = suppliers.length > 0 && completeSuppliersCount === suppliers.length;

  const value = {
    suppliers,
    setSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    criteria,
    setCriteria,
    addCriterion,
    updateCriterion,
    deleteCriterion,
    saveAllWeights,
    assessments,
    setAssessments,
    updateAssessmentCell,
    saveMatrixAssessments,
    checkSupplierCompleteness,
    completeSuppliersCount,
    isAllAssessmentsComplete,
    resetDataToDemo,
    storageMeta,
    totalCriteriaWeight,
    isWeightsValid
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useAppData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useAppData must be used within a DataProvider');
  }
  return context;
}
