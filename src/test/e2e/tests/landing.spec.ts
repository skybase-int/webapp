import { test } from '@playwright/test';
import '../mock-vpn-check.ts';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.ts';

test.describe('accept terms', () => {
  test('accept terms ', async ({ page }) => {
    await page.goto('/');

    await connectMockWalletAndAcceptTerms(page);
  });
});
