# Guía de Despliegue - Administrador de Ligas y Clubes

## 🚀 Resumen de Arquitectura

- **Backend**: Railway (Node.js + Express + PostgreSQL + Socket.io)
- **Frontend**: Vercel (React + Vite + Tailwind CSS)
- **Base de Datos**: Supabase (PostgreSQL)
- **CI/CD**: GitHub Actions

## 📋 Prerrequisitos

1. Cuentas en:
   - [Railway](https://railway.app) (Backend)
   - [Vercel](https://vercel.com) (Frontend)
   - [Supabase](https://supabase.com) (Base de datos)
   - [GitHub](https://github.com) (Repositorio)

2. Herramientas locales:
   - Node.js 18+
   - Git
   - Docker (opcional, para pruebas locales)

## 🗄️ Configuración de Base de Datos (Supabase)

### 1. Crear proyecto en Supabase
1. Ve a [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Anota la **Database URL** de la pestaña Settings > Database

### 2. Configurar variables de entorno
```bash
# En Supabase, ve a Settings > Database
# Copia la "Connection string" y úsala como DATABASE_URL
```

## 🚂 Despliegue del Backend (Railway)

### 1. Preparar el repositorio
```bash
# Opción 1: Usar script automatizado
# Windows
.\scripts\init-git.ps1

# Linux/Mac
./scripts/init-git.sh

# Opción 2: Manual
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/administrador-ligas-clubes.git
git push -u origin main
```

### 2. Conectar con Railway
1. Ve a [Railway](https://railway.app)
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio
4. Railway detectará automáticamente el `railway.toml` en la carpeta `backend`

### 3. Configurar variables de entorno en Railway
En el dashboard de Railway, ve a Variables y configura:

```env
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres?schema=public
JWT_SECRET=tu-jwt-secret-super-seguro-aqui
NODE_ENV=production
PORT=3001
CORS_ORIGINS=https://tu-frontend.vercel.app
```

### 4. Configurar GitHub Actions
1. Ve a tu repositorio en GitHub > Settings > Secrets and variables > Actions
2. Agrega estos secrets:
   - `RAILWAY_TOKEN`: Token de Railway (Settings > Tokens)
   - `RAILWAY_SERVICE_NAME`: Nombre del servicio en Railway

### 5. Desplegar
```bash
# El despliegue se ejecutará automáticamente al hacer push a main
git push origin main
```

## 🌐 Despliegue del Frontend (Vercel)

### 1. Conectar con Vercel
1. Ve a [Vercel](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa el repositorio
4. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2. Configurar variables de entorno en Vercel
En Vercel Dashboard > Settings > Environment Variables:

```env
VITE_API_URL=https://tu-backend.railway.app/api/v1
VITE_WS_URL=https://tu-backend.railway.app
```

### 3. Desplegar
```bash
# El despliegue se ejecutará automáticamente al hacer push a main
git push origin main
```

## 🔧 Configuración Local para Desarrollo

### 1. Clonar y configurar
```bash
git clone https://github.com/tu-usuario/administrador-ligas-clubes.git
cd administrador-ligas-clubes
npm run install:all
```

### 2. Configurar base de datos local
```bash
# Opción 1: PostgreSQL local
createdb administrador_ligas_clubes
cd backend
npx prisma migrate dev

# Opción 2: Usar Supabase (recomendado)
# Actualiza DATABASE_URL en backend/.env con la URL de Supabase
```

### 3. Configurar variables de entorno
```bash
# Backend (.env)
DATABASE_URL=postgresql://postgres:password@localhost:5432/administrador_ligas_clubes?schema=public
JWT_SECRET=tu-jwt-secret-super-seguro-aqui
PORT=3001
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Frontend (.env)
VITE_API_URL=http://localhost:3001/api/v1
VITE_WS_URL=http://localhost:3001
```

### 4. Ejecutar en desarrollo
```bash
# Terminal 1: Backend
npm run dev:backend

# Terminal 2: Frontend
npm run dev:frontend
```

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm run test:e2e
```

### Todos los tests
```bash
npm run test:all
```

## 📊 Monitoreo y Logs

### Railway (Backend)
- Logs: Dashboard de Railway > Deployments > View Logs
- Métricas: Dashboard de Railway > Metrics

### Vercel (Frontend)
- Logs: Vercel Dashboard > Functions > View Logs
- Analytics: Vercel Dashboard > Analytics

## 🔄 Flujo de CI/CD

1. **Push a main** → GitHub Actions ejecuta tests
2. **Tests pasan** → Despliega automáticamente a Railway
3. **Frontend** → Se actualiza automáticamente en Vercel
4. **Base de datos** → Migraciones automáticas con Prisma

## 🚨 Troubleshooting

### Error de CORS
- Verifica que `CORS_ORIGINS` incluya la URL de Vercel
- Railway añade automáticamente su dominio público

### Error de conexión a base de datos
- Verifica que `DATABASE_URL` sea correcta
- Asegúrate de que Supabase esté activo

### WebSocket no conecta
- Verifica que `VITE_WS_URL` apunte al backend de Railway
- Railway soporta WebSockets nativamente

### Build falla en Vercel
- Verifica que `vercel.json` esté en la carpeta `frontend`
- Revisa que las variables de entorno estén configuradas

## 📝 URLs de Producción

Después del despliegue, tendrás:
- **Frontend**: `https://tu-proyecto.vercel.app`
- **Backend**: `https://tu-proyecto.railway.app`
- **API**: `https://tu-proyecto.railway.app/api/v1`
- **WebSocket**: `https://tu-proyecto.railway.app`

## 🔐 Seguridad

- JWT secrets únicos para producción
- CORS configurado correctamente
- Variables de entorno seguras
- HTTPS habilitado automáticamente

## 📈 Escalabilidad

- Railway: Escala automáticamente
- Vercel: CDN global
- Supabase: Base de datos escalable
- Socket.io: Soporte para múltiples instancias
