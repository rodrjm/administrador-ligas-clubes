import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Limpiar base de datos antes de los tests
  await prisma.event.deleteMany();
  await prisma.match.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();
  await prisma.club.deleteMany();
  await prisma.league.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  // Limpiar base de datos después de los tests
  await prisma.event.deleteMany();
  await prisma.match.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();
  await prisma.club.deleteMany();
  await prisma.league.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

afterEach(async () => {
  // Limpiar datos entre tests
  await prisma.event.deleteMany();
  await prisma.match.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();
  await prisma.club.deleteMany();
  await prisma.league.deleteMany();
  await prisma.user.deleteMany();
});
