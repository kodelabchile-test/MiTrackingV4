// frontend/src/services/api.js
const RAW_API_BASE = import.meta.env.VITE_API_BASE || "/api"
const API_BASE = RAW_API_BASE.endsWith("/") ? RAW_API_BASE.slice(0, -1) : RAW_API_BASE

export async function apiPost(path, body) {
  try {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`
    const res = await fetch(`${API_BASE}${normalizedPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // importante para enviar cookies de sesión
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, msg: data.msg || `Error ${res.status}` };
    }

    return res.json();
  } catch {
    return { ok: false, msg: "Error de red" };
  }
}
