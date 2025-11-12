-- =========================================
-- Script de inicialización de base de datos
-- Proyecto: MiTracking
-- =========================================

CREATE TABLE IF NOT EXISTS dispositivos_gps (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    imei VARCHAR(20) UNIQUE NOT NULL,
    estado BOOLEAN DEFAULT true,
    ultima_posicion TIMESTAMP,
    creado_en TIMESTAMP DEFAULT NOW()
);

-- Datos de ejemplo
INSERT INTO dispositivos_gps (nombre, imei, estado, ultima_posicion)
VALUES
('Tracker01', '123456789012345', true, NOW()),
('Tracker02', '987654321098765', false, NOW());

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  creado_en TIMESTAMP DEFAULT NOW()
);

INSERT INTO usuarios (username, password_hash)
VALUES ('admin', '$2b$10$38/DsBgRPjwkrlAVGpd6SutjhpKcA5Ivb22KREjsSeQEbv9RnpFPS');