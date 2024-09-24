import { Page } from '@playwright/test';

export async function screenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: `__screenshots-e2e__/${name}-${page.viewportSize()?.width}.png` });
}
