import { type Page } from '@playwright/test';

export const connectMockWalletAndAcceptTerms = async (page: Page) => {
  await page.getByRole('button', { name: 'Connect Mock Wallet' }).first().click();
  await page.getByTestId('end-of-terms').scrollIntoViewIfNeeded();
  await page.getByRole('checkbox').click();
  await page.getByRole('button', { name: 'Agree and Sign' }).click();
};
