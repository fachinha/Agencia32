/**
 * MAIN.JS - AGENCIA 32 BARILOCHE
 * Lógica de inicialización, La Fija, partículas y buscador de sueños
 */

// ==========================================
// 1. LA FIJA DEL DÍA: Semilla basada en fecha
// ==========================================
(function initLaFija() {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  
  let s = seed;
  s = (s * 1664525 + 1013904223) & 0xffffffff;
  s = Math.abs(s);
  const num4 = 1000 + (s % 9000); // 4 cifras: 1000 - 9999

  let s2 = (s * 22695477 + 1) & 0xffffffff;
  s2 = Math.abs(s2);
  const num3 = 100 + (s2 % 900);  // 3 cifras: 100 - 999

  let s3 = (s2 * 1103515245 + 12345) & 0xffffffff;
  s3 = Math.abs(s3);
  const num2 = 10 + (s3 % 90);    // 2 cifras: 10 - 99

  const pad = (n, len) => String(n).padStart(len, '0');

  document.addEventListener('DOMContentLoaded', () => {
    const el4 = document.getElementById('lafija-4');
    const el3 = document.getElementById('lafija-3');
    const el2 = document.getElementById('lafija-2');
    const dateEl = document.getElementById('lafija-date');

    if (el4) el4.textContent = pad(num4, 4);
    if (el3) el3.textContent = pad(num3, 3);
    if (el2) el2.textContent = pad(num2, 2);

    if (dateEl) {
      const options = { day: '2-digit', month: 'short' };
      dateEl.textContent = d.toLocaleDateString('es-AR', options);
    }
  });
})();

