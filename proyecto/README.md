# Eventify API

## Temática
API REST para gestión de eventos y sesiones de usuarios (autenticación básica).

## Tecnologías
- Node.js
- Express.js
- ESM (ES Modules)
- dotenv para variables de entorno
- Estructura MVC-like con capas adicionales (services, repositories, etc.)

## Instalación
1. Clonar el repositorio
2. `npm install`
3. Copiar `.env.example` a `.env` y configurar variables

## Configuración de variables
- `PORT`: Puerto del servidor (default: 3000)
- `NODE_ENV`: Entorno (development/production)
- `MONGO_URL`: URL de conexión a MongoDB
- `JWT_SECRET`: Secreto para JWT

## Cómo ejecutar
- Desarrollo: `npm run dev` (con nodemon)
- Producción: `npm start`

## Estructura de carpetas
- `config/`: Configuraciones
- `routes/`: Definición de rutas
- `controllers/`: Lógica de controladores
- `services/`: Lógica de negocio
- `repositories/`: Acceso a datos
- `dao/`: Data Access Objects
- `models/`: Esquemas de modelos
- `middlewares/`: Middlewares
- `utils/`: Utilidades

## Rutas disponibles
- `GET /api/health` - Verificar estado del servidor
- `GET /api/events` - Listar eventos
- `POST /api/sessions/login` - Login
- `POST /api/sessions/register` - Registro
- `POST /api/sessions/logout` - Logout