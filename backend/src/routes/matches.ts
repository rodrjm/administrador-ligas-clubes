import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

const matchSchema = z.object({
  leagueId: z.string().optional(),
  sport: z.enum(['FUTBOL', 'BASQUET', 'HANDBALL', 'HOCKEY']),
  date: z.coerce.date(),
  location: z.string().optional(),
  homeTeamId: z.string(),
  awayTeamId: z.string(),
});

router.get('/', async (_req, res) => {
  const matches = await prisma.match.findMany({ orderBy: { date: 'desc' } });
  res.json(matches);
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = matchSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const match = await prisma.match.create({ data: parsed.data });
  res.status(201).json(match);
});

router.get('/:id', async (req, res) => {
  const match = await prisma.match.findUnique({ where: { id: req.params.id } });
  if (!match) return res.status(404).json({ message: 'Match not found' });
  res.json(match);
});

router.put('/:id', requireAuth, async (req, res) => {
  const parsed = matchSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  try {
    const updateData: any = {};
    if (parsed.data.leagueId) updateData.leagueId = parsed.data.leagueId;
    if (parsed.data.sport) updateData.sport = parsed.data.sport;
    if (parsed.data.date) updateData.date = parsed.data.date;
    if (parsed.data.location) updateData.location = parsed.data.location;
    if (parsed.data.homeTeamId) updateData.homeTeamId = parsed.data.homeTeamId;
    if (parsed.data.awayTeamId) updateData.awayTeamId = parsed.data.awayTeamId;
    
    const match = await prisma.match.update({ where: { id: req.params.id }, data: updateData });
    res.json(match);
  } catch {
    res.status(404).json({ message: 'Match not found' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.match.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ message: 'Match not found' });
  }
});

export default router;


