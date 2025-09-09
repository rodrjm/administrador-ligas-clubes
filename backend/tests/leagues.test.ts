import request from 'supertest';
import { createApp } from '../src/app';
import { prisma } from '../src/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = createApp();

describe('Leagues Endpoints', () => {
  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    // Crear usuario de prueba
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN_LIGA'
      }
    });
    userId = user.id;

    // Generar token JWT
    authToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'change-me',
      { expiresIn: '1h' }
    );
  });

  describe('GET /api/v1/leagues', () => {
    it('should return empty array when no leagues exist', async () => {
      const response = await request(app)
        .get('/api/v1/leagues')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all leagues', async () => {
      // Crear liga de prueba
      const league = await prisma.league.create({
        data: {
          name: 'Liga Test',
          slug: 'liga-test',
          description: 'Liga de prueba'
        }
      });

      const response = await request(app)
        .get('/api/v1/leagues')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        name: 'Liga Test',
        slug: 'liga-test',
        description: 'Liga de prueba'
      });
    });
  });

  describe('POST /api/v1/leagues', () => {
    it('should create a new league with valid data', async () => {
      const leagueData = {
        name: 'Liga Test',
        slug: 'liga-test',
        description: 'Liga de prueba'
      };

      const response = await request(app)
        .post('/api/v1/leagues')
        .set('Authorization', `Bearer ${authToken}`)
        .send(leagueData)
        .expect(201);

      expect(response.body).toMatchObject({
        name: leagueData.name,
        slug: leagueData.slug,
        description: leagueData.description
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('createdAt');
    });

    it('should return 401 without authentication', async () => {
      const leagueData = {
        name: 'Liga Test',
        slug: 'liga-test'
      };

      await request(app)
        .post('/api/v1/leagues')
        .send(leagueData)
        .expect(401);
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        name: '', // Nombre vacío
        slug: 'liga-test'
      };

      await request(app)
        .post('/api/v1/leagues')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);
    });
  });

  describe('GET /api/v1/leagues/:id', () => {
    it('should return league by id', async () => {
      const league = await prisma.league.create({
        data: {
          name: 'Liga Test',
          slug: 'liga-test',
          description: 'Liga de prueba'
        }
      });

      const response = await request(app)
        .get(`/api/v1/leagues/${league.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: league.id,
        name: 'Liga Test',
        slug: 'liga-test'
      });
    });

    it('should return 404 for non-existent league', async () => {
      await request(app)
        .get('/api/v1/leagues/non-existent-id')
        .expect(404);
    });
  });

  describe('PUT /api/v1/leagues/:id', () => {
    it('should update league with valid data', async () => {
      const league = await prisma.league.create({
        data: {
          name: 'Liga Original',
          slug: 'liga-original',
          description: 'Descripción original'
        }
      });

      const updateData = {
        name: 'Liga Actualizada',
        description: 'Descripción actualizada'
      };

      const response = await request(app)
        .put(`/api/v1/leagues/${league.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      // Verificar que la respuesta sea exitosa
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: league.id,
        name: 'Liga Actualizada',
        slug: 'liga-original', // No se actualizó
        description: 'Descripción actualizada'
      });
    });

    it('should return 401 without authentication', async () => {
      const league = await prisma.league.create({
        data: {
          name: 'Liga Test',
          slug: 'liga-test'
        }
      });

      await request(app)
        .put(`/api/v1/leagues/${league.id}`)
        .send({ name: 'Updated' })
        .expect(401);
    });
  });

  describe('DELETE /api/v1/leagues/:id', () => {
    it('should delete league successfully', async () => {
      const league = await prisma.league.create({
        data: {
          name: 'Liga Test',
          slug: 'liga-test'
        }
      });

      await request(app)
        .delete(`/api/v1/leagues/${league.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);

      // Verificar que se eliminó
      const deletedLeague = await prisma.league.findUnique({
        where: { id: league.id }
      });
      expect(deletedLeague).toBeNull();
    });

    it('should return 401 without authentication', async () => {
      const league = await prisma.league.create({
        data: {
          name: 'Liga Test',
          slug: 'liga-test'
        }
      });

      await request(app)
        .delete(`/api/v1/leagues/${league.id}`)
        .expect(401);
    });
  });
});
