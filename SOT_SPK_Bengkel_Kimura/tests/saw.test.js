/**
 * Unit Test untuk Mesin Perhitungan SAW — KIMURA SPK
 * 
 * Pengujian matematis mencakup:
 * 1. Kasus Normal: Benefit & Cost sesuai data demo awal.
 * 2. Kasus Total Bobot Tidak Sama dengan 100%.
 * 3. Kasus Data Penilaian Kosong / Tidak Lengkap.
 * 4. Kasus Nilai Nol / Pembagian dengan Nol pada Kriteria Cost.
 */

import { calculateSAW } from '../src/services/saw.js';

function runTests() {
  console.log('=== MEMULAI UNIT TEST MESIN SAW KIMURA SPK ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. DATA UJI STANDAR
  const mockCriteria = [
    { id: 'c1', code: 'C1', name: 'Harga', type: 'cost', weight: 25 },
    { id: 'c2', code: 'C2', name: 'Kualitas', type: 'benefit', weight: 30 },
    { id: 'c3', code: 'C3', name: 'Stok', type: 'benefit', weight: 25 },
    { id: 'c4', code: 'C4', name: 'Pelayanan', type: 'benefit', weight: 20 }
  ];

  const mockSuppliers = [
    { id: 's1', code: 'SUP-01', name: 'Supplier A' },
    { id: 's2', code: 'SUP-02', name: 'Supplier B' }
  ];

  const mockAssessments = {
    s1: { c1: 80, c2: 90, c3: 85, c4: 85 },
    s2: { c1: 70, c2: 85, c3: 90, c4: 80 }
  };

  // TEST 1: Kasus Normal
  const res1 = calculateSAW(mockSuppliers, mockCriteria, mockAssessments);
  assert(res1.isValid === true, 'Test 1: Status kalkulasi normal harus valid');
  assert(res1.extremeValues.c1.min === 70, 'Test 1: Min untuk kriteria Cost C1 harus 70');
  assert(res1.extremeValues.c2.max === 90, 'Test 1: Max untuk kriteria Benefit C2 harus 90');

  // Normalisasi C1 (Cost): s1 = 70 / 80 = 0.875, s2 = 70 / 70 = 1.0
  assert(res1.matrixR.s1.c1 === 0.875, 'Test 1: Normalisasi Cost s1 harus 0.875');
  assert(res1.matrixR.s2.c1 === 1.0, 'Test 1: Normalisasi Cost s2 harus 1.0');

  // Normalisasi C2 (Benefit): s1 = 90 / 90 = 1.0, s2 = 85 / 90 = 0.9444
  assert(res1.matrixR.s1.c2 === 1.0, 'Test 1: Normalisasi Benefit s1 harus 1.0');
  assert(res1.matrixR.s2.c2 === 0.9444, 'Test 1: Normalisasi Benefit s2 harus 0.9444');

  // Skor Akhir Vi
  // s1: (0.875 * 0.25) + (1.0 * 0.3) + (0.9444 * 0.25) + (1.0 * 0.2) = 0.21875 + 0.3 + 0.2361 + 0.2 = ~0.9549
  assert(res1.rankedResults.length === 2, 'Test 1: Menghasilkan 2 ranking');
  assert(res1.rankedResults[0].rank === 1, 'Test 1: Ranking pertama memiliki nomor peringkat 1');

  // TEST 2: Kasus Total Bobot Tidak 100%
  const badCriteria = [
    { id: 'c1', code: 'C1', name: 'Harga', type: 'cost', weight: 20 },
    { id: 'c2', code: 'C2', name: 'Kualitas', type: 'benefit', weight: 30 }
  ];
  const res2 = calculateSAW(mockSuppliers, badCriteria, mockAssessments);
  assert(res2.isValid === false, 'Test 2: Total bobot 50% harus ditolak');
  assert(res2.error.includes('100%'), 'Test 2: Pesan error menyebutkan syarat 100%');

  // TEST 3: Kasus Data Penilaian Belum Lengkap
  const incompleteAssessments = {
    s1: { c1: 80, c2: 90 }, // c3 dan c4 kosong
    s2: { c1: 70, c2: 85, c3: 90, c4: 80 }
  };
  const res3 = calculateSAW(mockSuppliers, mockCriteria, incompleteAssessments);
  assert(res3.isValid === false, 'Test 3: Data tidak lengkap harus ditolak');

  // TEST 4: Kasus Nilai Nol pada Kriteria Cost
  const zeroCostAssessments = {
    s1: { c1: 0, c2: 90, c3: 85, c4: 85 }, // Nilai 0 pada Cost
    s2: { c1: 70, c2: 85, c3: 90, c4: 80 }
  };
  const res4 = calculateSAW(mockSuppliers, mockCriteria, zeroCostAssessments);
  assert(res4.isValid === false, 'Test 4: Nilai 0 pada kriteria Cost harus dicegah untuk menghindari pembagian dengan nol');

  console.log(`\n=== HASIL UNIT TEST: ${passed} LULUS, ${failed} GAGAL ===`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
