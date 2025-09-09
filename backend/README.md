# Backend - Administrador de Ligas y Clubes

API REST con WebSockets para la gestión de partidos deportivos en tiempo real.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Ejecutar migraciones
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate

# Iniciar en desarrollo
npm run dev
```

## 📁 Estructura

```
src/
├── controllers/     # Lógica de controladores (futuro)
├── middleware/      # Middlewares (auth, etc.)
├── routes/          # Definiciones de rutas
├── services/        # Lógica de negocio (futuro)
├── generated/       # Cliente Prisma generado
├── app.ts          # Configuración de Express
├── index.ts        # Punto de entrada
└── db.ts           # Cliente de Prisma
```

## 🔌 Endpoints

### Autenticación
- `POST /api/v1/auth/register` - Registro
- `POST /api/v1/auth/login` - Login

### Ligas
- `GET /api/v1/leagues` - Listar
- `POST /api/v1/leagues` - Crear (auth)
- `GET /api/v1/leagues/:id` - Obtener
- `PUT /api/v1/leagues/:id` - Actualizar (auth)
- `DELETE /api/v1/leagues/:id` - Eliminar (auth)

### Clubes
- `GET /api/v1/clubs` - Listar
- `POST /api/v1/clubs` - Crear (auth)
- `GET /api/v1/clubs/:id` - Obtener
- `PUT /api/v1/clubs/:id` - Actualizar (auth)
- `DELETE /api/v1/clubs/:id` - Eliminar (auth)

### Partidos
- `GET /api/v1/matches` - Listar
- `POST /api/v1/matches` - Crear (auth)
- `GET /api/v1/matches/:id` - Obtener
- `PUT /api/v1/matches/:id` - Actualizar (auth)
- `DELETE /api/v1/matches/:id` - Eliminar (auth)

## 🔌 WebSocket Events

### Cliente → Servidor
- `match:join` - Unirse a sala de partido
- `score:update` - Actualizar marcador
- `event:add` - Registrar evento

### Servidor → Cliente
- `match:update` - Actualización del partido
- `event:new` - Nuevo evento

## 🗄️ Base de Datos

### Migraciones
```bash
# Crear migración
npx prisma migrate dev --name nombre_migracion

# Resetear base de datos
npx prisma migrate reset

# Generar cliente
npx prisma generate
```

### Prisma Studio
```bash
npx prisma studio
```

## 🛠️ Scripts

- `npm run dev` - Desarrollo con nodemon
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar compilado
- `npm run lint` - Linter (si está configurado)

## 🔧 Variables de Entorno

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/ligas_clubes?schema=public"
PORT=4000
JWT_SECRET="secreto-jwt-muy-seguro"
CORS_ORIGIN="http://localhost:5173"
```

## 🚀 Despliegue

1. Configurar variables de producción
2. Ejecutar migraciones: `npx prisma migrate deploy`
3. Construir: `npm run build`
4. Iniciar: `npm start`
