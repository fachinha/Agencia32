/**
 * CLOUDFLARE PAGES FUNCTION: /api/subagencias
 * Gestiona Altas, Bajas y Modificaciones de Subagencias en Cloudflare KV (AGENCIA32_KV)
 */

const DEFAULT_SUBAGENCIAS = [
  {
    id: 0,
    nombre: "Agencia Oficial N°32 (Sede Central)",
    direccion: "Esandi 15",
    zona: "este",
    zonaLabel: "Sede Central · Este",
    lat: -41.132920,
    lng: -71.284033,
    isHQ: true,
    foto: "assets/sede-esandi15.jpeg"
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

const KV_KEY = "subagencias_v1";
const PASS_KEY = "admin_pass_v1";
const DEFAULT_PASS = "agencia32";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password"
    }
  });
}

async function getStoredList(kv) {
  if (!kv) return [...DEFAULT_SUBAGENCIAS];
  const stored = await kv.get(KV_KEY, "json");
  if (Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  await kv.put(KV_KEY, JSON.stringify(DEFAULT_SUBAGENCIAS));
  return [...DEFAULT_SUBAGENCIAS];
}

async function checkPassword(kv, provided) {
  if (!provided) return false;
  let validPass = DEFAULT_PASS;
  if (kv) {
    const customPass = await kv.get(PASS_KEY);
    if (customPass) validPass = customPass;
  }
  return provided.trim() === validPass;
}

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestGet(context) {
  try {
    const kv = context.env.AGENCIA32_KV;
    const items = await getStoredList(kv);
    return jsonResponse({ ok: true, items });
  } catch (err) {
    return jsonResponse({ ok: true, items: DEFAULT_SUBAGENCIAS, fallback: true });
  }
}

export async function onRequestPost(context) {
  try {
    const kv = context.env.AGENCIA32_KV;
    const pass = context.request.headers.get("X-Admin-Password") || "";
    const body = await context.request.json();
    const action = body.action;

    const isAuthorized = await checkPassword(kv, pass);
    if (!isAuthorized) {
      return jsonResponse({ ok: false, error: "Contraseña incorrecta" }, 401);
    }

    if (action === "verify") {
      const items = await getStoredList(kv);
      return jsonResponse({ ok: true, items });
    }

    if (!kv) {
      return jsonResponse({ ok: false, error: "Almacenamiento KV no disponible en este entorno" }, 500);
    }

    if (action === "change_password") {
      const newPass = String(body.newPassword || "").trim();
      if (newPass.length < 4) {
        return jsonResponse({ ok: false, error: "La nueva contraseña debe tener al menos 4 caracteres" }, 400);
      }
      await kv.put(PASS_KEY, newPass);
      return jsonResponse({ ok: true, message: "Contraseña actualizada correctamente" });
    }

    let items = await getStoredList(kv);

    if (action === "add") {
      const maxId = items.reduce((max, it) => Math.max(max, Number(it.id) || 0), 0);
      const newItem = {
        id: maxId + 1,
        nombre: String(body.nombre || "").trim(),
        direccion: String(body.direccion || "").trim(),
        zona: String(body.zona || "centro").trim(),
        zonaLabel: String(body.zonaLabel || "Centro").trim(),
        lat: Number(body.lat) || -41.135,
        lng: Number(body.lng) || -71.305,
        isHQ: false
      };
      if (!newItem.nombre || !newItem.direccion) {
        return jsonResponse({ ok: false, error: "Nombre y dirección son obligatorios" }, 400);
      }
      items.push(newItem);
      await kv.put(KV_KEY, JSON.stringify(items));
      return jsonResponse({ ok: true, items, item: newItem });
    }

    if (action === "update") {
      const targetId = Number(body.id);
      const idx = items.findIndex(it => Number(it.id) === targetId);
      if (idx === -1) {
        return jsonResponse({ ok: false, error: "Subagencia no encontrada" }, 404);
      }
      const existing = items[idx];
      items[idx] = {
        ...existing,
        nombre: String(body.nombre || existing.nombre).trim(),
        direccion: String(body.direccion || existing.direccion).trim(),
        zona: String(body.zona || existing.zona).trim(),
        zonaLabel: String(body.zonaLabel || existing.zonaLabel).trim(),
        lat: body.lat !== undefined ? Number(body.lat) : existing.lat,
        lng: body.lng !== undefined ? Number(body.lng) : existing.lng
      };
      await kv.put(KV_KEY, JSON.stringify(items));
      return jsonResponse({ ok: true, items, item: items[idx] });
    }

    if (action === "delete") {
      const targetId = Number(body.id);
      const target = items.find(it => Number(it.id) === targetId);
      if (!target) {
        return jsonResponse({ ok: false, error: "Subagencia no encontrada" }, 404);
      }
      if (target.isHQ || targetId === 0) {
        return jsonResponse({ ok: false, error: "La Sede Central (Esandi 15) no se puede eliminar, solo editar" }, 400);
      }
      items = items.filter(it => Number(it.id) !== targetId);
      await kv.put(KV_KEY, JSON.stringify(items));
      return jsonResponse({ ok: true, items });
    }

    if (action === "reset") {
      await kv.put(KV_KEY, JSON.stringify(DEFAULT_SUBAGENCIAS));
      return jsonResponse({ ok: true, items: DEFAULT_SUBAGENCIAS });
    }

    return jsonResponse({ ok: false, error: "Acción no válida" }, 400);
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message || "Error interno del servidor" }, 500);
  }
}
