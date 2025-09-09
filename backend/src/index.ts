import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { createApp } from './app';
import { prisma } from './db';
import { z } from 'zod';

const PORT = Number(process.env.PORT || 4000);

const app = createApp();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  // Verificación opcional de token via auth handshake
  const token = socket.handshake.auth?.token as string | undefined;
  // No rechazamos sin token en MVP; se puede endurecer más adelante
  // Unirse a la sala de un partido para recibir actualizaciones en tiempo real
  socket.on('match:join', (matchId: string) => {
    if (!matchId) return;
    socket.join(`match:${matchId}`);
  });

  // Actualizar tanteador (para todos los deportes, simple marcador)
  socket.on('score:update', async (payload) => {
    const schema = z.object({
      matchId: z.string().min(1),
      scoreHome: z.number().int().min(0),
      scoreAway: z.number().int().min(0),
      status: z.enum(['SCHEDULED', 'LIVE', 'FINISHED']).optional(),
    });
    const parsed = schema.safeParse(payload);
    if (!parsed.success) return;
    const { matchId, scoreHome, scoreAway, status } = parsed.data;
    try {
      const updated = await prisma.match.update({
        where: { id: matchId },
        data: { 
          scoreHome, 
          scoreAway, 
          ...(status && { status }) 
        },
      });
      io.to(`match:${matchId}`).emit('match:update', updated);
    } catch {
      // ignore
    }
  });

  // Registrar evento específico del deporte (gol, puntos, tarjetas, etc.)
  socket.on('event:add', async (payload) => {
    const schema = z.object({
      matchId: z.string().min(1),
      type: z.enum(['GOL', 'AMARILLA', 'ROJA', 'SANCION_2M', 'PUNTO_1', 'PUNTO_2', 'PUNTO_3']),
      minute: z.number().int().min(0).optional(),
      quarter: z.number().int().min(1).max(4).optional(),
      value: z.number().int().optional(),
      playerId: z.string().optional(),
      isHome: z.boolean().optional(), // para saber a qué equipo sumar puntos cuando aplique
    });
    const parsed = schema.safeParse(payload);
    if (!parsed.success) return;
    const { matchId, type, minute, quarter, value, playerId, isHome } = parsed.data;
    try {
      const created = await prisma.event.create({
        data: { 
          matchId, 
          type, 
          ...(minute !== undefined && { minute }), 
          ...(quarter !== undefined && { quarter }), 
          ...(value !== undefined && { value }), 
          ...(playerId && { playerId }) 
        },
      });

      // Si el evento afecta el marcador (gol o puntos), actualizar tanteador
      const scoringMap: Record<string, number> = {
        GOL: 1,
        PUNTO_1: 1,
        PUNTO_2: 2,
        PUNTO_3: 3,
        AMARILLA: 0,
        ROJA: 0,
        SANCION_2M: 0,
      };
      const delta = scoringMap[type] ?? 0;
      if (delta > 0 && typeof isHome === 'boolean') {
        await prisma.match.update({
          where: { id: matchId },
          data: isHome
            ? { scoreHome: { increment: delta }, status: 'LIVE' }
            : { scoreAway: { increment: delta }, status: 'LIVE' },
        });
      }

      const fresh = await prisma.match.findUnique({ where: { id: matchId }, include: { events: true } });
      if (fresh) io.to(`match:${matchId}`).emit('match:update', fresh);
      io.to(`match:${matchId}`).emit('event:new', created);
    } catch {
      // ignore
    }
  });

  socket.on('disconnect', () => {});
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${PORT}`);
});


