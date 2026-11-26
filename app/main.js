// NusaData: perute hash dan pengendali halaman. Rute:
//   #/            beranda (ringkasan)
//   #/population  penduduk
//   #/economy     ekonomi
//   #/prices      harga & inflasi
//   #/employment  ketenagakerjaan
//   #/social      sosial
//   #/provinces   provinsi
//   #/sources     sumber & metodologi
// window.__shotReady false saat halaman dirender, true sesudahnya,
// supaya skrip tangkapan layar tahu kapan memotret.

import { overview, population, economy, prices, employment, social, provinces, sources, missing } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');

const state = {
  year: 2024,
  chartType: 'bar',
  econTab: 'growth',
  provQuery: '',
  provSort: 'pop',
};

const ROUTES = [
  { path: '/', label: 'Beranda', render: overview, title: 'NusaData — Statistik Indonesia' },
  { path: '/population', label: 'Penduduk', render: population, title: 'Penduduk | NusaData' },
  { path: '/economy', label: 'Ekonomi', render: economy, title: 'Ekonomi | NusaData' },
  { path: '/prices', label: 'Harga', render: prices, title: 'Harga & Inflasi | NusaData' },
  { path: '/employment', label: 'Pekerjaan', render: employment, title: 'Ketenagakerjaan | NusaData' },
  { path: '/social', label: 'Sosial', render: social, title: 'Sosial | NusaData' },
  { path: '/provinces', label: 'Provinsi', render: provinces, title: 'Provinsi | NusaData' },
  { path: '/sources', label: 'Sumber', render: sources, title: 'Sumber & Metodologi | NusaData' },
];

function currentPath() {
  const h = location.hash.replace(/^#/, '') || '/';
  return h.startsWith('/') ? h : `/${h}`;
}

function render() {
  window.__shotReady = false;
  const path = currentPath();
  const route = ROUTES.find((r) => r.path === path);
  document.title = route ? route.title : 'Tidak ditemukan | NusaData';
  nav.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('active', `#${route ? route.path : ''}` === a.getAttribute('href'));
    if (route && a.getAttribute('href') === `#${route.path}`) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  app.innerHTML = route ? route.render(state) : missing();
  wireControls();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Semua kendali di halaman hidup di sini: pemilih tahun, pengalih grafik,
// tab ekonomi, pencarian dan pengurutan provinsi.
function wireControls() {
  const yearSel = document.getElementById('year-select');
  if (yearSel) {
    yearSel.addEventListener('change', () => {
      state.year = Number(yearSel.value);
      render();
    });
  }
  app.querySelectorAll('[data-chart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.chartType = btn.getAttribute('data-chart');
      render();
    });
  });
  app.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.econTab = btn.getAttribute('data-tab');
      render();
    });
  });
  const search = document.getElementById('prov-search');
  if (search) {
    search.addEventListener('input', () => {
      state.provQuery = search.value;
      const pos = search.selectionStart;
      render();
      const again = document.getElementById('prov-search');
      if (again) {
        again.focus();
        again.setSelectionRange(pos, pos);
      }
    });
  }
  const sort = document.getElementById('prov-sort');
  if (sort) {
    sort.addEventListener('change', () => {
      state.provSort = sort.value;
      render();
    });
  }
}

window.addEventListener('hashchange', render);
render();
