import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should display dashboard content', async ({ page }) => {
    await page.goto('/');

    // Verificar título principal
    await expect(page.locator('h1')).toContainText('Próximos Partidos');
    await expect(page.locator('h1')).toContainText('Partidos en Vivo');
    await expect(page.locator('h1')).toContainText('Mis Suscripciones');
  });

  test('should show empty state when no matches', async ({ page }) => {
    await page.goto('/');

    // Verificar mensajes de estado vacío
    await expect(page.locator('text=No hay partidos próximos')).toBeVisible();
    await expect(page.locator('text=No hay partidos en vivo')).toBeVisible();
  });

  test('should display match cards when data is available', async ({ page }) => {
    // Mock de datos de partidos
    await page.route('**/api/v1/matches', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '1',
            sport: 'FUTBOL',
            date: new Date(Date.now() + 3600000).toISOString(),
            status: 'SCHEDULED',
            scoreHome: 0,
            scoreAway: 0,
            homeTeamId: 'team1',
            awayTeamId: 'team2',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            sport: 'BASQUET',
            date: new Date().toISOString(),
            status: 'LIVE',
            scoreHome: 65,
            scoreAway: 58,
            homeTeamId: 'team3',
            awayTeamId: 'team4',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ])
      });
    });

    await page.goto('/');

    // Verificar que se muestran las tarjetas de partidos
    await expect(page.locator('[data-testid="match-card"]')).toHaveCount(2);
    
    // Verificar contenido de las tarjetas
    await expect(page.locator('text=⚽')).toBeVisible();
    await expect(page.locator('text=🏀')).toBeVisible();
    await expect(page.locator('text=EN VIVO')).toBeVisible();
  });

  test('should handle loading states', async ({ page }) => {
    // Mock de respuesta lenta
    await page.route('**/api/v1/matches', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.goto('/');

    // Verificar que se muestra el estado de carga
    await expect(page.locator('.animate-pulse')).toBeVisible();
  });
});
