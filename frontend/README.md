# Frontend - Administrador de Ligas y Clubes

Aplicación React con TypeScript para la gestión de partidos deportivos en tiempo real.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend

# Iniciar en desarrollo
npm run dev
```

## 📁 Estructura

```
src/
├── components/      # Componentes reutilizables
│   ├── layout/     # Navegación y layout
│   └── match-card.tsx
├── pages/          # Páginas de la aplicación
├── hooks/          # Hooks personalizados
├── types/          # Tipos TypeScript
├── App.tsx         # Componente principal
└── main.tsx        # Punto de entrada
```

## 🎨 Diseño

### Navegación Responsive
- **Móvil**: Pestañas inferiores fijas
- **Escritorio**: Barra lateral izquierda

### Páginas
- **Dashboard**: Próximos partidos y partidos en vivo
- **Partido en Vivo**: Tanteador y controles de admin
- **Ligas**: Lista y detalle de ligas
- **Partidos**: Lista filtrable de partidos
- **Perfil**: Configuración del usuario

## 🔌 WebSocket

Conexión en tiempo real para:
- Actualizaciones de marcador
- Eventos del partido (goles, tarjetas)
- Estado del partido (en vivo, finalizado)

```typescript
// Ejemplo de uso
const socket = io('http://localhost:4000');
socket.emit('match:join', matchId);
socket.on('match:update', (match) => {
  // Actualizar UI
});
```

## 🎯 Funcionalidades

### Para Administradores
- Crear y gestionar ligas/clubes/partidos
- Actualizar tanteador en tiempo real
- Registrar eventos del partido

### Para Usuarios Públicos
- Ver partidos en vivo
- Explorar perfiles de ligas y clubes
- Seguir resultados en tiempo real

## 🛠️ Scripts

- `npm run dev` - Desarrollo con Vite
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build
- `npm run lint` - Linter (si está configurado)

## 🔧 Variables de Entorno

```env
VITE_API_URL=http://localhost:4000/api/v1
VITE_SOCKET_URL=http://localhost:4000
VITE_APP_NAME="Administrador Ligas & Clubes"
```

## 🎨 Estilos

- **Tailwind CSS** para estilos
- **Paleta**: Azul (#2196F3) y Verde (#4CAF50)
- **Responsive**: Mobile-first design
- **Componentes**: Reutilizables y consistentes

## 🚀 Despliegue

1. Configurar variables de producción
2. Construir: `npm run build`
3. Desplegar en Vercel/Netlify

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Subir carpeta dist/
```

## 📱 Responsive Design

- **Mobile**: < 768px (pestañas inferiores)
- **Tablet**: 768px - 1024px (barra lateral)
- **Desktop**: > 1024px (barra lateral completa)

## 🔄 Estado Global

- **React Query** para datos del servidor
- **React Router** para navegación
- **Socket.io** para tiempo real
- **Local State** con useState/useEffect