# MiTrackingV4

Este repositorio contiene el frontend en React y el backend en Express/PostgreSQL de MiTracking, junto con la orquestación necesaria para ejecutarlos en contenedores con Traefik gestionando TLS en el puerto 443.

## Desarrollo con Docker

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Lanza la pila de desarrollo desde la raíz del repositorio:

   ```bash
   docker compose -f deploy/dev/compose.yml up --build
   ```

   * Traefik expone los servicios en `https://localhost` (o el host que definas en la variable de entorno `DEV_HOST`) utilizando el certificado autofirmado que se encuentra en `traefik/dev.crt` y `traefik/dev.key` (definido en `traefik/tls.yml`).
   * El frontend usa Vite en modo desarrollo dentro del contenedor y recibe las peticiones HTTPS en el puerto 443 a través de Traefik.
   * El backend Express queda disponible bajo `https://localhost/api` y comparte la sesión mediante cookies seguras.

## Despliegue en producción

1. Configura las variables de entorno necesarias antes de levantar la pila (`APP_HOST`, `API_HOST`, `LE_EMAIL`, credenciales de PostgreSQL, etc.).
2. Asegúrate de que el archivo `letsencrypt/acme.json` exista y tenga permisos `600` en el host para que Traefik pueda almacenar los certificados de Let's Encrypt.
3. Lanza la pila de producción:

   ```bash
   docker compose -f deploy/prod/compose.yml up --build -d
   ```

   * Traefik escuchará en los puertos 80 y 443, redirigiendo automáticamente HTTP→HTTPS y solicitando certificados válidos de Let's Encrypt mediante el resolver `le` definido en la pila.
   * El frontend se sirve como SPA detrás de Traefik y el backend queda disponible bajo `/api` reutilizando el mismo certificado.

## Scripts útiles

* `frontend/Dockerfile` y `frontend/Dockerfile.dev` contienen las imágenes para build y hot reload respectivamente.
* `deploy/dev/init.sql` incluye un script de inicialización mínimo para PostgreSQL.
* `scripts/make_hash.js` genera hashes bcrypt para precargar usuarios en la base de datos.
