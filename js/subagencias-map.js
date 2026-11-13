/**
 * MAPA INTERACTIVO DE SUBAGENCIAS - AGENCIA OFICIAL N°32 BARILOCHE
 * 23 Subagencias Oficiales + Sede Central (Esandi 15)
 * Implementado con Leaflet.js + OpenStreetMap / CartoDB Voyager
 */

const SUBAGENCIAS_DATA = [
  {
    id: 0,
    nombre: "Agencia Oficial N°32 (Sede Central)",
    direccion: "Esandi 15",
    zona: "este",
    zonaLabel: "Sede Central · Este",
    lat: -41.132920,
    lng: -71.284033,
    isHQ: true
  },
  {
    id: 1,
    nombre: "Tabaquería Emporio 69",
    direccion: "Mitre 295",
    zona: "centro",
    zonaLabel: "Centro",
    lat: -41.134008,
    lng: -71.305609
  },
  {
    id: 2,
    nombre: "Kiosco La Parada",
    direccion: "Moreno 340",
    zona: "centro",
    zonaLabel: "Centro",
    lat: -41.134993,
    lng: -71.305089
  },
  {
    id: 3,
    nombre: "Kiosco Punto Sur",
    direccion: "Elflein 78",
    zona: "centro",
    zonaLabel: "Centro",
    lat: -41.135732,
    lng: -71.308954
  },
  {
    id: 4,
    nombre: "Multirubro Klasse",
    direccion: "Gallardo 25",
    zona: "centro",
    zonaLabel: "Centro",
    lat: -41.136836,
    lng: -71.309953
  },
  {
    id: 5,
    nombre: "Kiosco Raihue",
    direccion: "Avenida San Martín 127",
    zona: "centro",
    zonaLabel: "Centro",
    lat: -41.134338,
    lng: -71.311834
  },
  {
    id: 6,
    nombre: "Kiosco Daika II",
    direccion: "Avenida San Martín 297",
    zona: "centro",
    zonaLabel: "Centro",
    lat: -41.133913,
    lng: -71.314026
  },
  {
    id: 7,
    nombre: "Multirubro Polo",
    direccion: "Salta 188",
    zona: "centro",
    zonaLabel: "Centro",
    lat: -41.134823,
    lng: -71.312907
  },
  {
    id: 8,
    nombre: "Kiosco La Botica",
    direccion: "Vice Alte. O'Connor 760",
    zona: "centro",
    zonaLabel: "Centro",
    lat: -41.133468,
    lng: -71.298738
  },
  {
    id: 9,
    nombre: "Kiosco Luján",
    direccion: "Vice Alte. O'Connor 899",
    zona: "centro",
    zonaLabel: "Centro",
    lat: -41.133831,
    lng: -71.296692
  },
  {
    id: 10,
    nombre: "Kiosco Suyoi",
    direccion: "Elordi 444",
    zona: "centro",
    zonaLabel: "Macrocentro",
    lat: -41.137688,
    lng: -71.295923
  },
  {
    id: 11,
    nombre: "Kiosco Jorgito",
    direccion: "Diagonal Capraro 1141",
    zona: "centro",
    zonaLabel: "Macrocentro",
    lat: -41.135570,
    lng: -71.293648
  },
  {
    id: 12,
    nombre: "Multirubro Rima",
    direccion: "Beschedt 1037",
    zona: "alto",
    zonaLabel: "El Alto",
    lat: -41.143025,
    lng: -71.304321
  },
  {
    id: 13,
    nombre: "Kiosco De la Montaña",
    direccion: "La Paz 820",
    zona: "alto",
    zonaLabel: "El Alto",
    lat: -41.152848,
    lng: -71.301416
  },
  {
    id: 14,
    nombre: "Despensa MeMe",
    direccion: "Pasaje Gutiérrez 3191",
    zona: "alto",
    zonaLabel: "El Alto · Sur",
    lat: -41.160344,
    lng: -71.317451
  },
  {
    id: 15,
    nombre: "Kiosco Julieta",
    direccion: "Pasaje Gutiérrez 3443",
    zona: "alto",
    zonaLabel: "El Alto · Sur",
    lat: -41.159807,
    lng: -71.318333
  },
  {
    id: 16,
    nombre: "Despensa M&M",
    direccion: "José Obrero 139",
    zona: "alto",
    zonaLabel: "El Alto · Sur",
    lat: -41.167346,
    lng: -71.312593
  },
  {
    id: 17,
    nombre: "Kiosco M3",
    direccion: "Campichuelo 1144",
    zona: "kms",
    zonaLabel: "Melipal · Oeste",
    lat: -41.142085,
    lng: -71.319745
  },
  {
    id: 18,
    nombre: "Kiosco Rocinante",
    direccion: "Avenida Pioneros 3811",
    zona: "kms",
    zonaLabel: "Km 3.8 · Pioneros",
    lat: -41.132292,
    lng: -71.354929
  },
  {
    id: 19,
    nombre: "Kiosco Otto",
    direccion: "Avenida Pioneros 4400",
    zona: "kms",
    zonaLabel: "Km 4.4 · Pioneros",
    lat: -41.131410,
    lng: -71.361761
  },
  {
    id: 20,
    nombre: "Multirubro Maiten II",
    direccion: "Avenida Pioneros 4916",
    zona: "kms",
    zonaLabel: "Km 4.9 · Pioneros",
    lat: -41.130201,
    lng: -71.368663
  },
  {
    id: 21,
    nombre: "Multirubro Multi 13",
    direccion: "Avenida Bustillo 13144",
    zona: "kms",
    zonaLabel: "Km 13.1 · Bustillo",
    lat: -41.099813,
    lng: -71.446550
  },
  {
    id: 22,
    nombre: "Kiosco El Hada",
    direccion: "Calle 12 13650 · B° 2 de Agosto",
    zona: "kms",
    zonaLabel: "Km 13.6 · 2 de Agosto",
    lat: -41.104084,
    lng: -71.458257
  },
  {
    id: 23,
    nombre: "Autoservicio La Nono",
    direccion: "José Hernández 288",
    zona: "este",
    zonaLabel: "Zona Este",
    lat: -41.133600,
    lng: -71.268705
  }
];

