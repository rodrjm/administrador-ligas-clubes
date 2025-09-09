# Arquitectura del Sistema

## Visión General

El Administrador de Ligas y Clubes es una aplicación full-stack que permite la gestión de partidos deportivos en tiempo real. La arquitectura está diseñada para ser escalable, mantenible y fácil de extender.

## Diagrama de Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • React 18      │    │ • Express.js    │    │ • Prisma ORM    │
│ • TypeScript    │    │ • TypeScript    │    │ • Migrations    │
│ • Tailwind CSS  │    │ • Socket.io     │    │ • Relations     │
│ • React Query   │    │ • JWT Auth      │    │                 │
│ • React Router  │    │ • Zod Validation│    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │              ┌─────────────────┐
         │              │   WebSockets    │
         └──────────────►│   (Real-time)   │
                        │                 │
                        │ • Match Updates │
                        │ • Live Scores   │
                        │ • Event Stream  │
                        └─────────────────┘
```

## Componentes Principales

### Frontend (React + TypeScript)

**Tecnologías:**
- React 18 con TypeScript
- Vite como bundler
- Tailwind CSS para estilos
- React Router para navegación
- TanStack Query para gestión de estado del servidor
- Socket.io Client para tiempo real

**Estructura:**
```
frontend/src/
├── components/          # Componentes reutilizables
│   ├── layout/         # Navegación y layout
│   └── match-card.tsx  # Tarjeta de partido
├── pages/              # Páginas de la aplicación
│   ├── home.tsx        # Dashboard principal
│   ├── match-live.tsx  # Partido en vivo
│   ├── leagues.tsx     # Lista de ligas
│   └── profile.tsx     # Perfil de usuario
├── hooks/              # Hooks personalizados
│   └── use-api.ts      # Hooks para API calls
├── types/              # Definiciones de tipos
│   └── index.ts        # Tipos compartidos
└── App.tsx             # Componente principal
```

### Backend (Node.js + Express)

**Tecnologías:**
- Node.js con Express.js
- TypeScript para type safety
- Prisma ORM para base de datos
- Socket.io para WebSockets
- JWT para autenticación
- Zod para validación

**Estructura:**
```
backend/src/
├── routes/             # Definiciones de rutas
│   ├── auth.ts         # Autenticación
│   ├── leagues.ts      # CRUD de ligas
│   ├── clubs.ts        # CRUD de clubes
│   └── matches.ts      # CRUD de partidos
├── middleware/         # Middlewares
│   └── auth.ts         # Middleware de autenticación
├── generated/          # Cliente Prisma generado
├── app.ts              # Configuración de Express
├── index.ts            # Punto de entrada
└── db.ts               # Cliente de Prisma
```

### Base de Datos (PostgreSQL)

**Modelos principales:**
- `User`: Usuarios con roles
- `League`: Ligas deportivas
- `Club`: Clubes deportivos
- `Team`: Equipos por deporte
- `Player`: Jugadores
- `Match`: Partidos con tanteador
- `Event`: Eventos del partido

## Flujo de Datos

### 1. Autenticación
```
Usuario → Frontend → POST /api/v1/auth/login → Backend → JWT Token
```

### 2. Gestión de Entidades
```
Frontend → API REST → Backend → Prisma → PostgreSQL
```

### 3. Tiempo Real
```
Admin → Frontend → WebSocket → Backend → Broadcast → Todos los clientes
```

## Patrones de Diseño

### Backend
- **MVC Pattern**: Separación de rutas, controladores y modelos
- **Middleware Pattern**: Autenticación y validación
- **Repository Pattern**: Prisma como capa de abstracción de datos

### Frontend
- **Container/Presentational**: Separación de lógica y presentación
- **Custom Hooks**: Lógica reutilizable
- **Context Pattern**: Estado global (futuro)

## Seguridad

### Autenticación
- JWT tokens con expiración
- Roles de usuario (ADMIN_APP, ADMIN_LIGA, ADMIN_CLUB)
- Middleware de autenticación en rutas protegidas

### Validación
- Validación de entrada con Zod
- Sanitización de datos
- CORS configurado

### Base de Datos
- Migraciones versionadas
- Relaciones bien definidas
- Índices para performance

## Escalabilidad

### Backend
- Arquitectura modular
- Separación de responsabilidades
- Preparado para microservicios

### Frontend
- Componentes reutilizables
- Lazy loading (futuro)
- Code splitting (futuro)

### Base de Datos
- Relaciones optimizadas
- Índices estratégicos
- Preparado para replicación

## Monitoreo y Logs

### Backend
- Logs de errores
- Health check endpoint
- Métricas de performance (futuro)

### Frontend
- Error boundaries (futuro)
- Analytics (futuro)
- Performance monitoring (futuro)
