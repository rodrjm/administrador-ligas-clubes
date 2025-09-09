import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

const leagueSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  logoUrl: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
});

router.get('/', async (_req, res) => {
  const leagues = await prisma.league.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(leagues);
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = leagueSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const { name, slug, logoUrl, description } = parsed.data;
  const league = await prisma.league.create({ 
    data: { 
      name, 
      slug, 
      ...(logoUrl && { logoUrl }), 
      ...(description && { description }) 
    } 
  });
  res.status(201).json(league);
});

router.get('/:id', async (req, res) => {
  const league = await prisma.league.findFirst({ 
    where: { 
      OR: [
        { id: req.params.id },
        { slug: req.params.id }
      ]
    } 
  });
  if (!league) return res.status(404).json({ message: 'League not found' });
  res.json(league);
});

router.put('/:id', requireAuth, async (req, res) => {
  const parsed = leagueSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  try {
    const updateData: any = {};
    if (parsed.data.name) updateData.name = parsed.data.name;
    if (parsed.data.slug) updateData.slug = parsed.data.slug;
    if (parsed.data.logoUrl) updateData.logoUrl = parsed.data.logoUrl;
    if (parsed.data.description) updateData.description = parsed.data.description;
    
    const league = await prisma.league.update({ 
      where: { id: req.params.id }, 
      data: updateData 
    });
    res.json(league);
  } catch {
    res.status(404).json({ message: 'League not found' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.league.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ message: 'League not found' });
  }
});

export default router;


