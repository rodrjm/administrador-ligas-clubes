# Script para inicializar repositorio Git
# Ejecutar desde la raíz del proyecto

Write-Host "🔧 Inicializando repositorio Git..." -ForegroundColor Green

# Verificar que estamos en la raíz del proyecto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Ejecutar desde la raíz del proyecto" -ForegroundColor Red
    exit 1
}

# Inicializar repositorio Git
Write-Host "📁 Inicializando repositorio Git..." -ForegroundColor Yellow
git init

# Configurar rama principal
Write-Host "🌿 Configurando rama principal..." -ForegroundColor Yellow
git branch -M main

# Agregar archivos al staging
Write-Host "📝 Agregando archivos al staging..." -ForegroundColor Yellow
git add .

# Commit inicial
Write-Host "💾 Creando commit inicial..." -ForegroundColor Yellow
git commit -m "Initial commit: Full-stack sports league management app

- Backend: Node.js + Express + TypeScript + Prisma + Socket.io
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Database: PostgreSQL with Prisma ORM
- Real-time: WebSocket support for live match updates
- Testing: Jest + Supertest + Playwright
- Deployment: Railway (backend) + Vercel (frontend) + Supabase (database)
- CI/CD: GitHub Actions workflow
- Documentation: Complete deployment and API guides"

Write-Host "✅ Repositorio Git inicializado correctamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Crear repositorio en GitHub" -ForegroundColor White
Write-Host "2. Conectar repositorio local con GitHub:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/tu-usuario/administrador-ligas-clubes.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host "3. Configurar Railway y Vercel" -ForegroundColor White
Write-Host "4. Ver DEPLOYMENT_GUIDE.md para detalles" -ForegroundColor White
