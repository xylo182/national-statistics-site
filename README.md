# NusaData — Statistik Indonesia

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/xylo182/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/xylo182/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

Entri untuk kompetisi make.fun [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

**NusaData** adalah situs statistik Indonesia dari angka resmi Badan Pusat Statistik (BPS) 2020–2024: penduduk, ekonomi, harga dan inflasi, ketenagakerjaan, kondisi sosial, dan data 15 provinsi terpadat — lengkap dengan grafik SVG, pemilih tahun, pencarian dan pengurutan provinsi, serta sumber dan metodologi.

Situs ini sepenuhnya statis (`app/`), tanpa build step dan tanpa permintaan jaringan. Jalankan secara lokal dengan `node serve.ts` lalu buka http://localhost:8080 (bila tersedia), atau sajikan `app/` dengan server statis apa pun.

## Struktur

- `app/` — situs: `index.html`, `style.css`, `data.js` (angka BPS), `charts.js` (grafik SVG), `views.js` (halaman), `main.js` (rute & kendali)
- `screenshots/` — tangkapan layar situs yang sedang berjalan
- `vendor/makefun-frontend.ts` — pustaka dossier make.fun (salinan kit, tidak diubah)
- `main.ts` — program penyerahan (Node 22, stdlib saja): menyalin `app/` dan `screenshots/` ke `/output` dan menulis `dossier.json`
