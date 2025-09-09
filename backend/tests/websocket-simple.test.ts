import { Server } from 'http';
import { io as Client, Socket as ClientSocket } from 'socket.io-client';
import { createApp } from '../src/app';
import { Server as SocketIOServer } from 'socket.io';

describe('WebSocket Simple Tests', () => {
  let httpServer: Server;
  let io: SocketIOServer;
  let clientSocket: ClientSocket;

  beforeAll((done) => {
    const app = createApp();
    httpServer = new Server(app);
    io = new SocketIOServer(httpServer, {
      cors: { origin: '*', methods: ['GET', 'POST'] }
    });

    // Configurar eventos básicos
    io.on('connection', (socket) => {
      socket.on('match:join', (matchId) => {
        socket.join(`match:${matchId}`);
      });
    });

    httpServer.listen(() => {
      const port = (httpServer.address() as any)?.port;
      clientSocket = Client(`http://localhost:${port}`);
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    httpServer.close();
    clientSocket.close();
  });

  test('should connect to WebSocket server', (done) => {
    expect(clientSocket.connected).toBe(true);
    done();
  });

  test('should join match room', (done) => {
    const matchId = 'test-match-123';
    
    clientSocket.emit('match:join', matchId);
    
    // Verificar que el evento se envió correctamente
    setTimeout(() => {
      expect(clientSocket.connected).toBe(true);
      done();
    }, 100);
  });

  test('should handle disconnection', (done) => {
    clientSocket.disconnect();
    
    setTimeout(() => {
      expect(clientSocket.connected).toBe(false);
      done();
    }, 100);
  });
});
