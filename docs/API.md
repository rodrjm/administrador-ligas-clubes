# API Documentation

## Base URL
```
http://localhost:4000/api/v1
```

## Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Incluye el token en el header `Authorization`:

```
Authorization: Bearer <token>
```

## Endpoints

### Autenticación

#### POST /auth/register
Registrar un nuevo usuario.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "role": "ADMIN_LIGA",
  "leagueId": "optional-league-id",
  "clubId": "optional-club-id"
}
```

**Response:**
```json
{
  "token": "jwt-token-here"
}
```

#### POST /auth/login
Iniciar sesión.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here"
}
```

### Ligas

#### GET /leagues
Obtener todas las ligas.

**Response:**
```json
[
  {
    "id": "league-id",
    "name": "Liga Local",
    "slug": "liga-local",
    "logoUrl": "https://example.com/logo.png",
    "description": "Descripción de la liga",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

#### POST /leagues
Crear una nueva liga. **Requiere autenticación.**

**Request Body:**
```json
{
  "name": "Liga Local",
  "slug": "liga-local",
  "logoUrl": "https://example.com/logo.png",
  "description": "Descripción de la liga"
}
```

#### GET /leagues/:id
Obtener una liga por ID o slug.

#### PUT /leagues/:id
Actualizar una liga. **Requiere autenticación.**

#### DELETE /leagues/:id
Eliminar una liga. **Requiere autenticación.**

### Clubes

#### GET /clubs
Obtener todos los clubes.

#### POST /clubs
Crear un nuevo club. **Requiere autenticación.**

**Request Body:**
```json
{
  "name": "Club Deportivo",
  "slug": "club-deportivo",
  "logoUrl": "https://example.com/logo.png",
  "description": "Descripción del club",
  "leagueId": "optional-league-id"
}
```

#### GET /clubs/:id
Obtener un club por ID o slug.

#### PUT /clubs/:id
Actualizar un club. **Requiere autenticación.**

#### DELETE /clubs/:id
Eliminar un club. **Requiere autenticación.**

### Partidos

#### GET /matches
Obtener todos los partidos.

#### POST /matches
Crear un nuevo partido. **Requiere autenticación.**

**Request Body:**
```json
{
  "leagueId": "optional-league-id",
  "sport": "FUTBOL",
  "date": "2025-01-01T18:00:00.000Z",
  "location": "Estadio Principal",
  "homeTeamId": "team-id",
  "awayTeamId": "team-id"
}
```

#### GET /matches/:id
Obtener un partido por ID.

#### PUT /matches/:id
Actualizar un partido. **Requiere autenticación.**

#### DELETE /matches/:id
Eliminar un partido. **Requiere autenticación.**

## WebSocket Events

### Conexión
```javascript
const socket = io('http://localhost:4000');
```

### Eventos del Cliente

#### match:join
Unirse a la sala de un partido para recibir actualizaciones.

```javascript
socket.emit('match:join', 'match-id');
```

#### score:update
Actualizar el marcador de un partido.

```javascript
socket.emit('score:update', {
  matchId: 'match-id',
  scoreHome: 2,
  scoreAway: 1,
  status: 'LIVE'
});
```

#### event:add
Registrar un evento del partido (gol, tarjeta, etc.).

```javascript
socket.emit('event:add', {
  matchId: 'match-id',
  type: 'GOL',
  minute: 45,
  isHome: true
});
```

### Eventos del Servidor

#### match:update
Actualización del partido.

```javascript
socket.on('match:update', (match) => {
  console.log('Partido actualizado:', match);
});
```

#### event:new
Nuevo evento registrado.

```javascript
socket.on('event:new', (event) => {
  console.log('Nuevo evento:', event);
});
```

## Códigos de Estado HTTP

- `200` - OK
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Ejemplos de Uso

### Crear una liga
```bash
curl -X POST http://localhost:4000/api/v1/leagues \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Liga Local",
    "slug": "liga-local",
    "description": "Liga de fútbol local"
  }'
```

### Obtener partidos
```bash
curl http://localhost:4000/api/v1/matches
```

### Actualizar marcador via WebSocket
```javascript
const socket = io('http://localhost:4000');
socket.emit('match:join', 'match-123');
socket.emit('score:update', {
  matchId: 'match-123',
  scoreHome: 1,
  scoreAway: 0,
  status: 'LIVE'
});
```
