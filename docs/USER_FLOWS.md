# Flujos de Usuario

## Casos de Uso Principales

### 1. Administrador de Liga

#### Crear una Liga
**Actor:** Administrador de Liga
**Precondición:** Usuario autenticado con rol ADMIN_LIGA

**Flujo Principal:**
1. Usuario accede a la sección "Ligas"
2. Hace clic en "Nueva Liga"
3. Completa el formulario:
   - Nombre de la liga
   - Slug (URL amigable)
   - Logo (opcional)
   - Descripción (opcional)
4. Hace clic en "Crear"
5. Sistema valida los datos
6. Sistema crea la liga en la base de datos
7. Sistema muestra mensaje de confirmación
8. Usuario es redirigido a la lista de ligas

**Flujos Alternativos:**
- **3a.** Usuario no completa campos obligatorios
  - Sistema muestra errores de validación
  - Usuario corrige los errores y reintenta
- **5a.** Datos inválidos
  - Sistema muestra mensaje de error
  - Usuario corrige y reintenta

#### Gestionar Partidos
**Actor:** Administrador de Liga
**Precondición:** Usuario autenticado con rol ADMIN_LIGA

**Flujo Principal:**
1. Usuario accede a la sección "Partidos"
2. Hace clic en "Nuevo Partido"
3. Completa el formulario:
   - Selecciona liga
   - Selecciona deporte
   - Fecha y hora
   - Ubicación
   - Equipos participantes
4. Hace clic en "Crear"
5. Sistema crea el partido
6. Usuario puede ver el partido en la lista

**Flujo de Actualización en Tiempo Real:**
1. Usuario accede al partido en vivo
2. Ve el marcador actual
3. Hace clic en controles de administración:
   - "+ Gol" para sumar gol
   - "Tarjeta Amarilla" para amonestación
   - "Tarjeta Roja" para expulsión
4. Sistema actualiza el marcador
5. Todos los espectadores ven la actualización en tiempo real

### 2. Aficionado

#### Ver Partidos en Vivo
**Actor:** Aficionado
**Precondición:** Ninguna (acceso público)

**Flujo Principal:**
1. Usuario accede a la página principal
2. Ve la sección "Partidos en Vivo"
3. Hace clic en un partido
4. Ve la página del partido con:
   - Marcador en tiempo real
   - Información del partido
   - Cronología de eventos
5. Puede seguir el partido sin necesidad de registro

#### Explorar Ligas y Clubes
**Actor:** Aficionado
**Precondición:** Ninguna (acceso público)

**Flujo Principal:**
1. Usuario accede a "Ligas"
2. Ve la lista de ligas disponibles
3. Hace clic en una liga
4. Ve el perfil de la liga con:
   - Información general
   - Próximos partidos
   - Partidos anteriores
5. Puede navegar a partidos específicos

### 3. Administrador de Club

#### Gestionar Club
**Actor:** Administrador de Club
**Precondición:** Usuario autenticado con rol ADMIN_CLUB

**Flujo Principal:**
1. Usuario accede a la sección "Perfil"
2. Ve la información de su club
3. Puede editar:
   - Nombre del club
   - Logo
   - Descripción
   - Vinculación con liga
4. Guarda los cambios
5. Sistema actualiza la información

## Flujos de Navegación

### Navegación Móvil
1. **Pestañas Inferiores:**
   - 🏠 Inicio: Dashboard principal
   - 🏆 Ligas: Lista y perfiles de ligas
   - ⚽ Partidos: Lista y partidos en vivo
   - 👤 Perfil: Configuración del usuario

### Navegación Escritorio
1. **Barra Lateral:**
   - Inicio: Dashboard principal
   - Mis Ligas/Clubes: Gestión de entidades
   - Partidos: Gestión de partidos
   - Ajustes: Configuración del usuario

## Estados de la Aplicación

### Estados de Partido
- **SCHEDULED:** Partido programado
- **LIVE:** Partido en curso
- **FINISHED:** Partido finalizado

### Estados de Usuario
- **No autenticado:** Solo lectura pública
- **ADMIN_LIGA:** Gestión de ligas y partidos
- **ADMIN_CLUB:** Gestión de club
- **ADMIN_APP:** Acceso completo

## Casos de Error Comunes

### Error de Conexión
**Síntoma:** No se cargan los datos
**Solución:** Verificar conexión a internet y estado del servidor

### Error de Autenticación
**Síntoma:** No se pueden realizar acciones que requieren autenticación
**Solución:** Iniciar sesión o verificar token

### Error de WebSocket
**Síntoma:** No se reciben actualizaciones en tiempo real
**Solución:** Verificar conexión WebSocket y reconectar

## Métricas de Éxito

### Funcionalidad
- ✅ Crear liga en menos de 2 minutos
- ✅ Actualizar marcador en menos de 1 segundo
- ✅ Cargar página en menos de 3 segundos
- ✅ Navegación fluida entre secciones

### Usabilidad
- ✅ Interfaz intuitiva sin necesidad de tutorial
- ✅ Responsive en móvil y escritorio
- ✅ Accesibilidad básica cumplida
- ✅ Feedback visual en todas las acciones
