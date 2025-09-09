import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

const clubSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  logoUrl: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  leagueId: z.string().optional(),
});

router.get('/', async (_req, res) => {
  const clubs = await prisma.club.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(clubs);
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = clubSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten());
    return;
  }
  const { name, slug, logoUrl, description, leagueId } = parsed.data;
  const club = await prisma.club.create({ 
    data: { 
      name, 
      slug, 
      ...(logoUrl && { logoUrl }), 
      ...(description && { description }),
      ...(leagueId && { leagueId })
    } 
  });
  res.status(201).json(club);
});

router.get('/:id', async (req, res) => {
  const club = await prisma.club.findUnique({ where: { id: req.params.id } });
  if (!club) {
    res.status(404).json({ message: 'Club not found' });
    return;
  }
  res.json(club);
});

router.put('/:id', requireAuth, async (req, res) => {
  const parsed = clubSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten());
    return;
  }
  try {
    const updateData: any = {};
    if (parsed.data.name) updateData.name = parsed.data.name;
    if (parsed.data.slug) updateData.slug = parsed.data.slug;
    if (parsed.data.logoUrl) updateData.logoUrl = parsed.data.logoUrl;
    if (parsed.data.description) updateData.description = parsed.data.description;
    if (parsed.data.leagueId) updateData.leagueId = parsed.data.leagueId;
    
    const club = await prisma.club.update({ where: { id: req.params.id }, data: updateData });
    res.json(club);
  } catch {
    res.status(404).json({ message: 'Club not found' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.club.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ message: 'Club not found' });
  }
});

export default router;


