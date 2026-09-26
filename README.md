# Eventify API

API REST para la gestión de eventos, inscripciones (tickets) y usuarios, desarrollada con Node.js + Express siguiendo una arquitectura en capas (routes → controllers → services → repositories → DAO → models).

Temática

Plataforma de eventos: los usuarios pueden registrarse, autenticarse, explorar eventos publicados y reservar su cupo (ticket) para asistir. Los organizadores pueden crear y administrar sus propios eventos, y los administradores tienen control total sobre el sistema.

Tecnologías
Node.js + Express (ES Modules)
MongoDB + Mongoose
bcrypt — hash de contraseñas
jsonwebtoken (JWT) — autenticación
passport (passport-local, passport-custom) — estrategias de autenticación
cookie-parser — manejo de cookies httpOnly
nodemailer — envío de emails de confirmación
dotenv — variables de entorno
cors, helmet, morgan — seguridad y logging
nodemon (dev)

# Variables de entorno
Variable	Descripción	Ejemplo
PORT	Puerto donde escucha el servidor	3000
NODE_ENV	Entorno de ejecución	development / production
MONGO_URL	Cadena de conexión a MongoDB	mongodb://localhost:27017/eventify
JWT_SECRET	Secreto para firmar los JWT	un_secreto_largo_y_random
JWT_EXPIRES_IN	Tiempo de expiración del token	1h
MAIL_HOST	Host del servidor SMTP	smtp.gmail.com
MAIL_PORT	Puerto del servidor SMTP	587
MAIL_USER	Usuario/cuenta de correo remitente	tucuenta@gmail.com
MAIL_PASS	Contraseña o app password del correo	xxxx xxxx xxxx xxxx
MAIL_FROM	Dirección que figura como remitente	Eventify <no-reply@eventify.com>

# Comandos
bash
npm start       # producción
npm run dev     # desarrollo (con nodemon)

# Estructura del proyecto
proyecto/
├── app.js                          # Configuración de Express (middlewares, rutas)
├── server.js                       # Punto de entrada, levanta el servidor
├── config/
│   ├── database.js                 # Conexión a MongoDB
│   ├── env.js                      # Carga de variables de entorno
│   ├── mailer.config.js            # Transporter de Nodemailer
│   ├── passport.config.js          # Estrategias de Passport (login, current, register)
│   └── session.config.js
├── routes/                         # Definición de endpoints
├── controllers/                    # Coordinan request/response
├── services/                       # Lógica de negocio
├── repositories/                   # Abstracción sobre el acceso a datos
├── dao/                            # Acceso directo a Mongoose (único lugar que importa modelos)
├── dto/                            # Formato de las respuestas hacia el cliente
├── domain/                         # Reglas de negocio y constantes (validaciones de eventos, filtros, etc.)
├── models/                         # Esquemas de Mongoose (User, Event, Ticket)
├── middlewares/                    # Autenticación (401) y autorización por rol (403)
└── utils/                          # Helpers (hash, jwt, errores, normalización)

# Roles
Rol	Descripción
user	Rol por defecto al registrarse. Puede reservar tickets para eventos publicados.
organizer	Puede crear y administrar sus propios eventos.
admin	Acceso total: administra usuarios, eventos y tickets de cualquier organizador.

El registro público (POST /api/sessions/register) siempre asigna el rol user, sin importar lo que se envíe en el body.

# Usuarios de prueba

Como no hay un seed automático, para probar los distintos roles se recomienda:

Registrar un usuario normal vía POST /api/sessions/register (queda como user).
Abrir MongoDB Compass, ir a la colección users y editar manualmente el campo role del documento a organizer o admin (el modelo ya acepta los tres valores: user, organizer, admin).

Alternativa por consola (mongosh):

js
db.users.updateOne(
  { email: "organizador@mail.com" },
  { $set: { role: "organizer" } }
)

Nota: el CRUD de eventos (POST /api/events) todavía no está conectado a una ruta real (ver Estado actual), así que para probar el módulo de tickets también hay que crear el evento de prueba a mano en Compass, colección events, con al menos title, capacity, status: "published" y organizer (el _id del usuario organizer que creaste).

