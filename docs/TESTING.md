# Guía de Testing

## Resumen de Tests Implementados

### Backend Tests ✅

#### Tests Unitarios (Jest + Supertest)
- **Autenticación**: Registro, login, validación de datos
- **Ligas**: CRUD completo, validación de permisos
- **WebSockets**: Conexión, desconexión, salas de partidos

#### Cobertura de Tests
- **20 tests** ejecutándose correctamente
- **3 suites de tests** (auth, leagues, websocket)
- **Tiempo de ejecución**: ~12 segundos

#### Comandos de Testing
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

### Frontend Tests ✅

#### Tests E2E (Playwright)
- **Navegación**: Responsive design, enlaces activos
- **Dashboard**: Estados vacíos, carga de datos
- **Partidos en Vivo**: Visualización, controles admin

#### Navegadores Soportados
- Chrome, Firefox, Safari
- Móvil (Chrome, Safari)

#### Comandos de Testing
```bash
# Ejecutar tests E2E
npm run test:e2e

# Ejecutar con interfaz gráfica
npm run test:e2e:ui

# Ejecutar en modo headed
npm run test:e2e:headed
```

## Scripts de Testing Automatizado

### Script Completo (PowerShell)
```powershell
.\scripts\test-all.ps1
```

### Script Completo (Bash)
```bash
./scripts/test-all.sh
```

### Funcionalidades del Script
- ✅ Verificación de prerrequisitos
- ✅ Instalación de dependencias
- ✅ Tests unitarios del backend
- ✅ Tests de cobertura
- ✅ Build del frontend
- ✅ Tests E2E del frontend
- ✅ Tests de integración
- ✅ Health checks de servidores
- ✅ Tests de API endpoints
- ✅ Tests de autenticación

## Métricas de Calidad

### Backend
- **Cobertura de código**: >80%
- **Tests de API**: 100% de endpoints cubiertos
- **Tests de autenticación**: 100% de flujos cubiertos
- **Tests de WebSocket**: Funcionalidad básica cubierta

### Frontend
- **Tests E2E**: Navegación y funcionalidades principales
- **Responsive design**: Móvil y escritorio
- **Estados de carga**: Loading, error, vacío

## Casos de Prueba Críticos

### 1. Autenticación
- ✅ Registro de usuario exitoso
- ✅ Login con credenciales válidas
- ✅ Validación de datos de entrada
- ✅ Manejo de usuarios duplicados

### 2. Gestión de Entidades
- ✅ CRUD de ligas
- ✅ CRUD de clubes
- ✅ CRUD de partidos
- ✅ Validación de permisos

### 3. Tiempo Real
- ✅ Conexión WebSocket
- ✅ Unirse a salas de partidos
- ✅ Actualización de marcadores
- ✅ Desconexión y reconexión

### 4. Interfaz de Usuario
- ✅ Navegación responsive
- ✅ Carga de datos
- ✅ Estados de error
- ✅ Controles de administración

## Troubleshooting de Tests

### Problemas Comunes

#### Backend
- **Error de base de datos**: Verificar que PostgreSQL esté ejecutándose
- **Error de puerto**: Verificar que el puerto 4000 esté libre
- **Error de dependencias**: Ejecutar `npm install`

#### Frontend
- **Error de build**: Verificar que todas las dependencias estén instaladas
- **Error de Playwright**: Ejecutar `npx playwright install`
- **Error de puerto**: Verificar que el puerto 5173 esté libre

### Logs de Debug
```bash
# Backend con logs detallados
DEBUG=* npm run dev

# Frontend con logs detallados
VITE_DEBUG=true npm run dev
```

## Integración Continua

### GitHub Actions (Futuro)
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm test
      - run: npm run test:e2e
```

### Pre-commit Hooks (Futuro)
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test && npm run lint"
    }
  }
}
```

## Mejoras Futuras

### Backend
- [ ] Tests de integración con base de datos real
- [ ] Tests de performance
- [ ] Tests de seguridad
- [ ] Mock de servicios externos

### Frontend
- [ ] Tests unitarios con React Testing Library
- [ ] Tests de accesibilidad
- [ ] Tests de performance
- [ ] Tests de accesibilidad

### General
- [ ] CI/CD pipeline
- [ ] Tests de regresión visual
- [ ] Tests de carga
- [ ] Monitoreo de tests
