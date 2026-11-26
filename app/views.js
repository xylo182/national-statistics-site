// Tampilan tiap halaman: string HTML dari data di data.js dan grafik di charts.js.
// Semua nilai lolos lewat escape() sebelum masuk ke halaman.

import { YEARS, SERIES, SNAPSHOT_2024, AGE_GROUPS, SECTORS, PROVINCES, SOCIAL, SOURCES, fmt } from './data.js';
import { barChart, lineChart, shareBars } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const yearIdx = (y) => YEARS.indexOf(y);

function chartFor(key, type) {
  const s = SERIES[key];
  const args = { labels: YEARS.map(String), values: s.values, unit: s.unit };
  return type === 'line' ? lineChart(args) : barChart(args);
}

function sourceLine(key) {
  const s = SERIES[key];
  return `<p class="source">Sumber: ${esc(s.source)} · ${YEARS[0]}–${YEARS[YEARS.length - 1]} · Angka dibulatkan.</p>`;
}

function yearSelect(year) {
  return `<label class="year-pick">Tahun <select id="year-select" aria-label="Pilih tahun">${YEARS.map((y) => `<option value="${y}"${y === year ? ' selected' : ''}>${y}</option>`).join('')}</select></label>`;
}

function chartToggle(type) {
  return `<div class="toggle" role="group" aria-label="Jenis grafik"><button type="button" data-chart="bar" class="${type === 'bar' ? 'on' : ''}">Batang</button><button type="button" data-chart="line" class="${type === 'line' ? 'on' : ''}">Garis</button></div>`;
}

export function overview(state) {
  const i = yearIdx(state.year);
  const cards = SNAPSHOT_2024.map((k) => {
    const s = SERIES[k.key];
    const v = s.values[i];
    const shown = k.key === 'population' || k.key === 'hdi' ? fmt(v, k.key === 'hdi' ? 2 : 1) : fmt(v, 2);
    const note = state.year === 2024 ? k.note : `${esc(s.label.toLowerCase())} ${state.year}`;
    return `<article class="kpi"><p class="kpi-val">${shown}${k.key === 'population' ? ' jt' : k.key === 'hdi' ? '' : '%'}</p><p class="kpi-label">${esc(s.label)}</p><p class="kpi-note">${note}</p></article>`;
  }).join('');
  const top = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5)
    .map((p) => `<li><a href="#/provinces">${esc(p.name)}</a><span>${fmt(p.pop, 2)} jt jiwa</span></li>`).join('');
  return `<section class="hero"><p class="eyebrow">Statistik resmi · Badan Pusat Statistik (BPS)</p>
<h1>Indonesia dalam angka</h1>
<p class="lede">Penduduk, ekonomi, harga, pekerjaan, dan kondisi sosial Indonesia — angka resmi BPS 2020–2024, bisa dijelajahi per tahun dan per provinsi.</p>
<div class="hero-controls">${yearSelect(state.year)}<a class="btn" href="#/provinces">Lihat provinsi</a></div></section>
<section><h2>Potret ${state.year}</h2><div class="kpi-grid">${cards}</div>
<p class="source">Nilai kartu mengikuti tahun ${state.year} (seri BPS 2020–2024). Tahun dipilih lewat pemilih di atas; kartu 2024 adalah angka terbaru.</p></section>
<section><div class="sec-head"><h2>Pertumbuhan penduduk</h2>${chartToggle(state.chartType)}</div>
${chartFor('population', state.chartType)}${sourceLine('population')}</section>
<section class="two-col"><div><h2>Provinsi terpadat</h2><ul class="rank">${top}</ul></div>
<div><h2>Jelajahi data</h2><ul class="links">
<li><a href="#/economy">Ekonomi — PDB, ekspor, impor</a></li>
<li><a href="#/prices">Harga &amp; inflasi — 2020–2024</a></li>
<li><a href="#/employment">Ketenagakerjaan — pengangguran &amp; sektor</a></li>
<li><a href="#/social">Sosial — kemiskinan, IPM, gini</a></li>
<li><a href="#/sources">Sumber &amp; metodologi</a></li></ul></div></section>`;
}

