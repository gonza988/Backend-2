# Eventify API

API REST para gestión de eventos y sesiones de usuarios (registro, login con JWT + cookie httpOnly, ruta protegida y logout).

## Tecnologías

- Node.js + Express (ES Modules)
- MongoDB + Mongoose
- bcryptjs (hash de contraseñas)
- jsonwebtoken (JWT)
- cookie-parser
- dotenv, cors, helmet, morgan

## Instalación

```bash
npm install
cp .env.example .env
```

Edita `.env` y configura especialmente `MONGO_URL` y `JWT_SECRET`.

## Variables de entorno

| Variable        | Descripción                          | Ejemplo                            |
|-----------------|--------------------------------------|------------------------------------|
| PORT            | Puerto del servidor                  | 3000                               |
| NODE_ENV        | Entorno (development/production)     | development                        |
| MONGO_URL       | URL de conexión a MongoDB            | mongodb://localhost:27017/eventify |
| JWT_SECRET      | Secreto para firmar JWT              | your_jwt_secret_key_here           |
| JWT_EXPIRES_IN  | Tiempo de expiración del token       | 1h                                 |

## Cómo ejecutar

```bash
npm start          # producción
npm run dev        # desarrollo (nodemon)
```

## Estructura

```
src/
├── models/User.js
├── routes/sessions.router.js
├── routes/events.router.js
├── controllers/sessions.controller.js
├── services/sessions.service.js
├── repositories/users.repository.js
├── dao/users.dao.js
├── utils/hash.js                 # bcrypt
├── utils/jwt.js                  # JWT
├── middlewares/auth.middleware.js
├── config/db.js
└── app.js
server.js
```

## Rutas disponibles

| Método | Ruta                     | Descripción                          | Auth |
|--------|--------------------------|--------------------------------------|------|
| GET    | /api/health              | Health check                         | No   |
| GET    | /api/events              | Listar eventos (vacío)               | No   |
| POST   | /api/sessions/register   | Registrar usuario                    | No   |
| POST   | /api/sessions/login      | Login (genera JWT + cookie)          | No   |
| GET    | /api/sessions/current    | Usuario autenticado actual           | Sí   |
| POST   | /api/sessions/logout     | Cerrar sesión (elimina cookie)       | No   |

---

### POST /api/sessions/register

**Request:**

```json
{
  "first_name": "Ana",
  "last_name": "Pérez",
  "email": "Ana@Mail.com ",
  "password": "Secreta123"
}
```

**Response 201:**

```json
{
  "status": "success",
  "payload": {
    "id": "665f2a...",
    "first_name": "Ana",
    "last_name": "Pérez",
    "email": "ana@mail.com",
    "role": "user"
  }
}
```

**Errores:**
- 400 → campos faltantes / email inválido / password corta
- 409 → email ya registrado

---

### POST /api/sessions/login

**Request:**

```json
{
  "email": "ana@mail.com",
  "password": "Secreta123"
}
```

**Response 200** (también setea cookie `currentUser`):

```json
{
  "status": "success",
  "payload": {
    "id": "665f2a...",
    "email": "ana@mail.com",
    "role": "user"
  }
}
```

Cookie `currentUser`:
- `httpOnly: true`
- `sameSite: 'lax'`
- `maxAge: 3600000` (1 hora)
- `secure: true` solo en producción

**Errores:**
- 400 → faltan email o password
- 401 → `"Credenciales inválidas"` (mensaje genérico)

---

### GET /api/sessions/current

Requiere cookie `currentUser` válida.

**Response 200:**

```json
{
  "status": "success",
  "payload": {
    "id": "665f2a...",
    "email": "ana@mail.com",
    "role": "user"
  }
}
```

**Errores:**
- 401 → sin cookie o token inválido/expirado

---

### POST /api/sessions/logout

Elimina la cookie `currentUser`.

**Response 200:**

```json
{
  "status": "success",
  "message": "Sesión cerrada correctamente"
}
```

---

## Cómo probar el flujo completo

```bash
# 1. Registrar
curl -X POST http://localhost:3000/api/sessions/register \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Ana","last_name":"Pérez","email":"ana@mail.com","password":"Secreta123"}'

# 2. Login (guarda cookie en archivo)
curl -c cookies.txt -X POST http://localhost:3000/api/sessions/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ana@mail.com","password":"Secreta123"}'

# 3. Ruta protegida
curl -b cookies.txt http://localhost:3000/api/sessions/current

# 4. Logout
curl -b cookies.txt -c cookies.txt -X POST http://localhost:3000/api/sessions/logout
```
EOF