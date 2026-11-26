// NusaData — entri "Make the best national statistics site" (Node 22, stdlib saja).
// Situsnya berkas statis di app/ (tanpa build step, tanpa permintaan jaringan);
// program ini menyerahkannya: menyalin app/ dan screenshots/ ke /output dan
// menulis /output/dossier.json dengan pustaka make.fun yang divendor.
// Di luar grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Gagal cepat bila situsnya belum lengkap: tanpa app/index.html, dossier yang
// ditulis pun tidak akan lolos gate, jadi lebih baik berhenti di sini.
if (!existsSync(join(here, 'app', 'index.html'))) {
  throw new Error('app/index.html is missing: build the site before handing it in');
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Batas scorer (reference/gate.json): hanya text_max_bytes yang membentuk byte;
// yang lain menolak entri yang scorer tolak (lebih dari 4 tangkapan layar atau
// satu di atas 256 KiB; lebih dari 993 berkas/direktori di app/ atau 16 MiB
// berkas app/: app/ dihitung berdampingan dengan batas 1000 entri /output
// sendiri, bersama screenshots/ dan dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