export function population(state) {
  return `<h1>Penduduk</h1><p class="lede">Indonesia berpenduduk sekitar 281,6 juta jiwa pada pertengahan 2024 (BPS) — negara terpadat keempat di dunia.</p>
<div class="sec-head"><h2>Jumlah penduduk, ${YEARS[0]}–${YEARS[YEARS.length - 1]}</h2>${chartToggle(state.chartType)}</div>
${chartFor('population', state.chartType)}${sourceLine('population')}
<section><h2>Struktur umur 2024</h2>${shareBars(AGE_GROUPS.map((a) => ({ name: a.group, share: a.share })))}
<p class="source">Sumber: BPS, Proyeksi Penduduk. Sekitar 69% penduduk berada pada usia kerja (15–64 tahun) — bonus demografi.</p></section>
<section><h2>Lima provinsi terpadat</h2><ul class="rank">${[...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5).map((p) => `<li><a href="#/provinces">${esc(p.name)}</a><span>${fmt(p.pop, 2)} jt jiwa · ${fmt(p.density, 0)} jiwa/km²</span></li>`).join('')}</ul>
<p><a href="#/provinces">Tabel lengkap 15 provinsi terpadat &rarr;</a></p></section>`;
}

export function economy(state) {
  const tabs = [
    { id: 'growth', label: 'Pertumbuhan PDB', key: 'gdpGrowth' },
    { id: 'nominal', label: 'PDB nominal', key: 'gdpNominal' },
    { id: 'trade', label: 'Ekspor & impor', key: 'exports' },
  ];
  const tab = tabs.find((t) => t.id === state.econTab) || tabs[0];
  const s = SERIES[tab.key];
  const rows = YEARS.map((y, i) => {
    const extra = tab.id === 'trade' ? `<td>${fmt(SERIES.imports.values[i], 1)} US$ miliar</td>` : '';
    return `<tr><td>${y}</td><td>${fmt(s.values[i], tab.id === 'nominal' ? 0 : 2)} ${esc(s.unit)}</td>${extra}</tr>`;
  }).join('');
  return `<h1>Ekonomi</h1><p class="lede">PDB Indonesia 2024 sekitar Rp22.139 triliun dan tumbuh 5,03% (BPS). Ekspor 2024 mencapai US$264,7 miliar — surplus dagang sekitar US$31 miliar.</p>
<div class="tabs" role="tablist">${tabs.map((t) => `<button type="button" role="tab" data-tab="${t.id}" class="${t.id === tab.id ? 'on' : ''}">${esc(t.label)}</button>`).join('')}</div>
<div class="sec-head"><h2>${esc(tab.label)}, ${YEARS[0]}–${YEARS[YEARS.length - 1]}</h2>${chartToggle(state.chartType)}</div>
${chartFor(tab.key, state.chartType)}${sourceLine(tab.key)}
<section><h2>Tabel ${esc(tab.label.toLowerCase())}</h2>
<table class="data"><thead><tr><th>Tahun</th><th>${esc(s.label)} (${esc(s.unit)})</th>${tab.id === 'trade' ? '<th>Impor (US$ miliar)</th>' : ''}</tr></thead><tbody>${rows}</tbody></table>
<p class="source">Sumber: BPS, PDB Tahunan dan Statistik Perdagangan. ${tab.id === 'growth' ? 'Tahun 2020 minus karena pandemi COVID-19.' : ''}</p></section>`;
}

