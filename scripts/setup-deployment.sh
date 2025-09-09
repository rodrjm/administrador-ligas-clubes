#!/bin/bash

# Script de configuración para despliegue
# Ejecutar desde la raíz del proyecto

echo "🚀 Configurando proyecto para despliegue..."

# Verificar que estamos en la raíz del proyecto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Ejecutar desde la raíz del proyecto"
    exit 1
fi

# Crear archivo .env para frontend si no existe
if [ ! -f "frontend/.env" ]; then
    echo "📝 Creando .env para frontend..."
    cat > frontend/.env << EOF
# API Configuration
VITE_API_URL=http://localhost:3001/api/v1
VITE_WS_URL=http://localhost:3001

# Production URLs (se configurarán automáticamente en Vercel)
# VITE_API_URL=https://tu-backend.railway.app/api/v1
# VITE_WS_URL=https://tu-backend.railway.app
EOF
    echo "✅ Archivo .env creado en frontend/"
fi

# Verificar que el .env del backend existe
if [ ! -f "backend/.env" ]; then
    echo "❌ Error: backend/.env no existe. Crear manualmente."
    echo "Ver DEPLOYMENT_GUIDE.md para instrucciones"
    exit 1
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm run install:all

# Generar cliente de Prisma
echo "🗄️ Generando cliente de Prisma..."
cd backend
npx prisma generate
cd ..

# Ejecutar tests
echo "🧪 Ejecutando tests..."
cd backend
npm test
cd ..

echo "✅ Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Inicializar repositorio Git:"
echo "   ./scripts/init-git.sh"
echo "2. Configurar base de datos en Supabase"
echo "3. Actualizar DATABASE_URL en backend/.env"
echo "4. Crear repositorio en GitHub y conectar"
echo "5. Configurar Railway para backend"
echo "6. Configurar Vercel para frontend"
echo "7. Ver DEPLOYMENT_GUIDE.md para detalles completos"
echo ""
echo "🚀 Para desarrollo local:"
echo "npm run dev"