# EndPoints
Sesiones / Usuarios
Método	Ruta	Descripción	Auth
POST	/api/sessions/register	Registrar usuario	No
POST	/api/sessions/login	Login (genera JWT + cookie httpOnly)	No
GET	/api/sessions/current	Usuario autenticado actual	Sí
POST	/api/sessions/logout	Cerrar sesión (elimina cookie)	Sí

# Tickets
Método	Ruta	Descripción	Auth	Estado
POST	/api/events/:eid/tickets	Reservar un cupo en el evento	Autenticado	✅ implementado
GET	/api/tickets/my-tickets	Mis tickets (con datos del evento)	Autenticado	✅ implementado
GET	/api/events/:eid/tickets	Tickets de un evento	Dueño / admin	✅ implementado
PATCH	/api/tickets/:tid/cancel	Cancelar un ticket (cambia estado)	Dueño / admin	✅ implementado

# Cómo probarlo con Postman y MongoDB Compass
Instalar y abrir MongoDB Compass. Bajalo de mongodb.com/products/compass. Si corrés Mongo local, instalá también MongoDB Community Server; si preferís no instalar nada, usá un cluster gratis de Atlas. Conectate en Compass con la connection string (local: mongodb://127.0.0.1:27017).
Configurar .env con la misma connection string en MONGO_URL (agregando el nombre de la base, ej. mongodb://127.0.0.1:27017/eventify).
Levantar el server: npm install && npm run dev. Deberías ver en consola la confirmación de conexión a Mongo y el puerto activo; en Compass va a aparecer la base apenas se cree la primera colección.
Crear un evento de prueba en Compass (colección events, Insert Document): como mínimo title, capacity, status: "published" y organizer con el _id de un usuario.
Crear usuarios y asignar roles: registrá 2-3 usuarios desde Postman con POST /api/sessions/register y después, en Compass (colección users), cambiá el role de alguno a organizer (usando el mismo _id que pusiste como organizer del evento) y otro a admin.
Login en Postman: POST /api/sessions/login. Postman guarda la cookie currentUser automáticamente (pestaña Cookies, debajo del botón Send) y la reenvía sola en los siguientes requests al mismo host — no hace falta copiarla a mano.
Probar el flujo de tickets: con la cookie activa, POST /api/events/{eventId}/tickets con body {"quantity":1}; GET /api/tickets/my-tickets; logueado como el organizer/admin, GET /api/events/{eventId}/tickets; y PATCH /api/tickets/{ticketId}/cancel.
Verificar en Compass: refrescá la colección tickets después de cada request — deberías ver el documento con reservationCode, quantity y status: "confirmed", y tras cancelar, status: "cancelled" con cancelledAt seteado (el documento no se borra).

# Flujo de autenticación
El usuario se registra con POST /api/sessions/register (queda con rol user, password hasheada con bcrypt).
Hace login con POST /api/sessions/login: Passport valida credenciales, se genera un JWT y se guarda en una cookie httpOnly (currentUser).
En cada request protegido, el middleware de autenticación lee la cookie, verifica el JWT y agrega el usuario a req.user. Si no hay cookie válida, responde 401.
El middleware de autorización por rol revisa req.user.role contra los roles permitidos de la ruta. Si no coincide, responde 403.
GET /api/sessions/current devuelve los datos del usuario autenticado (sin password).
POST /api/sessions/logout limpia la cookie y cierra la sesión.

# Flujo de inscripción a un evento
El usuario autenticado hace POST /api/events/:eid/tickets.
El backend valida: que el evento exista y esté published, que haya cupo disponible (los tickets cancelled no cuentan como cupo ocupado) y que el usuario no tenga ya una inscripción activa para ese evento.
Si todo es válido, se crea el ticket (status: confirmed, reservationCode único) y se envía un email de confirmación vía Nodemailer.
El usuario puede consultar sus tickets en GET /api/tickets/my-tickets.
Para cancelar, usa PATCH /api/tickets/:tid/cancel: el ticket cambia de estado (no se elimina), liberando el cupo para otros usuarios.