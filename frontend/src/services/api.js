// frontend/src/services/api.js
const API_BASE = "http://localhost:5000" // backend local (Express)

export async function apiPost(path, body) {
  try {
    const res = await fetch(API_BASE + path, {
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