// ==========================================
// 2. PARTÍCULAS HERO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const colors = ['#F07B1E', '#7FA231', '#FFB800', '#FF9E4A', '#9BCA34', '#FFFFFF'];
  const count = 24;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';

    const size = Math.floor(Math.random() * 5) + 3; // 3px a 7px
    const color = colors[i % colors.length];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 12; // 12s a 27s
    const delay = -(Math.random() * 20); // inicio desfasado
    const opacity = (Math.random() * 0.5 + 0.3).toFixed(2);

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: ${color};
      box-shadow: 0 0 ${size * 2}px ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${opacity};
    `;

    container.appendChild(p);
  }
});

// ==========================================
// 3. FABs FLOTANTES (WhatsApp y Resultados) - SIEMPRE VISIBLES
// ==========================================
(function initFabs() {
  document.addEventListener('DOMContentLoaded', () => {
    const fabs = document.querySelector('.fabs');
    if (fabs) {
      fabs.classList.add('fabs-visible');
    }
  });
})();

// ==========================================
// 4. TABLA DE LOS SUEÑOS (00 - 99)
// ==========================================
const SUENOS_DATA = [
  { num: '00', name: 'Huevos' },
  { num: '01', name: 'Agua' },
  { num: '02', name: 'Niño' },
  { num: '03', name: 'San Cono' },
  { num: '04', name: 'La Cama' },
  { num: '05', name: 'Gato' },
  { num: '06', name: 'Perro' },
  { num: '07', name: 'Revólver' },
  { num: '08', name: 'Incendio' },
  { num: '09', name: 'Arroyo' },
  { num: '10', name: 'La Leche' },
  { num: '11', name: 'Palicero' },
  { num: '12', name: 'Soldado' },
  { num: '13', name: 'La Yeta' },
  { num: '14', name: 'Borracho' },
  { num: '15', name: 'Niña Bonita' },
  { num: '16', name: 'Anillo' },
  { num: '17', name: 'Desgracia' },
  { num: '18', name: 'Sangre' },
  { num: '19', name: 'Pescado' },
  { num: '20', name: 'La Fiesta' },
  { num: '21', name: 'La Mujer' },
  { num: '22', name: 'El Loco' },
  { num: '23', name: 'Cocinero' },
  { num: '24', name: 'Caballo' },
  { num: '25', name: 'Gallina' },
  { num: '26', name: 'La Misa' },
  { num: '27', name: 'El Peine' },
  { num: '28', name: 'El Cerro' },
  { num: '29', name: 'San Pedro' },
  { num: '30', name: 'Santa Rosa' },
  { num: '31', name: 'La Luz' },
  { num: '32', name: 'Dinero' },
  { num: '33', name: 'Cristo' },
  { num: '34', name: 'La Cabeza' },
  { num: '35', name: 'Pajarito' },
  { num: '36', name: 'Manteca' },
  { num: '37', name: 'Dentista' },
  { num: '38', name: 'Aceite' },
  { num: '39', name: 'Lluvia' },
  { num: '40', name: 'El Cura' },
  { num: '41', name: 'Cucho' },
  { num: '42', name: 'Zapatilla' },
  { num: '43', name: 'Balcón' },
  { num: '44', name: 'La Cárcel' },
  { num: '45', name: 'El Vino' },
  { num: '46', name: 'Tomates' },
  { num: '47', name: 'Muerto' },
  { num: '48', name: 'Muerto que habla' },
  { num: '49', name: 'La Carne' },
  { num: '50', name: 'El Pan' },
  { num: '51', name: 'Serrucho' },
  { num: '52', name: 'Madre' },
  { num: '53', name: 'El Barco' },
  { num: '54', name: 'La Vaca' },
  { num: '55', name: 'Música' },
  { num: '56', name: 'La Caída' },
  { num: '57', name: 'Jorobado' },
  { num: '58', name: 'Ahogado' },
  { num: '59', name: 'Las Plantas' },
  { num: '60', name: 'Virgen' },
  { num: '61', name: 'Escopeta' },
  { num: '62', name: 'Inundación' },
  { num: '63', name: 'Casamiento' },
  { num: '64', name: 'Llanto' },
  { num: '65', name: 'Cazador' },
  { num: '66', name: 'Lombrices' },
  { num: '67', name: 'Víbora' },
  { num: '68', name: 'Sobrinos' },
  { num: '69', name: 'Los Vicios' },
  { num: '70', name: 'Muerto Sueño' },
  { num: '71', name: 'Excremento' },
  { num: '72', name: 'Sorpresa' },
  { num: '73', name: 'Hospital' },
  { num: '74', name: 'Gente Negra' },
  { num: '75', name: 'Payaso' },
  { num: '76', name: 'Las Llamas' },
  { num: '77', name: 'Piernas' },
  { num: '78', name: 'Ramera' },
  { num: '79', name: 'Ladrón' },
  { num: '80', name: 'La Bocha' },
  { num: '81', name: 'Las Flores' },
  { num: '82', name: 'La Pelea' },
  { num: '83', name: 'Mal Tiempo' },
  { num: '84', name: 'La Iglesia' },
  { num: '85', name: 'Linterna' },
  { num: '86', name: 'El Humo' },
  { num: '87', name: 'Los Piojos' },
  { num: '88', name: 'El Papa' },
  { num: '89', name: 'La Rata' },
  { num: '90', name: 'El Miedo' },
  { num: '91', name: 'El Pintor' },
  { num: '92', name: 'El Médico' },
  { num: '93', name: 'Enamorado' },
  { num: '94', name: 'Cementerio' },
  { num: '95', name: 'Los Anteojos' },
  { num: '96', name: 'Marido' },
  { num: '97', name: 'La Mesa' },
  { num: '98', name: 'Lavandera' },
  { num: '99', name: 'Hermanos' }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('suenosGrid');
  const input = document.getElementById('suenosSearch');
  if (!grid || !input) return;

  function renderSuenos(items) {
    if (!items.length) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:rgba(255,255,255,0.4)">No encontramos ese sueño. Intentá con otra palabra o número.</div>';
      return;
    }
    grid.innerHTML = items.map(item => `
      <div class="sueno-card">
        <span class="sueno-num">${item.num}</span>
        <span class="sueno-name">${item.name}</span>
      </div>
    `).join('');
  }

  // Render inicial
  renderSuenos(SUENOS_DATA);

  // Buscador en tiempo real
  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      renderSuenos(SUENOS_DATA);
      return;
    }
    const filtered = SUENOS_DATA.filter(item =>
      item.num.includes(q) || item.name.toLowerCase().includes(q)
    );
    renderSuenos(filtered);
  });
});

// Año dinámico en footer
document.addEventListener('DOMContentLoaded', () => {
  const yr = document.getElementById('currentYear');
  if (yr) yr.textContent = new Date().getFullYear();
});