export function prices(state) {
  return `<h1>Harga &amp; inflasi</h1><p class="lede">Inflasi Desember 2024 sebesar 1,57% (y-on-y) — terendah dalam lima tahun. Lonjakan 2022 (5,51%) mengikuti kenaikan harga BBM bersubsidi.</p>
<div class="sec-head"><h2>Inflasi tahunan (Desember, y-on-y)</h2>${chartToggle(state.chartType)}</div>
${chartFor('inflation', state.chartType)}${sourceLine('inflation')}
<section><h2>Inflasi per tahun</h2><table class="data"><thead><tr><th>Tahun</th><th>Inflasi Des (%)</th><th>Catatan</th></tr></thead><tbody>
${YEARS.map((y, i) => `<tr><td>${y}</td><td>${fmt(SERIES.inflation.values[i], 2)}</td><td>${['Pandemi, permintaan lemah', 'Pemulihan bertahap', 'Kenaikan harga BBM', 'Normalisasi harga pangan', 'Terendah 5 tahun'][i]}</td></tr>`).join('')}
</tbody></table><p class="source">Sumber: BPS, Indeks Harga Konsumen (IHK). Inflasi diukur dari perubahan IHK Desember terhadap Desember tahun sebelumnya.</p></section>`;
}

export function employment(state) {
  return `<h1>Ketenagakerjaan</h1><p class="lede">Angkatan kerja Agustus 2024 sekitar 152,1 juta orang; tingkat pengangguran terbuka 4,91% — terendah sejak 2020.</p>
<div class="sec-head"><h2>Pengangguran terbuka (Agustus)</h2>${chartToggle(state.chartType)}</div>
${chartFor('unemployment', state.chartType)}${sourceLine('unemployment')}
<section><h2>Di mana orang bekerja, 2024</h2>${shareBars(SECTORS)}
<p class="source">Sumber: BPS, Sakernas Agustus 2024. Pangsa dibulatkan; “Jasa lainnya” mencakup konstruksi, transportasi, pendidikan, kesehatan, dan jasa lain.</p></section>
<section><h2>Angka kunci</h2><div class="kpi-grid">
<article class="kpi"><p class="kpi-val">${esc(SOCIAL.labourForce.value)}</p><p class="kpi-label">Angkatan kerja</p><p class="kpi-note">${esc(SOCIAL.labourForce.note)}</p></article>
<article class="kpi"><p class="kpi-val">${esc(SOCIAL.participation.value)}</p><p class="kpi-label">Partisipasi angkatan kerja</p><p class="kpi-note">${esc(SOCIAL.participation.note)}</p></article>
<article class="kpi"><p class="kpi-val">59%</p><p class="kpi-label">Pekerja informal (sekitar)</p><p class="kpi-note">BPS Sakernas, Agu 2024</p></article>
</div></section>`;
}

export function social(state) {
  return `<h1>Sosial</h1><p class="lede">Kemiskinan turun ke 8,57% pada September 2024 dan IPM naik ke 75,02 — keduanya capaian terbaik dalam lima tahun (BPS).</p>
<div class="sec-head"><h2>Kemiskinan (September)</h2>${chartToggle(state.chartType)}</div>
${chartFor('poverty', state.chartType)}${sourceLine('poverty')}
<section><h2>Indeks Pembangunan Manusia</h2>${chartFor('hdi', state.chartType)}${sourceLine('hdi')}</section>
<section><h2>Angka kunci 2024</h2><div class="kpi-grid">
<article class="kpi"><p class="kpi-val">${esc(SOCIAL.lifeExpectancy.value)}</p><p class="kpi-label">Harapan hidup</p><p class="kpi-note">${esc(SOCIAL.lifeExpectancy.note)}</p></article>
<article class="kpi"><p class="kpi-val">${esc(SOCIAL.schooling.value)}</p><p class="kpi-label">Rata-rata lama sekolah</p><p class="kpi-note">${esc(SOCIAL.schooling.note)}</p></article>
<article class="kpi"><p class="kpi-val">${esc(SOCIAL.literacy.value)}</p><p class="kpi-label">Melek huruf 15+ tahun</p><p class="kpi-note">${esc(SOCIAL.literacy.note)}</p></article>
<article class="kpi"><p class="kpi-val">${esc(SOCIAL.gini.value)}</p><p class="kpi-label">Rasio gini</p><p class="kpi-note">${esc(SOCIAL.gini.note)}</p></article>
</div><p class="source">Sumber: BPS, Susenas dan IPM 2024. Gini 0 berarti pemerataan sempurna; 1 berarti ketimpangan penuh.</p></section>`;
}

