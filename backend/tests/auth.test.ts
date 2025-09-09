import request from 'supertest';
import { createApp } from '../src/app';
import { prisma } from '../src/db';
import bcrypt from 'bcryptjs';

const app = createApp();

describe('Auth Endpoints', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        role: 'ADMIN_LIGA'
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
    });

    it('should return 409 if email already exists', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        role: 'ADMIN_LIGA'
      };

      // Crear usuario primero
      await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      // Intentar crear el mismo usuario en la misma transacción
      await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(409);
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: '123', // Muy corta
        role: 'INVALID_ROLE'
      };

      await request(app)
        .post('/api/v1/auth/register')
        .send(invalidData)
        .expect(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      // Crear usuario de prueba
      const hashedPassword = await bcrypt.hash('password123', 10);
      await prisma.user.create({
        data: {
          email: 'login@example.com',
          password: hashedPassword,
          role: 'ADMIN_LIGA'
        }
      });
    });

    it('should login successfully with valid credentials', async () => {
      const loginData = {
        email: 'login@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
    });

    it('should return 401 for invalid credentials', async () => {
      const loginData = {
        email: 'login@example.com',
        password: 'wrongpassword'
      };

      await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(401);
    });

    it('should return 401 for non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(401);
    });
  });
});
