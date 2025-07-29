# Backend de Calendario

Este es el servidor backend para la aplicación Calendar App. Proporciona una API RESTful para gestionar eventos del calendario y autenticación de usuarios.

## Características

- Autenticación y autorización de usuarios
- Operaciones CRUD para eventos del calendario
- Seguridad basada en tokens JWT
- Integración con base de datos MongoDB
- Servidor Express.js

## Tecnologías

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Express-validator

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno:
   ```bash
   cp .env.template .env
   ```
4. Iniciar la aplicación:
   ```bash
   # Modo desarrollo
   npm run dev

   # Modo producción
   npm start
   ```