export function provinces(state) {
  const q = state.provQuery.trim().toLowerCase();
  let list = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  const sorters = {
    pop: (a, b) => b.pop - a.pop,
    name: (a, b) => a.name.localeCompare(b.name, 'id'),
    density: (a, b) => b.density - a.density,
  };
  list = [...list].sort(sorters[state.provSort] || sorters.pop);
  const rows = list.map((p) => `<tr><td>${esc(p.name)}</td><td>${esc(p.capital)}</td><td>${fmt(p.pop, 2)}</td><td>${fmt((p.pop / 281.6) * 100, 1)}%</td><td>${fmt(p.density, 0)}</td></tr>`).join('');
  return `<h1>Provinsi</h1><p class="lede">Lima belas provinsi terpadat — mencakup sekitar 87% penduduk Indonesia. Cari nama provinsi atau ibu kotanya, lalu urutkan tabelnya.</p>
<div class="prov-controls"><label>Cari provinsi <input id="prov-search" type="search" placeholder="mis. Jawa, Medan…" value="${esc(state.provQuery)}" aria-label="Cari provinsi"></label>
<label>Urutkan <select id="prov-sort" aria-label="Urutkan provinsi"><option value="pop"${state.provSort === 'pop' ? ' selected' : ''}>Penduduk terbanyak</option><option value="name"${state.provSort === 'name' ? ' selected' : ''}>Nama A–Z</option><option value="density"${state.provSort === 'density' ? ' selected' : ''}>Kepadatan tertinggi</option></select></label></div>
<p class="count" aria-live="polite">${list.length} dari ${PROVINCES.length} provinsi ditampilkan.</p>
<table class="data"><thead><tr><th>Provinsi</th><th>Ibu kota</th><th>Penduduk (jt)</th><th>Pangsa nasional</th><th>Kepadatan (jiwa/km²)</th></tr></thead>
<tbody>${rows || '<tr><td colspan="5">Tidak ada provinsi yang cocok. Coba kata lain.</td></tr>'}</tbody></table>
<p class="source">Sumber: BPS, Proyeksi Penduduk pertengahan 2024. Pangsa dihitung dari total nasional 281,6 juta jiwa. Kepadatan dibulatkan.</p>`;
}

export function sources() {
  return `<h1>Sumber &amp; metodologi</h1><p class="lede">Semua angka di situs ini berasal dari publikasi Badan Pusat Statistik (BPS). Tidak ada angka yang dikarang; yang dibulatkan ditandai begitu.</p>
<section><h2>Publikasi yang dipakai</h2><ul class="src-list">${SOURCES.map((s) => `<li><strong>${esc(s.pub)}</strong> — ${esc(s.org)}<br>${esc(s.what)}</li>`).join('')}</ul></section>
<section><h2>Bagaimana angka dibaca</h2><ul class="notes">
<li>Inflasi adalah perubahan Indeks Harga Konsumen Desember terhadap Desember tahun sebelumnya (y-on-y).</li>
<li>Pengangguran terbuka diukur tiap Agustus lewat Sakernas; kemiskinan dan gini lewat Susenas September.</li>
<li>PDB nominal memakai harga berlaku; pertumbuhan PDB memakai harga konstan 2010.</li>
<li>Angka provinsi adalah estimasi pertengahan 2024 dari proyeksi penduduk BPS, dibulatkan ke dua desimal.</li>
<li>Semua grafik digambar dari data di situs ini; tidak ada data yang diambil dari internet saat halaman dibuka.</li>
</ul></section>
<section><h2>Tentang situs ini</h2><p>NusaData adalah situs statistik independen yang menyajikan angka resmi BPS dengan tampilan sendiri. Situs ini bukan situs BPS dan tidak berafiliasi dengannya. Situs berjalan sepenuhnya dari berkas statis — tanpa pelacak, tanpa cookie, tanpa permintaan jaringan.</p></section>`;
}

export function missing() {
  return `<h1>Halaman tidak ditemukan</h1><p>Tidak ada halaman pada alamat ini. <a href="#/">Kembali ke beranda</a>.</p>`;
}
