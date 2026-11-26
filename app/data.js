// Angka-angka Indonesia dari Badan Pusat Statistik (BPS). Setiap angka
// dibulatkan secara wajar; sumber dan tahun ditulis di halaman. Nilai
// "sekitar" ditandai begitu di data dan di tampilan.

export const YEARS = [2020, 2021, 2022, 2023, 2024];

// Seri tahunan 2020-2024 (BPS). PDB nominal dalam triliun rupiah,
// ekspor/impor dalam miliar dolar AS, penduduk dalam juta jiwa.
export const SERIES = {
  population: { label: 'Penduduk', unit: 'juta jiwa', values: [270.2, 272.7, 275.8, 278.7, 281.6], source: 'BPS, Proyeksi Penduduk' },
  gdpGrowth: { label: 'Pertumbuhan PDB', unit: '% y-on-y', values: [-2.07, 3.7, 5.31, 5.05, 5.03], source: 'BPS, PDB Triwulanan' },
  gdpNominal: { label: 'PDB nominal', unit: 'Rp triliun', values: [15434, 16977, 19588, 20892, 22139], source: 'BPS, PDB Tahunan' },
  inflation: { label: 'Inflasi (Des, y-on-y)', unit: '%', values: [1.68, 1.87, 5.51, 2.61, 1.57], source: 'BPS, Indeks Harga Konsumen' },
  unemployment: { label: 'Pengangguran terbuka (Agu)', unit: '%', values: [7.07, 6.49, 5.86, 5.32, 4.91], source: 'BPS, Sakernas Agustus' },
  poverty: { label: 'Kemiskinan (Sep)', unit: '%', values: [10.19, 9.71, 9.57, 9.36, 8.57], source: 'BPS, Susenas September' },
  hdi: { label: 'Indeks Pembangunan Manusia', unit: 'skor', values: [71.94, 72.29, 73.37, 74.39, 75.02], source: 'BPS, IPM' },
  gini: { label: 'Rasio Gini (Sep)', unit: 'skor', values: [0.381, 0.38, 0.381, 0.379, 0.381], source: 'BPS, Susenas September' },
  exports: { label: 'Ekspor', unit: 'US$ miliar', values: [163.2, 231.6, 291.9, 258.8, 264.7], source: 'BPS, Statistik Perdagangan' },
  imports: { label: 'Impor', unit: 'US$ miliar', values: [141.6, 196.2, 237.4, 221.9, 233.7], source: 'BPS, Statistik Perdagangan' },
};

// Potret 2024 untuk kartu utama (nilai terbaru, BPS).
export const SNAPSHOT_2024 = [
  { key: 'population', value: '281,6 jt', note: 'penduduk pertengahan 2024' },
  { key: 'gdpGrowth', value: '5,03%', note: 'pertumbuhan PDB 2024' },
  { key: 'inflation', value: '1,57%', note: 'inflasi Des 2024 (y-on-y)' },
  { key: 'unemployment', value: '4,91%', note: 'pengangguran, Agu 2024' },
  { key: 'poverty', value: '8,57%', note: 'kemiskinan, Sep 2024' },
  { key: 'hdi', value: '75,02', note: 'IPM 2024' },
];

// Struktur umur 2024 (BPS, persen, dibulatkan).
export const AGE_GROUPS = [
  { group: '0–14 tahun', share: 23.9 },
  { group: '15–64 tahun', share: 68.7 },
  { group: '65+ tahun', share: 7.4 },
];

// Lapangan pekerjaan utama 2024, persen dari penduduk bekerja (BPS Sakernas, dibulatkan).
export const SECTORS = [
  { name: 'Pertanian', share: 28.5 },
  { name: 'Perdagangan', share: 18.8 },
  { name: 'Industri pengolahan', share: 18.2 },
  { name: 'Jasa lainnya', share: 34.5 },
];

// 15 provinsi terpadat, penduduk pertengahan 2024 (juta jiwa, BPS, dibulatkan),
// kepadatan jiwa/km² (dibulatkan) dan ibu kota provinsi.
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 49.94, density: 1412, capital: 'Bandung' },
  { name: 'Jawa Timur', pop: 41.81, density: 872, capital: 'Surabaya' },
  { name: 'Jawa Tengah', pop: 37.89, density: 1159, capital: 'Semarang' },
  { name: 'Sumatera Utara', pop: 15.59, density: 214, capital: 'Medan' },
  { name: 'Banten', pop: 12.43, density: 1288, capital: 'Serang' },
  { name: 'DKI Jakarta', pop: 10.56, density: 15904, capital: 'Jakarta' },
  { name: 'Sulawesi Selatan', pop: 9.53, density: 204, capital: 'Makassar' },
  { name: 'Lampung', pop: 9.22, density: 267, capital: 'Bandar Lampung' },
  { name: 'Sumatera Selatan', pop: 9.03, density: 99, capital: 'Palembang' },
  { name: 'Riau', pop: 6.85, density: 79, capital: 'Pekanbaru' },
  { name: 'Sumatera Barat', pop: 5.76, density: 137, capital: 'Padang' },
  { name: 'Kalimantan Barat', pop: 5.76, density: 39, capital: 'Pontianak' },
  { name: 'Nusa Tenggara Timur', pop: 5.66, density: 117, capital: 'Kupang' },
  { name: 'Kalimantan Timur', pop: 4.06, density: 32, capital: 'Samarinda' },
  { name: 'DI Yogyakarta', pop: 3.75, density: 1196, capital: 'Yogyakarta' },
];

// Fakta sosial 2024 (BPS, dibulatkan).
export const SOCIAL = {
  lifeExpectancy: { value: '74,1 thn', note: 'angka harapan hidup 2024' },
  schooling: { value: '9,0 thn', note: 'rata-rata lama sekolah 2024' },
  literacy: { value: '97,5%', note: 'angka melek huruf 15+ thn, 2024' },
  gini: { value: '0,381', note: 'rasio gini, Sep 2024' },
  labourForce: { value: '152,1 jt', note: 'angkatan kerja, Agu 2024' },
  participation: { value: '70,8%', note: 'tingkat partisipasi angkatan kerja, Agu 2024' },
};

export const SOURCES = [
  { pub: 'Statistik Indonesia 2025', org: 'BPS', what: 'Penduduk, PDB, perdagangan, dan indikator sosial utama.' },
  { pub: 'Proyeksi Penduduk Indonesia 2020–2050', org: 'BPS', what: 'Estimasi penduduk pertengahan tahun per provinsi.' },
  { pub: 'Berita Resmi Statistik: PDB, Inflasi, Ketenagakerjaan', org: 'BPS', what: 'Rilis triwulanan dan tahunan angka resmi.' },
  { pub: 'Survei Sosial Ekonomi Nasional (Susenas)', org: 'BPS', what: 'Kemiskinan, gini, dan kondisi sosial rumah tangga.' },
  { pub: 'Survei Angkatan Kerja Nasional (Sakernas)', org: 'BPS', what: 'Pengangguran, angkatan kerja, dan lapangan pekerjaan.' },
  { pub: 'Indeks Pembangunan Manusia 2024', org: 'BPS', what: 'IPM, harapan hidup, dan lama sekolah.' },
];

export function fmt(n, digits = 1) {
  return Number(n).toLocaleString('id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
