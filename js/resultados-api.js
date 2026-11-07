/**
 * RESULTADOS EN VIVO - AGENCIA 32 BARILOCHE
 * Conexión en tiempo real con API oficial Downtack / Loterías
 */

const API_URL = 'https://nodo2.downtack.com/mpala/loterias.json';
const RV_REFRESH_MS = 5 * 60 * 1000;

// Paleta de colores para cada lotería
const RV_PAL = {
  'rio-negro':   { color: '#4EA8FF', bg: 'rgba(0,87,168,.25)',   border: 'rgba(0,87,168,.6)',   tab: '#0057A8' },
  'ciudad':      { color: '#FF7070', bg: 'rgba(232,25,44,.2)',   border: 'rgba(232,25,44,.5)',  tab: '#E8192C' },
  'buenos-aires':{ color: '#FFD060', bg: 'rgba(255,184,0,.2)',  border: 'rgba(255,184,0,.5)',  tab: '#FFB800' },
  'neuquen':     { color: '#5DE89E', bg: 'rgba(127,162,49,.2)',  border: 'rgba(127,162,49,.5)', tab: '#7FA231' },
};
const RV_DEF = { color: '#F07B1E', bg: 'rgba(240,123,30,.2)', border: 'rgba(240,123,30,.5)', tab: '#F07B1E' };

let rvData = null;
let rvTabIdx = 0;
let rvTurnoId = null;
let rvTurnoOrden = null;
let rvTimer = null;
let rvLoaded = false;
let rvLockedId = null;

function rvFmtFecha(str) {
  if (!str) return '';
  try {
    const [d, m, y] = str.split('-');
    if (d && m && y) return `${d}/${m}/${y}`;
  } catch (e) {}
  return str;
}

function rvRenderContent() {
  const body = document.getElementById('rv-body');
  if (!body || !rvData) return;

  const quinielas = [...(rvData.data || [])].sort((a, b) =>
    a.id === 'rio-negro' ? -1 : b.id === 'rio-negro' ? 1 : 0
  );

  const quin = rvLockedId
    ? quinielas.find(q => q.id === rvLockedId)
    : quinielas[rvTabIdx];

  if (!quin) return;
  const pal = RV_PAL[quin.id] || RV_DEF;
  const jugadas = quin.jugadas || [];

  if (!rvTurnoId) {
    let best = jugadas[0];
    for (const j of jugadas) {
      const so = (j.sorteos || [])[0];
      const bso = (best.sorteos || [])[0];
      if (so && bso && (so.fechaOrden > bso.fechaOrden ||
         (so.fechaOrden === bso.fechaOrden && j.orden > best.orden))) {
        best = j;
      }
    }
    rvTurnoId = best ? best.id : jugadas[0]?.id;
  }

  const chips = jugadas.map(j => {
    const so = (j.sorteos || [])[0];
    const hoy = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const dot = so?.fechaOrden === hoy ? ' ●' : '';
    return `<button class="rv-turno-chip${j.id === rvTurnoId ? ' active' : ''}"
      onclick="rvSetTurno('${j.id}')">${j.nombre}${dot}</button>`;
  }).join('');
  
  const turnosContainer = document.getElementById('rv-turnos');
  if (turnosContainer) turnosContainer.innerHTML = chips;

  const jugada = jugadas.find(j => j.id === rvTurnoId) || jugadas[0];
  const sorteo = (jugada?.sorteos || [])[0];
  const nums = sorteo?.numeros || [];

  if (!sorteo || !nums.length) {
    body.innerHTML = '<div class="rv-error">Sin datos cargados para este turno en este momento.</div>';
    return;
  }

  const p1 = nums[0];
  const resto = nums.slice(1);
  const grid = resto.map((n, i) => {
    const cls = i < 1 ? 'top2' : i < 4 ? 'top5' : '';
    return `<div class="rv-num-cell ${cls}">
      <div class="rv-num-pos">${n.posicion}°</div>
      <div class="rv-num-val">${n.numero}</div>
    </div>`;
  }).join('');

  body.innerHTML = `
    <div class="rv-fecha-chip">📅 Extracto Oficial: ${rvFmtFecha(sorteo.fecha)}</div>
    <div class="rv-primer-premio"
      style="--rv-accent-bg:${pal.bg};--rv-accent-border:${pal.border};--rv-accent-color:${pal.color}">
      <div class="rv-pp-badge">1er<br>premio</div>
      <div>
        <div class="rv-pp-num">${p1.numero}</div>
        <div class="rv-pp-sub">${quin.nombre} · ${jugada.nombre}</div>
      </div>
      ${sorteo.letras ? `<div class="rv-pp-letras" title="Letras">${sorteo.letras}</div>` : ''}
    </div>
    <div class="rv-grid">${grid}</div>`;
}

