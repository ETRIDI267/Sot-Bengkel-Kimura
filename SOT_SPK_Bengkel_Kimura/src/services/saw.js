/**
 * SAW (Simple Additive Weighting) Calculation Engine — KIMURA SPK
 * 
 * Sesuai aturan bisnis PRD.md:
 * - Kriteria Benefit: rij = xij / max(xj)
 * - Kriteria Cost: rij = min(xj) / xij
 * - Nilai Preferensi: Vi = Σ(wj × rij)
 * - Penanganan edge case: pembagian dengan nol, data kosong, bobot tidak valid.
 */

/**
 * Menghitung normalisasi dan skor preferensi SAW
 * 
 * @param {Array} suppliers - Daftar supplier aktif
 * @param {Array} criteria - Daftar kriteria aktif
 * @param {Object} assessments - Matriks penilaian { [supplierId]: { [criterionId]: number } }
 * @returns {Object} Hasil kalkulasi lengkap untuk audit dan perangkingan
 */
export function calculateSAW(suppliers, criteria, assessments) {
  // 1. Validasi Pra-Kalkulasi
  if (!suppliers || suppliers.length === 0) {
    return {
      isValid: false,
      error: 'Daftar supplier kosong. Minimal dibutuhkan 1 supplier.'
    };
  }

  if (!criteria || criteria.length === 0) {
    return {
      isValid: false,
      error: 'Daftar kriteria kosong. Minimal dibutuhkan 1 kriteria.'
    };
  }

  // Cek total bobot
  const totalWeight = criteria.reduce((sum, c) => sum + (Number(c.weight) || 0), 0);
  if (Math.abs(totalWeight - 100) > 0.001) {
    return {
      isValid: false,
      error: `Total bobot kriteria saat ini adalah ${totalWeight}%. Harus tepat 100% untuk menghitung SAW.`
    };
  }

  // 2. Pembentukan Matriks Keputusan X & Validasi Data Kosong/Nol
  const matrixX = {};
  const missingData = [];

  suppliers.forEach((s) => {
    matrixX[s.id] = {};
    criteria.forEach((c) => {
      const val = assessments?.[s.id]?.[c.id];
      const numVal = Number(val);

      if (val === undefined || val === null || val === '' || isNaN(numVal)) {
        missingData.push(`Nilai ${s.name} (${c.name}) belum diisi.`);
        matrixX[s.id][c.id] = 0;
      } else if (numVal <= 0 && c.type === 'cost') {
        missingData.push(`Nilai ${s.name} (${c.name}) bernilai 0 pada kriteria Cost (dapat menyebabkan pembagian dengan nol).`);
        matrixX[s.id][c.id] = numVal;
      } else {
        matrixX[s.id][c.id] = numVal;
      }
    });
  });

  if (missingData.length > 0) {
    return {
      isValid: false,
      error: 'Data penilaian belum lengkap atau memiliki nilai tidak valid.',
      details: missingData
    };
  }

  // 3. Ekstraksi Nilai Ekstrem (Max untuk Benefit, Min untuk Cost)
  const extremeValues = {};

  criteria.forEach((c) => {
    const columnValues = suppliers.map((s) => matrixX[s.id][c.id]);
    const maxVal = Math.max(...columnValues);
    const minVal = Math.min(...columnValues);

    extremeValues[c.id] = {
      max: maxVal,
      min: minVal,
      type: c.type
    };
  });

  // 4. Normalisasi Matriks R (rij)
  const matrixR = {};

  suppliers.forEach((s) => {
    matrixR[s.id] = {};
    criteria.forEach((c) => {
      const xij = matrixX[s.id][c.id];
      const { max, min, type } = extremeValues[c.id];
      let rij = 0;

      if (type === 'benefit') {
        // Benefit: rij = xij / max(xj)
        if (max > 0) {
          rij = xij / max;
        } else {
          rij = 0; // Penanganan edge case max = 0
        }
      } else {
        // Cost: rij = min(xj) / xij
        if (xij > 0) {
          rij = min / xij;
        } else {
          rij = 0; // Pencegahan pembagian dengan nol
        }
      }

      // Pembulatan 4 desimal untuk tampilan audit
      matrixR[s.id][c.id] = Number(rij.toFixed(4));
    });
  });

  // 5. Normalisasi Vektor Bobot W (wj = Bobot / 100)
  const normalizedWeights = {};
  criteria.forEach((c) => {
    normalizedWeights[c.id] = Number((Number(c.weight) / 100).toFixed(4));
  });

  // 6. Perkalian Terbobot & Perhitungan Nilai Preferensi Vi = Σ(wj × rij)
  const weightedMatrix = {};
  const scores = suppliers.map((s) => {
    let preferenceSum = 0;
    weightedMatrix[s.id] = {};

    criteria.forEach((c) => {
      const rij = matrixR[s.id][c.id];
      const wj = normalizedWeights[c.id];
      const weightedScore = Number((rij * wj).toFixed(4));

      weightedMatrix[s.id][c.id] = weightedScore;
      preferenceSum += weightedScore;
    });

    const finalVi = Number(preferenceSum.toFixed(4));

    return {
      supplierId: s.id,
      supplierCode: s.code,
      supplierName: s.name,
      contact: s.contact,
      address: s.address,
      scoresByCriterion: matrixX[s.id],
      normalizedByCriterion: matrixR[s.id],
      weightedByCriterion: weightedMatrix[s.id],
      finalScore: finalVi
    };
  });

  // 7. Pengurutan Ranking dari Vi Tertinggi ke Terendah
  const rankedResults = [...scores].sort((a, b) => b.finalScore - a.finalScore);
  rankedResults.forEach((item, index) => {
    item.rank = index + 1;
  });

  return {
    isValid: true,
    matrixX,
    matrixR,
    extremeValues,
    normalizedWeights,
    weightedMatrix,
    rankedResults
  };
}
