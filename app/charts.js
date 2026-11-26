// Grafik SVG buatan sendiri: batang dan garis, tanpa pustaka luar.
// Setiap grafik mengembalikan string SVG yang bisa disisipkan ke halaman.

function niceMax(values) {
  const m = Math.max(...values.map(Math.abs));
  if (m <= 0) return 1;
  const pow = 10 ** Math.floor(Math.log10(m));
  return Math.ceil(m / pow) * pow;
}

function axisLabels(max, min, steps = 4) {
  const out = [];
  for (let i = 0; i <= steps; i++) out.push(min + ((max - min) * i) / steps);
  return out;
}

export function barChart({ labels, values, unit, color = '#0f766e', height = 260 }) {
  const W = 640;
  const H = height;
  const padL = 64;
  const padB = 34;
  const padT = 12;
  const min = Math.min(0, ...values);
  const max = niceMax(values);
  const plotW = W - padL - 16;
  const plotH = H - padT - padB;
  const slot = plotW / values.length;
  const bw = Math.min(52, slot * 0.62);
  const y = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  const grid = axisLabels(max, min)
    .map((t) => `<line x1="${padL}" y1="${y(t)}" x2="${W - 16}" y2="${y(t)}" stroke="#e2e8e4" stroke-width="1"/><text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#5b6b66">${t}</text>`)
    .join('');
  const bars = values
    .map((v, i) => {
      const x = padL + slot * i + (slot - bw) / 2;
      const neg = v < 0;
      const top = neg ? y(0) : y(v);
      const h = Math.max(2, Math.abs(y(v) - y(0)));
      return `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${neg ? '#b45309' : color}"><title>${labels[i]}: ${v} ${unit}</title></rect><text x="${(x + bw / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="#123c38">${v}</text><text x="${(padL + slot * i + slot / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="12" fill="#33413d">${labels[i]}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik batang ${unit}" class="chart">${grid}<line x1="${padL}" y1="${y(0)}" x2="${W - 16}" y2="${y(0)}" stroke="#94a3a8" stroke-width="1"/>${bars}</svg>`;
}

export function lineChart({ labels, values, unit, color = '#0f766e', height = 260 }) {
  const W = 640;
  const H = height;
  const padL = 64;
  const padB = 34;
  const padT = 16;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = min < 0 ? min * 1.15 : Math.max(0, min - (max - min) * 0.25);
  const hi = max + (max - lo) * 0.1;
  const plotW = W - padL - 16;
  const plotH = H - padT - padB;
  const x = (i) => padL + (plotW * i) / (values.length - 1);
  const y = (v) => padT + plotH - ((v - lo) / (hi - lo)) * plotH;
  const grid = axisLabels(hi, lo)
    .map((t) => `<line x1="${padL}" y1="${y(t)}" x2="${W - 16}" y2="${y(t)}" stroke="#e2e8e4" stroke-width="1"/><text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#5b6b66">${t.toFixed(1)}</text>`)
    .join('');
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const dots = values
    .map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4.5" fill="${color}" stroke="#fff" stroke-width="1.5"><title>${labels[i]}: ${v} ${unit}</title></circle><text x="${x(i).toFixed(1)}" y="${(y(v) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="#123c38">${v}</text>`)
    .join('');
  const xlabels = labels.map((l, i) => `<text x="${x(i).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="12" fill="#33413d">${l}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik garis ${unit}" class="chart">${grid}<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${xlabels}</svg>`;
}

// Batang horizontal sederhana untuk pangsa (mis. struktur umur, lapangan kerja).
export function shareBars(rows) {
  return rows
    .map(
      (r) => `<div class="share-row"><span class="share-name">${r.name}</span><span class="share-track"><span class="share-fill" style="width:${r.share}%"></span></span><span class="share-val">${String(r.share).replace('.', ',')}%</span></div>`,
    )
    .join('');
}
