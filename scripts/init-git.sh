#!/bin/bash

# Script para inicializar repositorio Git
# Ejecutar desde la raíz del proyecto

echo "🔧 Inicializando repositorio Git..."

# Verificar que estamos en la raíz del proyecto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Ejecutar desde la raíz del proyecto"
    exit 1
fi

# Inicializar repositorio Git
echo "📁 Inicializando repositorio Git..."
git init

# Configurar rama principal
echo "🌿 Configurando rama principal..."
git branch -M main

# Agregar archivos al staging
echo "📝 Agregando archivos al staging..."
git add .

# Commit inicial
echo "💾 Creando commit inicial..."
git commit -m "Initial commit: Full-stack sports league management app

- Backend: Node.js + Express + TypeScript + Prisma + Socket.io
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Database: PostgreSQL with Prisma ORM
- Real-time: WebSocket support for live match updates
- Testing: Jest + Supertest + Playwright
- Deployment: Railway (backend) + Vercel (frontend) + Supabase (database)
- CI/CD: GitHub Actions workflow
- Documentation: Complete deployment and API guides"

echo "✅ Repositorio Git inicializado correctamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Crear repositorio en GitHub"
echo "2. Conectar repositorio local con GitHub:"
echo "   git remote add origin https://github.com/tu-usuario/administrador-ligas-clubes.git"
echo "   git push -u origin main"
echo "3. Configurar Railway y Vercel"
echo "4. Ver DEPLOYMENT_GUIDE.md para detalles"
