# Script de configuración para despliegue
# Ejecutar desde la raíz del proyecto

Write-Host "🚀 Configurando proyecto para despliegue..." -ForegroundColor Green

# Verificar que estamos en la raíz del proyecto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Ejecutar desde la raíz del proyecto" -ForegroundColor Red
    exit 1
}

# Crear archivo .env para frontend si no existe
if (-not (Test-Path "frontend/.env")) {
    Write-Host "📝 Creando .env para frontend..." -ForegroundColor Yellow
    @"
# API Configuration
VITE_API_URL=http://localhost:3001/api/v1
VITE_WS_URL=http://localhost:3001

# Production URLs (se configurarán automáticamente en Vercel)
# VITE_API_URL=https://tu-backend.railway.app/api/v1
# VITE_WS_URL=https://tu-backend.railway.app
"@ | Out-File -FilePath "frontend/.env" -Encoding UTF8
    Write-Host "✅ Archivo .env creado en frontend/" -ForegroundColor Green
}

# Verificar que el .env del backend existe
if (-not (Test-Path "backend/.env")) {
    Write-Host "❌ Error: backend/.env no existe. Crear manualmente." -ForegroundColor Red
    Write-Host "Ver DEPLOYMENT_GUIDE.md para instrucciones" -ForegroundColor Yellow
    exit 1
}

# Instalar dependencias
Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
npm run install:all

# Generar cliente de Prisma
Write-Host "🗄️ Generando cliente de Prisma..." -ForegroundColor Yellow
cd backend
npx prisma generate
cd ..

# Ejecutar tests
Write-Host "🧪 Ejecutando tests..." -ForegroundColor Yellow
cd backend
npm test
cd ..

Write-Host "✅ Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Inicializar repositorio Git:" -ForegroundColor White
Write-Host "   .\scripts\init-git.ps1" -ForegroundColor Gray
Write-Host "2. Configurar base de datos en Supabase" -ForegroundColor White
Write-Host "3. Actualizar DATABASE_URL en backend/.env" -ForegroundColor White
Write-Host "4. Crear repositorio en GitHub y conectar" -ForegroundColor White
Write-Host "5. Configurar Railway para backend" -ForegroundColor White
Write-Host "6. Configurar Vercel para frontend" -ForegroundColor White
Write-Host "7. Ver DEPLOYMENT_GUIDE.md para detalles completos" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Para desarrollo local:" -ForegroundColor Cyan
Write-Host "npm run dev" -ForegroundColor White
