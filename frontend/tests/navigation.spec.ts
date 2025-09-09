import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should display desktop navigation on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');

    // Verificar barra lateral
    await expect(page.locator('aside')).toBeVisible();
    await expect(page.locator('text=Ligas & Clubes')).toBeVisible();
    
    // Verificar enlaces de navegación
    await expect(page.locator('text=Inicio')).toBeVisible();
    await expect(page.locator('text=Ligas')).toBeVisible();
    await expect(page.locator('text=Partidos')).toBeVisible();
    await expect(page.locator('text=Perfil')).toBeVisible();
  });

  test('should display mobile navigation on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verificar header móvil
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=Ligas & Clubes')).toBeVisible();
    
    // Verificar barra de navegación inferior
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('text=Inicio')).toBeVisible();
    await expect(page.locator('text=Ligas')).toBeVisible();
    await expect(page.locator('text=Partidos')).toBeVisible();
    await expect(page.locator('text=Perfil')).toBeVisible();
  });

  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');

    // Navegar a Ligas
    await page.click('text=Ligas');
    await expect(page).toHaveURL('/ligas');
    await expect(page.locator('h1')).toContainText('Ligas');

    // Navegar a Partidos
    await page.click('text=Partidos');
    await expect(page).toHaveURL('/partidos');
    await expect(page.locator('h1')).toContainText('Partidos');

    // Navegar a Perfil
    await page.click('text=Perfil');
    await expect(page).toHaveURL('/perfil');
    await expect(page.locator('h1')).toContainText('Perfil');

    // Volver a Inicio
    await page.click('text=Inicio');
    await expect(page).toHaveURL('/');
  });

  test('should highlight active navigation item', async ({ page }) => {
    await page.goto('/ligas');
    
    // Verificar que el elemento activo esté resaltado
    const activeLink = page.locator('text=Ligas').first();
    await expect(activeLink).toHaveClass(/text-blue-600|bg-blue-100/);
  });
});
