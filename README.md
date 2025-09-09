# 🏆 Administrador de Ligas y Clubes

Una aplicación full-stack para la gestión de partidos deportivos en tiempo real, construida con Node.js, React y PostgreSQL.

## 🚀 Características Principales

### MVP Implementado
- ✅ **Gestión de Partidos**: Crear, editar y eliminar partidos
- ✅ **Marcador en Tiempo Real**: Actualizaciones instantáneas via WebSockets
- ✅ **Gestión de Entidades**: Ligas, clubes y equipos
- ✅ **Sistema de Usuarios**: Autenticación JWT con roles
- ✅ **Interfaz Responsive**: Diseño móvil y escritorio
- ✅ **Eventos de Partido**: Goles, tarjetas, etc.

### Tecnologías
- **Backend**: Node.js, Express, TypeScript, Socket.io, Prisma, PostgreSQL
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Query
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Tiempo Real**: WebSockets (Socket.io)
- **Testing**: Jest, Supertest, Playwright

## 📋 Prerrequisitos

- Node.js 18+
- PostgreSQL 13+
- npm o yarn

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd administrador_ligas_clubes
```

### 2. Instalar dependencias
```bash
npm run install:all
```

### 3. Configurar base de datos
```bash
# Crear base de datos PostgreSQL
createdb ligas_clubes

# Configurar variables de entorno
cp backend/.env.example backend/.env
# Editar backend/.env con tus credenciales

# Ejecutar migraciones
npm run db:migrate
```

### 4. Iniciar la aplicación
```bash
npm run dev
```

## 🌐 URLs de Acceso

### Desarrollo Local
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

### Producción
- **Frontend**: https://tu-proyecto.vercel.app
- **Backend API**: https://tu-proyecto.railway.app
- **Health Check**: https://tu-proyecto.railway.app/health

## 🧪 Testing

### Ejecutar Todos los Tests
```bash
# PowerShell (Windows)
.\scripts\test-all.ps1

# Bash (Linux/Mac)
./scripts/test-all.sh
```

### Tests Específicos
```bash
# Backend
cd backend && npm test

# Frontend E2E
cd frontend && npm run test:e2e

# Cobertura
cd backend && npm run test:coverage
```

## 📚 Documentación

- [Arquitectura del Sistema](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Flujos de Usuario](docs/USER_FLOWS.md)
- [Guía de Despliegue](docs/DEPLOYMENT.md)
- [Guía de Testing](docs/TESTING.md)

## 🎯 Funcionalidades

### Para Administradores de Liga
- Crear y gestionar ligas
- Programar partidos
- Actualizar marcadores en tiempo real
- Gestionar eventos del partido

### Para Aficionados
- Ver partidos en vivo
- Explorar ligas y clubes
- Seguir actualizaciones en tiempo real
- Acceso sin registro

### Para Administradores de Club
- Gestionar información del club
- Ver partidos del club
- Actualizar datos del club

## 🔧 Comandos Disponibles

### Desarrollo
```bash
npm run dev          # Iniciar en modo desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar en modo producción
```

### Base de Datos
```bash
npm run db:migrate   # Ejecutar migraciones
npm run db:reset     # Resetear base de datos
npm run db:seed      # Poblar con datos de prueba
```

### Testing
```bash
npm test             # Ejecutar tests del backend
npm run test:e2e     # Ejecutar tests E2E del frontend
npm run test:all     # Ejecutar todos los tests
```

## 🏗️ Estructura del Proyecto

```
administrador_ligas_clubes/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── routes/         # Endpoints de la API
│   │   ├── middleware/     # Middlewares
│   │   └── index.ts        # Punto de entrada
│   ├── prisma/             # Esquema de base de datos
│   └── tests/              # Tests unitarios
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas de la aplicación
│   │   └── hooks/          # Hooks personalizados
│   └── tests/              # Tests E2E
├── docs/                   # Documentación
└── scripts/                # Scripts de automatización
```

## 🔐 Autenticación

La aplicación utiliza JWT para la autenticación. Los roles disponibles son:

- **ADMIN_APP**: Acceso completo al sistema
- **ADMIN_LIGA**: Gestión de ligas y partidos
- **ADMIN_CLUB**: Gestión de club específico

## 🌐 API Endpoints

### Autenticación
- `POST /api/v1/auth/register` - Registro de usuario
- `POST /api/v1/auth/login` - Inicio de sesión

### Ligas
- `GET /api/v1/leagues` - Listar ligas
- `POST /api/v1/leagues` - Crear liga
- `GET /api/v1/leagues/:id` - Obtener liga
- `PUT /api/v1/leagues/:id` - Actualizar liga
- `DELETE /api/v1/leagues/:id` - Eliminar liga

### Clubes
- `GET /api/v1/clubs` - Listar clubes
- `POST /api/v1/clubs` - Crear club
- `GET /api/v1/clubs/:id` - Obtener club
- `PUT /api/v1/clubs/:id` - Actualizar club
- `DELETE /api/v1/clubs/:id` - Eliminar club

### Partidos
- `GET /api/v1/matches` - Listar partidos
- `POST /api/v1/matches` - Crear partido
- `GET /api/v1/matches/:id` - Obtener partido
- `PUT /api/v1/matches/:id` - Actualizar partido
- `DELETE /api/v1/matches/:id` - Eliminar partido

## 🔌 WebSocket Events

### Cliente → Servidor
- `match:join` - Unirse a sala de partido
- `score:update` - Actualizar marcador
- `event:add` - Agregar evento

### Servidor → Cliente
- `match:update` - Actualización del partido
- `event:new` - Nuevo evento

## 🚀 Despliegue

### Configuración Rápida
```bash
# Ejecutar script de configuración
# Windows
.\scripts\setup-deployment.ps1

# Linux/Mac
./scripts/setup-deployment.sh
```

### Despliegue Local
Seguir los pasos de instalación arriba.

### Despliegue en Producción
- **Backend**: Railway (Node.js + PostgreSQL)
- **Frontend**: Vercel (React + Vite)
- **Base de Datos**: Supabase (PostgreSQL)

Ver [Guía de Despliegue Completa](DEPLOYMENT_GUIDE.md) para instrucciones detalladas.

### Arquitectura de Producción
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Railway       │    │   Supabase      │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│   React + Vite  │    │   Node.js + WS  │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Si tienes preguntas o problemas, por favor:

1. Revisa la [documentación](docs/)
2. Busca en los [issues existentes](../../issues)
3. Crea un [nuevo issue](../../issues/new)

## 🎉 Agradecimientos

- [React](https://reactjs.org/) - Framework de frontend
- [Node.js](https://nodejs.org/) - Runtime de backend
- [Prisma](https://prisma.io/) - ORM para base de datos
- [Socket.io](https://socket.io/) - WebSockets
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Playwright](https://playwright.dev/) - Testing E2E