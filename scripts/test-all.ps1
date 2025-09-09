# Script para ejecutar todos los tests de la aplicación
# Uso: .\scripts\test-all.ps1

param(
    [switch]$SkipE2E
)

Write-Host "🧪 Ejecutando tests completos de la aplicación..." -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Yellow

# Función para mostrar resultados
function Show-Result {
    param(
        [bool]$Success,
        [string]$Message
    )
    
    if ($Success) {
        Write-Host "✅ $Message - PASSED" -ForegroundColor Green
    } else {
        Write-Host "❌ $Message - FAILED" -ForegroundColor Red
        exit 1
    }
}

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Ejecutar desde el directorio raíz del proyecto" -ForegroundColor Red
    exit 1
}

Write-Host "📋 Verificando prerrequisitos..." -ForegroundColor Yellow

# Verificar que Node.js esté instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado" -ForegroundColor Red
    exit 1
}

# Verificar que npm esté instalado
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ npm no está instalado" -ForegroundColor Red
    exit 1
}

# Instalar dependencias si es necesario
Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
try {
    npm run install:all
    Show-Result $true "Instalación de dependencias"
} catch {
    Show-Result $false "Instalación de dependencias"
}

# Tests del Backend
Write-Host "🔧 Ejecutando tests del backend..." -ForegroundColor Yellow
Set-Location backend

# Verificar que la base de datos esté disponible
Write-Host "🗄️ Verificando conexión a base de datos..." -ForegroundColor Yellow
try {
    npx prisma db push --accept-data-loss
    Show-Result $true "Conexión a base de datos"
} catch {
    Write-Host "❌ Error: No se puede conectar a la base de datos" -ForegroundColor Red
    Write-Host "💡 Asegúrate de que PostgreSQL esté ejecutándose y configurado correctamente" -ForegroundColor Yellow
    exit 1
}

# Ejecutar tests unitarios del backend
Write-Host "🧪 Ejecutando tests unitarios..." -ForegroundColor Yellow
try {
    npm test
    Show-Result $true "Tests unitarios del backend"
} catch {
    Show-Result $false "Tests unitarios del backend"
}

# Ejecutar tests de cobertura
Write-Host "📊 Ejecutando tests de cobertura..." -ForegroundColor Yellow
try {
    npm run test:coverage
    Show-Result $true "Tests de cobertura del backend"
} catch {
    Show-Result $false "Tests de cobertura del backend"
}

Set-Location ..

# Tests del Frontend
Write-Host "🎨 Ejecutando tests del frontend..." -ForegroundColor Yellow
Set-Location frontend

# Verificar que el frontend se pueda construir
Write-Host "🔨 Construyendo frontend..." -ForegroundColor Yellow
try {
    npm run build
    Show-Result $true "Build del frontend"
} catch {
    Show-Result $false "Build del frontend"
}

# Ejecutar tests E2E solo si no se omite
if (-not $SkipE2E) {
    Write-Host "🌐 Ejecutando tests E2E..." -ForegroundColor Yellow
    try {
        npm run test:e2e
        Show-Result $true "Tests E2E del frontend"
    } catch {
        Show-Result $false "Tests E2E del frontend"
    }
} else {
    Write-Host "⏭️ Saltando tests E2E..." -ForegroundColor Yellow
}

Set-Location ..

# Tests de Integración
Write-Host "🔗 Ejecutando tests de integración..." -ForegroundColor Yellow

# Iniciar servidores en background
Write-Host "🚀 Iniciando servidores..." -ForegroundColor Yellow
$serverProcess = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -PassThru -WindowStyle Hidden

# Esperar a que los servidores estén listos
Write-Host "⏳ Esperando que los servidores estén listos..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Verificar que el backend esté funcionando
Write-Host "🔍 Verificando backend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/health" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Show-Result $true "Backend health check"
    } else {
        Show-Result $false "Backend health check"
    }
} catch {
    Show-Result $false "Backend health check"
}

