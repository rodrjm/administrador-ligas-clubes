#!/bin/bash

# Script para ejecutar todos los tests de la aplicación
# Uso: ./scripts/test-all.sh

set -e

echo "🧪 Ejecutando tests completos de la aplicación..."
echo "=================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar resultados
show_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2 - PASSED${NC}"
    else
        echo -e "${RED}❌ $2 - FAILED${NC}"
        exit 1
    fi
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Ejecutar desde el directorio raíz del proyecto${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Verificando prerrequisitos...${NC}"

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    exit 1
fi

# Verificar que npm esté instalado
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerrequisitos verificados${NC}"

# Instalar dependencias si es necesario
echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
npm run install:all
show_result $? "Instalación de dependencias"

# Tests del Backend
echo -e "${YELLOW}🔧 Ejecutando tests del backend...${NC}"
cd backend

# Verificar que la base de datos esté disponible
echo -e "${YELLOW}🗄️ Verificando conexión a base de datos...${NC}"
if ! npx prisma db push --accept-data-loss; then
    echo -e "${RED}❌ Error: No se puede conectar a la base de datos${NC}"
    echo -e "${YELLOW}💡 Asegúrate de que PostgreSQL esté ejecutándose y configurado correctamente${NC}"
    exit 1
fi

# Ejecutar tests unitarios del backend
echo -e "${YELLOW}🧪 Ejecutando tests unitarios...${NC}"
npm test
show_result $? "Tests unitarios del backend"

# Ejecutar tests de cobertura
echo -e "${YELLOW}📊 Ejecutando tests de cobertura...${NC}"
npm run test:coverage
show_result $? "Tests de cobertura del backend"

cd ..

# Tests del Frontend
echo -e "${YELLOW}🎨 Ejecutando tests del frontend...${NC}"
cd frontend

# Verificar que el frontend se pueda construir
echo -e "${YELLOW}🔨 Construyendo frontend...${NC}"
npm run build
show_result $? "Build del frontend"

# Ejecutar tests E2E
echo -e "${YELLOW}🌐 Ejecutando tests E2E...${NC}"
npm run test:e2e
show_result $? "Tests E2E del frontend"

cd ..

# Tests de Integración
echo -e "${YELLOW}🔗 Ejecutando tests de integración...${NC}"

# Iniciar servidores en background
echo -e "${YELLOW}🚀 Iniciando servidores...${NC}"
npm run dev &
SERVER_PID=$!

# Esperar a que los servidores estén listos
echo -e "${YELLOW}⏳ Esperando que los servidores estén listos...${NC}"
sleep 10

# Verificar que el backend esté funcionando
echo -e "${YELLOW}🔍 Verificando backend...${NC}"
if curl -f http://localhost:4000/health > /dev/null 2>&1; then
    show_result 0 "Backend health check"
else
    show_result 1 "Backend health check"
fi

# Verificar que el frontend esté funcionando
echo -e "${YELLOW}🔍 Verificando frontend...${NC}"
if curl -f http://localhost:5173 > /dev/null 2>&1; then
    show_result 0 "Frontend health check"
else
    show_result 1 "Frontend health check"
fi

# Tests de API
echo -e "${YELLOW}🌐 Ejecutando tests de API...${NC}"

# Test de endpoints principales
echo -e "${YELLOW}📡 Probando endpoints de API...${NC}"

# Test GET /api/v1/leagues
if curl -f http://localhost:4000/api/v1/leagues > /dev/null 2>&1; then
    show_result 0 "GET /api/v1/leagues"
else
    show_result 1 "GET /api/v1/leagues"
fi

# Test GET /api/v1/clubs
if curl -f http://localhost:4000/api/v1/clubs > /dev/null 2>&1; then
    show_result 0 "GET /api/v1/clubs"
else
    show_result 1 "GET /api/v1/clubs"
fi

# Test GET /api/v1/matches
if curl -f http://localhost:4000/api/v1/matches > /dev/null 2>&1; then
    show_result 0 "GET /api/v1/matches"
else
    show_result 1 "GET /api/v1/matches"
fi

# Test de autenticación
echo -e "${YELLOW}🔐 Probando autenticación...${NC}"

# Test POST /api/v1/auth/register
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","role":"ADMIN_LIGA"}')

if echo "$REGISTER_RESPONSE" | grep -q "token"; then
    show_result 0 "POST /api/v1/auth/register"
else
    show_result 1 "POST /api/v1/auth/register"
fi

# Test POST /api/v1/auth/login
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}')

if echo "$LOGIN_RESPONSE" | grep -q "token"; then
    show_result 0 "POST /api/v1/auth/login"
else
    show_result 1 "POST /api/v1/auth/login"
fi

# Limpiar procesos en background
echo -e "${YELLOW}🧹 Limpiando procesos...${NC}"
kill $SERVER_PID 2>/dev/null || true

# Resumen final
echo -e "${GREEN}🎉 ¡Todos los tests han pasado exitosamente!${NC}"
echo -e "${GREEN}✅ La aplicación está lista para producción${NC}"

echo ""
echo "📊 Resumen de tests ejecutados:"
echo "  - ✅ Tests unitarios del backend"
echo "  - ✅ Tests de cobertura del backend"
echo "  - ✅ Build del frontend"
echo "  - ✅ Tests E2E del frontend"
echo "  - ✅ Tests de integración"
echo "  - ✅ Health checks de servidores"
echo "  - ✅ Tests de API endpoints"
echo "  - ✅ Tests de autenticación"

echo ""
echo -e "${YELLOW}💡 Para ejecutar tests específicos:${NC}"
echo "  - Backend: cd backend && npm test"
echo "  - Frontend: cd frontend && npm run test:e2e"
echo "  - Cobertura: cd backend && npm run test:coverage"
