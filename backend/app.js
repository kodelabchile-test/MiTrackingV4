const express = require("express");
const path = require("path");
const session = require("express-session");
const { pool, testConnection } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

testConnection();

app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sesiones en memoria (DEV)
app.use(session({
  name: "mitracking.sid",
  secret: process.env.SESSION_SECRET || "dev-secret-change-this",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 }
}));

// Rutas API
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Backend API en puerto ${PORT}`));