(function() {
  let map = null;
  let markersLayer = null;
  const markersById = {};
  let currentZone = 'all';
  let currentSearch = '';
  let activeId = null;

  function getGoogleMapsUrl(item) {
    const q = encodeURIComponent(`${item.direccion}, San Carlos de Bariloche, Río Negro, Argentina`);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }

  function createCustomIcon(isHQ, isSelected) {
    const size = isHQ ? 42 : (isSelected ? 38 : 32);
    const bgColor = isHQ ? '#F07B1E' : (isSelected ? '#9BCA34' : '#7FA231');
    const borderColor = isHQ ? '#FFF3CC' : '#FFFFFF';
    const pulseClass = isHQ ? 'sub-pin-hq' : (isSelected ? 'sub-pin-active' : '');

    const innerSvg = isHQ
      ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="#FFFFFF"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
      : `<svg viewBox="0 0 24 24" width="15" height="15" fill="#FFFFFF"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>`;

    const html = `
      <div class="sub-map-pin ${pulseClass}" style="--pin-bg:${bgColor}; --pin-border:${borderColor}; width:${size}px; height:${size}px;">
        <div class="sub-map-pin-head">
          ${innerSvg}
        </div>
        <div class="sub-map-pin-tip"></div>
      </div>
    `;

    return L.divIcon({
      className: 'sub-custom-div-icon',
      html: html,
      iconSize: [size, size + 10],
      iconAnchor: [size / 2, size + 8],
      popupAnchor: [0, -(size + 4)]
    });
  }

  function buildPopupHtml(item) {
    const gmapsUrl = getGoogleMapsUrl(item);
    const badgeClass = item.isHQ ? 'sub-popup-badge-hq' : 'sub-popup-badge';
    return `
      <div class="sub-popup-card">
        <span class="${badgeClass}">${item.zonaLabel}</span>
        <div class="sub-popup-title">${item.nombre}</div>
        <div class="sub-popup-addr">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <span>${item.direccion} · Bariloche</span>
        </div>
        ${item.distanceKm !== undefined ? `<div class="sub-popup-dist">A ${item.distanceKm < 1 ? Math.round(item.distanceKm * 1000) + ' m' : item.distanceKm.toFixed(1) + ' km'} de tu ubicación</div>` : ''}
        <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" class="sub-popup-btn">
          <span>Cómo llegar en Google Maps</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
        </a>
      </div>
    `;
  }

  function getFilteredData() {
    const q = currentSearch.trim().toLowerCase();
    return SUBAGENCIAS_DATA.filter(item => {
      const matchZone = currentZone === 'all' || item.zona === currentZone;
      const matchSearch = !q ||
        item.nombre.toLowerCase().includes(q) ||
        item.direccion.toLowerCase().includes(q) ||
        item.zonaLabel.toLowerCase().includes(q);
      return matchZone && matchSearch;
    });
  }

  function renderMarkers(filtered, fitBounds = false) {
    if (!map || !markersLayer) return;
    markersLayer.clearLayers();

    const bounds = [];
    filtered.forEach(item => {
      const isSelected = item.id === activeId;
      const marker = L.marker([item.lat, item.lng], {
        icon: createCustomIcon(item.isHQ, isSelected),
        zIndexOffset: item.isHQ ? 1000 : (isSelected ? 500 : 0)
      });

      marker.bindPopup(buildPopupHtml(item), {
        maxWidth: 280,
        className: 'sub-leaflet-popup'
      });

      marker.on('click', () => {
        selectSubagencia(item.id, false);
      });

      markersLayer.addLayer(marker);
      markersById[item.id] = marker;
      bounds.push([item.lat, item.lng]);
    });

    if (fitBounds && bounds.length > 0) {
      if (bounds.length === 1) {
        map.flyTo(bounds[0], 16, { duration: 0.8 });
      } else {
        map.flyToBounds(bounds, { padding: [42, 42], maxZoom: 15, duration: 0.8 });
      }
    }
  }

  function renderDirectoryList(filtered) {
    const listEl = document.getElementById('subagenciasList');
    const countEl = document.getElementById('subagenciasCount');
    if (!listEl) return;

    if (countEl) {
      countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'punto disponible' : 'puntos disponibles'}`;
    }

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="sub-empty-state">
          <div>No encontramos subagencias con esa búsqueda.</div>
          <button type="button" class="sub-reset-link" id="subEmptyResetBtn">Ver todas las subagencias</button>
        </div>
      `;
      const resetBtn = document.getElementById('subEmptyResetBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          resetFilters();
        });
      }
      return;
    }

    listEl.innerHTML = filtered.map(item => {
      const isSelected = item.id === activeId;
      const gmapsUrl = getGoogleMapsUrl(item);
      const distBadge = item.distanceKm !== undefined
        ? `<span class="sub-item-dist">${item.distanceKm < 1 ? Math.round(item.distanceKm * 1000) + ' m' : item.distanceKm.toFixed(1) + ' km'}</span>`
        : '';

      return `
        <div class="sub-list-card ${item.isHQ ? 'is-hq' : ''} ${isSelected ? 'active' : ''}" data-sub-id="${item.id}">
          <div class="sub-list-card-main">
            <div class="sub-list-top">
              <span class="sub-list-zone ${item.isHQ ? 'zone-hq' : ''}">${item.zonaLabel}</span>
              ${distBadge}
            </div>
            <h3 class="sub-list-name">${item.nombre}</h3>
            <div class="sub-list-addr">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>${item.direccion}</span>
            </div>
          </div>
          <div class="sub-list-actions">
            <button type="button" class="sub-btn-locate" title="Ubicar en el mapa" aria-label="Ver ${item.nombre} en el mapa">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
            </button>
            <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" class="sub-btn-gmaps" title="Abrir GPS en Google Maps" aria-label="Cómo llegar a ${item.nombre}" onclick="event.stopPropagation();">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.sub-list-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.getAttribute('data-sub-id'), 10);
        selectSubagencia(id, true);
      });
    });
  }

  function selectSubagencia(id, panMap = true) {
    activeId = id;
    const item = SUBAGENCIAS_DATA.find(s => s.id === id);
    if (!item) return;

    // Highlight card in list
    const listEl = document.getElementById('subagenciasList');
    if (listEl) {
      listEl.querySelectorAll('.sub-list-card').forEach(c => {
        const cid = parseInt(c.getAttribute('data-sub-id'), 10);
        c.classList.toggle('active', cid === id);
      });

      if (!panMap) {
        const activeCard = listEl.querySelector(`.sub-list-card[data-sub-id="${id}"]`);
        if (activeCard) {
          activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    if (panMap && map) {
      map.flyTo([item.lat, item.lng], 16, { duration: 0.75 });
      const marker = markersById[id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 350);
      }

      // On mobile screens, scroll smoothly to the map container so the user sees the pin
      if (window.innerWidth < 992) {
        const mapWrap = document.getElementById('subagenciasMapWrap');
        if (mapWrap) {
          const y = mapWrap.getBoundingClientRect().top + window.scrollY - 95;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }
  }

  function resetFilters() {
    currentZone = 'all';
    currentSearch = '';
    activeId = null;

    const searchInput = document.getElementById('subSearchInput');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.sub-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-zone') === 'all');
    });

    const filtered = getFilteredData();
    renderDirectoryList(filtered);
    renderMarkers(filtered, true);
  }

  // Haversine formula in km
  function calcDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function findNearestSubagencia() {
    const geoBtn = document.getElementById('subNearestBtn');
    if (!navigator.geolocation) {
      alert('Tu navegador no permite obtener la ubicación actual.');
      return;
    }

    if (geoBtn) {
      geoBtn.classList.add('loading');
      const span = geoBtn.querySelector('span');
      if (span) span.textContent = 'Buscando...';
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;

        SUBAGENCIAS_DATA.forEach(item => {
          item.distanceKm = calcDistanceKm(uLat, uLng, item.lat, item.lng);
        });

        SUBAGENCIAS_DATA.sort((a, b) => a.distanceKm - b.distanceKm);

        currentZone = 'all';
        currentSearch = '';
        const searchInput = document.getElementById('subSearchInput');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.sub-filter-btn').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-zone') === 'all');
        });

        const filtered = getFilteredData();
        renderDirectoryList(filtered);
        renderMarkers(filtered, false);

        if (filtered.length > 0) {
          selectSubagencia(filtered[0].id, true);
        }

        if (geoBtn) {
          geoBtn.classList.remove('loading');
          const span = geoBtn.querySelector('span');
          if (span) span.textContent = 'Más cercana a mí';
        }
      },
      () => {
        if (geoBtn) {
          geoBtn.classList.remove('loading');
          const span = geoBtn.querySelector('span');
          if (span) span.textContent = 'Más cercana a mí';
        }
        alert('No pudimos acceder a tu ubicación. Verificá que tengas el GPS activado o buscá tu calle en el buscador.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function initSubagenciasMap() {
    const mapEl = document.getElementById('subagenciasMap');
    if (!mapEl || typeof L === 'undefined') return;

    // Centro inicial en San Carlos de Bariloche
    map = L.map('subagenciasMap', {
      center: [-41.1385, -71.3100],
      zoom: 13,
      scrollWheelZoom: false
    });

    // Activar zoom con rueda sólo tras hacer clic en el mapa para no trabar el scroll en página
    map.on('focus', () => { map.scrollWheelZoom.enable(); });
    map.on('blur', () => { map.scrollWheelZoom.disable(); });

    // Google Maps Raster Tiles (100% libres de API key y sin marcas de agua, calles de Bariloche en español)
    L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=es', {
      attribution: '&copy; Google Maps',
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 20
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);

    const initialData = getFilteredData();
    renderDirectoryList(initialData);
    renderMarkers(initialData, false);

    // Eventos de botones de filtro por zona
    document.querySelectorAll('.sub-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sub-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentZone = btn.getAttribute('data-zone') || 'all';
        activeId = null;
        const filtered = getFilteredData();
        renderDirectoryList(filtered);
        renderMarkers(filtered, true);
      });
    });

    // Evento de buscador en tiempo real
    const searchInput = document.getElementById('subSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value || '';
        activeId = null;
        const filtered = getFilteredData();
        renderDirectoryList(filtered);
        renderMarkers(filtered, filtered.length > 0 && filtered.length < SUBAGENCIAS_DATA.length);
      });
    }

    // Botón Ver todo Bariloche
    const fitAllBtn = document.getElementById('subFitAllBtn');
    if (fitAllBtn) {
      fitAllBtn.addEventListener('click', () => {
        resetFilters();
      });
    }

    // Botón Más cercana a mí
    const nearestBtn = document.getElementById('subNearestBtn');
    if (nearestBtn) {
      nearestBtn.addEventListener('click', findNearestSubagencia);
    }

    // Asegurar recalcular tamaño si cambia la ventana
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }

  document.addEventListener('DOMContentLoaded', initSubagenciasMap);
})();
