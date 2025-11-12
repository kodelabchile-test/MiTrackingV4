const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("../db");

const router = express.Router();

// POST /api/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password)
    return res.status(400).json({ ok: false, msg: "Faltan credenciales" });

  try {
    const { rows } = await pool.query(
      "SELECT id, username, password_hash FROM usuarios WHERE username = $1",
      [username]
    );
    if (rows.length === 0) return res.status(401).json({ ok: false, msg: "Usuario no encontrado" });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ ok: false, msg: "Contraseña incorrecta" });

    req.session.user = { id: user.id, username: user.username };
    res.json({ ok: true, username: user.username });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ ok: false, msg: "Error interno" });
  }
});

// GET /api/me (para validar sesión)
router.get("/me", (req, res) => {
  if (req.session.user) return res.json({ ok: true, user: req.session.user });
  res.status(401).json({ ok: false, msg: "No autenticado" });
});

// GET /api/logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("mitracking.sid");
    res.json({ ok: true });
  });
});

module.exports = router;
