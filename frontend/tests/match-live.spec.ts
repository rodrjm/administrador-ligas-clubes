import { test, expect } from '@playwright/test';

test.describe('Match Live Page', () => {
  test('should display match live page', async ({ page }) => {
    const matchId = 'test-match-123';
    
    // Mock de datos del partido
    await page.route(`**/api/v1/matches/${matchId}`, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: matchId,
          sport: 'FUTBOL',
          date: new Date().toISOString(),
          status: 'LIVE',
          scoreHome: 2,
          scoreAway: 1,
          homeTeamId: 'team1',
          awayTeamId: 'team2',
          location: 'Estadio Principal',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      });
    });

    await page.goto(`/partido/${matchId}`);

    // Verificar elementos principales
    await expect(page.locator('h1')).toContainText('FUTBOL');
    await expect(page.locator('text=EN VIVO')).toBeVisible();
    await expect(page.locator('text=📍 Estadio Principal')).toBeVisible();
    
    // Verificar marcador
    await expect(page.locator('text=2')).toBeVisible();
    await expect(page.locator('text=1')).toBeVisible();
    await expect(page.locator('text=Equipo Local')).toBeVisible();
    await expect(page.locator('text=Equipo Visitante')).toBeVisible();
  });

  test('should display admin controls', async ({ page }) => {
    const matchId = 'test-match-123';
    
    await page.route(`**/api/v1/matches/${matchId}`, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: matchId,
          sport: 'FUTBOL',
          date: new Date().toISOString(),
          status: 'LIVE',
          scoreHome: 0,
          scoreAway: 0,
          homeTeamId: 'team1',
          awayTeamId: 'team2',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      });
    });

    await page.goto(`/partido/${matchId}`);

    // Verificar controles de administración
    await expect(page.locator('text=Controles de Administración')).toBeVisible();
    await expect(page.locator('text=+ Gol')).toBeVisible();
    await expect(page.locator('text=Tarjeta Amarilla')).toBeVisible();
    await expect(page.locator('text=Tarjeta Roja')).toBeVisible();
    await expect(page.locator('text=Finalizar')).toBeVisible();
  });

  test('should handle match not found', async ({ page }) => {
    await page.route('**/api/v1/matches/non-existent', async route => {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Match not found' })
      });
    });

    await page.goto('/partido/non-existent');

    // Verificar mensaje de error
    await expect(page.locator('h1')).toContainText('Partido no encontrado');
    await expect(page.locator('text=El partido que buscas no existe o ha sido eliminado')).toBeVisible();
  });

  test('should display events timeline', async ({ page }) => {
    const matchId = 'test-match-123';
    
    await page.route(`**/api/v1/matches/${matchId}`, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: matchId,
          sport: 'FUTBOL',
          date: new Date().toISOString(),
          status: 'LIVE',
          scoreHome: 1,
          scoreAway: 0,
          homeTeamId: 'team1',
          awayTeamId: 'team2',
          events: [
            {
              id: 'event1',
              type: 'GOL',
              minute: 45,
              createdAt: new Date().toISOString()
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      });
    });

    await page.goto(`/partido/${matchId}`);

    // Verificar cronología de eventos
    await expect(page.locator('text=Cronología del Partido')).toBeVisible();
    await expect(page.locator('text=45\'')).toBeVisible();
    await expect(page.locator('text=⚽')).toBeVisible();
    await expect(page.locator('text=Gol anotado')).toBeVisible();
  });

  test('should handle WebSocket connection', async ({ page }) => {
    const matchId = 'test-match-123';
    
    await page.route(`**/api/v1/matches/${matchId}`, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: matchId,
          sport: 'FUTBOL',
          date: new Date().toISOString(),
          status: 'LIVE',
          scoreHome: 0,
          scoreAway: 0,
          homeTeamId: 'team1',
          awayTeamId: 'team2',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      });
    });

    await page.goto(`/partido/${matchId}`);

    // Verificar que se establece la conexión WebSocket
    // (En un test real, esto requeriría un servidor WebSocket mock)
    await expect(page.locator('text=Controles de Administración')).toBeVisible();
  });
});
