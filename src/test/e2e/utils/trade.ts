import { Page } from '@playwright/test';

export const getMinimumOutput = async (page: Page) => {
  const minimumOutputContainer = await page
    .locator('div', { has: page.getByText('Minimum output') })
    .last()
    .locator('p')
    .last()
    .textContent();
  const minimumOutput = parseFloat(minimumOutputContainer?.split(' ')[0].replace(/,/g, '') || '0');

  return minimumOutput;
};