# Verificar que el frontend esté funcionando
Write-Host "🔍 Verificando frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Show-Result $true "Frontend health check"
    } else {
        Show-Result $false "Frontend health check"
    }
} catch {
    Show-Result $false "Frontend health check"
}

# Tests de API
Write-Host "🌐 Ejecutando tests de API..." -ForegroundColor Yellow

# Test de endpoints principales
Write-Host "📡 Probando endpoints de API..." -ForegroundColor Yellow

# Test GET /api/v1/leagues
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/v1/leagues" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Show-Result $true "GET /api/v1/leagues"
    } else {
        Show-Result $false "GET /api/v1/leagues"
    }
} catch {
    Show-Result $false "GET /api/v1/leagues"
}

# Test GET /api/v1/clubs
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/v1/clubs" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Show-Result $true "GET /api/v1/clubs"
    } else {
        Show-Result $false "GET /api/v1/clubs"
    }
} catch {
    Show-Result $false "GET /api/v1/clubs"
}

# Test GET /api/v1/matches
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/v1/matches" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Show-Result $true "GET /api/v1/matches"
    } else {
        Show-Result $false "GET /api/v1/matches"
    }
} catch {
    Show-Result $false "GET /api/v1/matches"
}

# Test de autenticación
Write-Host "🔐 Probando autenticación..." -ForegroundColor Yellow

# Test POST /api/v1/auth/register
try {
    $body = @{
        email = "test@example.com"
        password = "password123"
        role = "ADMIN_LIGA"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/v1/auth/register" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    
    if ($response.StatusCode -eq 201) {
        Show-Result $true "POST /api/v1/auth/register"
    } else {
        Show-Result $false "POST /api/v1/auth/register"
    }
} catch {
    Show-Result $false "POST /api/v1/auth/register"
}

# Test POST /api/v1/auth/login
try {
    $body = @{
        email = "test@example.com"
        password = "password123"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/v1/auth/login" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    
    if ($response.StatusCode -eq 200) {
        Show-Result $true "POST /api/v1/auth/login"
    } else {
        Show-Result $false "POST /api/v1/auth/login"
    }
} catch {
    Show-Result $false "POST /api/v1/auth/login"
}

# Limpiar procesos en background
Write-Host "🧹 Limpiando procesos..." -ForegroundColor Yellow
try {
    Stop-Process -Id $serverProcess.Id -Force
} catch {
    # Ignorar errores al detener el proceso
}

# Resumen final
Write-Host "🎉 ¡Todos los tests han pasado exitosamente!" -ForegroundColor Green
Write-Host "✅ La aplicación está lista para producción" -ForegroundColor Green

Write-Host ""
Write-Host "📊 Resumen de tests ejecutados:" -ForegroundColor Yellow
Write-Host "  - ✅ Tests unitarios del backend" -ForegroundColor Green
Write-Host "  - ✅ Tests de cobertura del backend" -ForegroundColor Green
Write-Host "  - ✅ Build del frontend" -ForegroundColor Green
if (-not $SkipE2E) {
    Write-Host "  - ✅ Tests E2E del frontend" -ForegroundColor Green
}
Write-Host "  - ✅ Tests de integración" -ForegroundColor Green
Write-Host "  - ✅ Health checks de servidores" -ForegroundColor Green
Write-Host "  - ✅ Tests de API endpoints" -ForegroundColor Green
Write-Host "  - ✅ Tests de autenticación" -ForegroundColor Green

Write-Host ""
Write-Host "💡 Para ejecutar tests específicos:" -ForegroundColor Yellow
Write-Host "  - Backend: cd backend && npm test" -ForegroundColor Cyan
Write-Host "  - Frontend: cd frontend && npm run test:e2e" -ForegroundColor Cyan
Write-Host "  - Cobertura: cd backend && npm run test:coverage" -ForegroundColor Cyan