function rvRenderTabs() {
  const el = document.getElementById('rv-tabs');
  if (!el || !rvData) return;
  if (rvLockedId) {
    el.innerHTML = '';
    el.style.display = 'none';
    return;
  }
  el.style.display = 'flex';
  const qs = [...(rvData.data || [])].sort((a, b) =>
    a.id === 'rio-negro' ? -1 : b.id === 'rio-negro' ? 1 : 0
  );
  el.innerHTML = qs.map((q, i) => {
    const pal = RV_PAL[q.id] || RV_DEF;
    const label = q.nombre.replace('Quiniela ', '').replace('Nacional', 'Ciudad');
    const active = i === rvTabIdx;
    return `<button class="rv-tab${active ? ' active' : ''}"
      style="${active ? `--rv-tab-color:${pal.tab}` : ''}"
      onclick="rvSetTab(${i})">${label}</button>`;
  }).join('');
}

function rvSetTab(idx) {
  rvTabIdx = idx;
  const qs = [...(rvData.data || [])].sort((a, b) =>
    a.id === 'rio-negro' ? -1 : b.id === 'rio-negro' ? 1 : 0
  );
  const jugadas = (qs[idx] || {}).jugadas || [];
  if (rvTurnoOrden !== null) {
    const match = jugadas.find(j => j.orden === rvTurnoOrden);
    rvTurnoId = match ? match.id : null;
  } else {
    rvTurnoId = null;
  }
  rvRenderTabs();
  rvRenderContent();
}

function rvSetTurno(id) {
  rvTurnoId = id;
  const qs = [...(rvData.data || [])].sort((a, b) =>
    a.id === 'rio-negro' ? -1 : b.id === 'rio-negro' ? 1 : 0
  );
  const jugadas = (qs[rvTabIdx] || {}).jugadas || [];
  const j = jugadas.find(j => j.id === id);
  if (j) rvTurnoOrden = j.orden;
  rvRenderContent();
}

async function rvFetch(force) {
  const body = document.getElementById('rv-body');
  const upd = document.getElementById('rv-update-txt');
  if (!body) return;

  if (!rvLoaded) {
    body.innerHTML = `
      <div class="rv-skel-pp"></div>
      <div class="rv-skel-grid">${Array(19).fill('<div class="rv-skel-cell"></div>').join('')}</div>`;
  }

  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    rvData = await res.json();
    rvLoaded = true;
    if (!force) {
      rvTabIdx = 0;
      rvTurnoId = null;
    }
    rvRenderTabs();
    rvRenderContent();
    const now = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    if (upd) upd.textContent = 'Actualizado ' + now;
  } catch (err) {
    console.warn('Error al cargar resultados:', err);
    if (!rvLoaded) {
      body.innerHTML = `
        <div class="rv-error">
          ⚠️ No se pudo conectar con el servidor oficial de resultados.<br>
          <button class="rv-retry" onclick="rvFetch(false)">↻ Reintentar</button>
        </div>`;
    }
    if (upd) upd.textContent = 'Sin conexión';
  }
}

function rvOpen() {
  const o = document.getElementById('rv-overlay');
  if (!o) return;
  rvLockedId = null;
  o.classList.add('open');
  document.body.style.overflow = 'hidden';

  const titleEl = document.querySelector('.rv-title');
  if (titleEl) {
    titleEl.innerHTML = 'Resultados en Vivo <span style="color:var(--orange-light);font-size:.7em">· Agencia 32 Bariloche</span>';
  }

  rvFetch(false);
  clearInterval(rvTimer);
  rvTimer = setInterval(() => rvFetch(true), RV_REFRESH_MS);
}

function rvOpenLocked(quinielaId) {
  const o = document.getElementById('rv-overlay');
  if (!o) return;
  rvLockedId = quinielaId;
  rvTurnoId = null;
  rvTurnoOrden = null;
  o.classList.add('open');
  document.body.style.overflow = 'hidden';

  const titleEl = document.querySelector('.rv-title');
  if (titleEl) {
    titleEl.innerHTML = 'La Rionegrina <span style="color:var(--orange-light);font-size:.7em">· Agencia 32 Bariloche</span>';
  }

  rvFetch(false);
  clearInterval(rvTimer);
  rvTimer = setInterval(() => rvFetch(true), RV_REFRESH_MS);
}

function rvClose() {
  const o = document.getElementById('rv-overlay');
  if (!o) return;
  o.classList.remove('open');
  document.body.style.overflow = '';
  rvLockedId = null;
  clearInterval(rvTimer);
}

document.addEventListener('DOMContentLoaded', () => {
  const o = document.getElementById('rv-overlay');
  const cl = document.getElementById('rv-close');
  if (cl) cl.addEventListener('click', rvClose);
  if (o) o.addEventListener('click', (e) => {
    if (e.target === o) rvClose();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') rvClose();
  });
});

window.rvOpen = rvOpen;
window.rvOpenLocked = rvOpenLocked;
window.rvClose = rvClose;
window.rvSetTab = rvSetTab;
window.rvSetTurno = rvSetTurno;
window.rvFetch = rvFetch;
