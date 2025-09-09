# Guía de Despliegue

## Despliegue Local

### Prerrequisitos
- Node.js 18+
- PostgreSQL 13+
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd administrador_ligas_clubes
```

2. **Instalar dependencias**
```bash
npm run install:all
```

3. **Configurar base de datos**
```bash
# Crear base de datos PostgreSQL
createdb ligas_clubes

# Configurar variables de entorno
cp backend/.env.example backend/.env
# Editar backend/.env con tus credenciales

# Ejecutar migraciones
npm run db:migrate
```

4. **Iniciar la aplicación**
```bash
npm run dev
```

## Despliegue en Producción

### Backend (Node.js)

#### Opción 1: VPS/Dedicado

1. **Configurar servidor**
```bash
# Instalar Node.js y PostgreSQL
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs postgresql

# Crear usuario de aplicación
sudo useradd -m -s /bin/bash app
sudo su - app
```

2. **Desplegar aplicación**
```bash
# Clonar repositorio
git clone <repository-url>
cd administrador_ligas_clubes/backend

# Instalar dependencias
npm install --production

# Configurar variables de entorno
cp .env.example .env
# Editar .env con credenciales de producción

# Ejecutar migraciones
npx prisma migrate deploy

# Construir aplicación
npm run build

# Iniciar con PM2
npm install -g pm2
pm2 start dist/index.js --name "ligas-backend"
pm2 startup
pm2 save
```

3. **Configurar Nginx**
```nginx
server {
    listen 80;
    server_name api.tudominio.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Opción 2: Heroku

1. **Configurar Heroku**
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Crear aplicación
heroku create ligas-backend

# Configurar variables de entorno
heroku config:set DATABASE_URL="postgresql://..."
heroku config:set JWT_SECRET="tu-secreto-seguro"
heroku config:set PORT=4000

# Desplegar
git push heroku main
```

2. **Configurar base de datos**
```bash
# Agregar addon de PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Ejecutar migraciones
heroku run npx prisma migrate deploy
```

### Frontend (React)

#### Opción 1: Vercel

1. **Conectar repositorio**
   - Ir a vercel.com
   - Conectar repositorio de GitHub
   - Configurar build settings:
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

2. **Configurar variables de entorno**
```
VITE_API_URL=https://api.tudominio.com/api/v1
VITE_SOCKET_URL=https://api.tudominio.com
```

#### Opción 2: Netlify

1. **Desplegar desde Git**
   - Conectar repositorio
   - Configurar build settings:
     - Build Command: `npm run build`
     - Publish Directory: `dist`

2. **Configurar variables de entorno**
   - Ir a Site settings > Environment variables
   - Agregar variables necesarias

#### Opción 3: VPS/Dedicado

1. **Construir aplicación**
```bash
cd frontend
npm install
npm run build
```

2. **Servir con Nginx**
```nginx
server {
    listen 80;
    server_name tudominio.com;
    root /path/to/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:4000;
    }
}
```

## Configuración de Base de Datos

### PostgreSQL en Producción

1. **Configurar PostgreSQL**
```sql
-- Crear base de datos
CREATE DATABASE ligas_clubes;

-- Crear usuario
CREATE USER ligas_user WITH PASSWORD 'password_seguro';

-- Otorgar permisos
GRANT ALL PRIVILEGES ON DATABASE ligas_clubes TO ligas_user;
```

2. **Configurar conexión SSL**
```env
DATABASE_URL="postgresql://ligas_user:password@host:5432/ligas_clubes?sslmode=require"
```

### Backup y Restauración

1. **Backup automático**
```bash
#!/bin/bash
# backup.sh
pg_dump ligas_clubes > backup_$(date +%Y%m%d_%H%M%S).sql
```

2. **Restaurar backup**
```bash
psql ligas_clubes < backup_file.sql
```

## Monitoreo y Logs

### Logs de Aplicación

1. **Configurar Winston (futuro)**
```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

2. **Monitoreo con PM2**
```bash
pm2 monit
pm2 logs
```

### Health Checks

1. **Endpoint de salud**
```bash
curl https://api.tudominio.com/health
```

2. **Monitoreo externo**
   - UptimeRobot
   - Pingdom
   - New Relic

## Seguridad

### SSL/TLS
```bash
# Obtener certificado con Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com -d api.tudominio.com
```

### Variables de Entorno
```env
# Producción
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
JWT_SECRET="secreto-muy-seguro-y-largo"
CORS_ORIGIN="https://tudominio.com"
```

### Firewall
```bash
# Configurar UFW
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## Escalabilidad

### Horizontal Scaling

1. **Load Balancer**
```nginx
upstream backend {
    server 127.0.0.1:4000;
    server 127.0.0.1:4001;
    server 127.0.0.1:4002;
}
```

2. **Redis para sesiones**
```javascript
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);
```

### Vertical Scaling

1. **Optimizar consultas**
```sql
-- Índices para performance
CREATE INDEX idx_matches_date ON matches(date);
CREATE INDEX idx_matches_status ON matches(status);
```

2. **Caching**
```javascript
import Redis from 'ioredis';
const redis = new Redis();

// Cache de consultas frecuentes
const cachedLeagues = await redis.get('leagues');
```

## Troubleshooting

### Problemas Comunes

1. **Error de conexión a base de datos**
   - Verificar credenciales
   - Verificar que PostgreSQL esté ejecutándose
   - Verificar firewall

2. **Error de WebSocket**
   - Verificar configuración de proxy
   - Verificar CORS
   - Verificar que el puerto esté abierto

3. **Error de build**
   - Verificar versiones de Node.js
   - Limpiar node_modules y reinstalar
   - Verificar variables de entorno

### Logs de Debug
```bash
# Backend
DEBUG=* npm run dev

# Frontend
VITE_DEBUG=true npm run dev
```
