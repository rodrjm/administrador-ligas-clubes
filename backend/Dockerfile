# Usar Node.js 18 Alpine para imagen más ligera
FROM node:18-alpine

# Instalar dependencias del sistema necesarias para Prisma
RUN apk add --no-cache openssl

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar TODAS las dependencias (incluyendo devDependencies para compilar)
RUN npm install

# Copiar código fuente
COPY . .

# Generar cliente de Prisma (después de copiar el código)
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# Limpiar dependencias de desarrollo pero mantener Prisma
RUN npm uninstall typescript @types/node @types/express @types/bcryptjs @types/jsonwebtoken nodemon ts-node prisma

# Exponer puerto
EXPOSE 3001

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
