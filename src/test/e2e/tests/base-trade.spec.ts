import { test } from '@playwright/test';
import '../mock-rpc-call.ts';
import '../mock-vpn-check.ts';
import { setErc20Balance, setEthBalance } from '../utils/setBalance.ts';
import { usdcBaseAddress, usdsBaseAddress } from '@jetstreamgg/hooks';
import { TENDERLY_BASE_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain.ts';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.ts';
import { switchToBase } from '../utils/switchToBase.ts';
import { NetworkName } from '../utils/constants.ts';
import { approveOrPerformAction } from '../utils/approveOrPerformAction.ts';

test.beforeAll(async () => {
  await setEthBalance('100', NetworkName.base);
  await setErc20Balance(usdsBaseAddress[TENDERLY_BASE_CHAIN_ID], '100', 18, NetworkName.base);
  await setErc20Balance(usdcBaseAddress[TENDERLY_BASE_CHAIN_ID], '100', 6, NetworkName.base);
});

test('trade usdc to usds, then trade usds back to usdc', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await switchToBase(page);

  await page.getByRole('tab', { name: 'Trade' }).click();

  //select usds for target token; usdc is origin by default
  await page.getByRole('button', { name: 'Select token' }).click();
  await page.getByRole('button', { name: 'USDS USDS USDS' }).click();

  await page.getByTestId('trade-input-origin').click();
  await page.getByTestId('trade-input-origin').fill('10');

  await approveOrPerformAction(page, 'Trade');

  await page.locator('button', { hasText: 'Add USDS to wallet' }).first().click();

  //select usds for target token then use the switcher to select usdc
  await page.getByRole('button', { name: 'Select token' }).click();
  await page.getByRole('button', { name: 'USDS USDS USDS' }).click();

  await page.getByTestId('trade-input-target').click();
  await page.getByTestId('trade-input-target').fill('10');

  await page.getByLabel('Switch token inputs').click();

  await approveOrPerformAction(page, 'Trade');

  await page.locator('button', { hasText: 'Add USDC to wallet' }).first().click();
});

test('trade usdc to susds, then trade susds back to usdc', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await switchToBase(page);

  await page.getByRole('tab', { name: 'Trade' }).click();

  //select sUsds for target token; usdc is origin by default
  await page.getByRole('button', { name: 'Select token' }).click();
  await page.getByRole('button', { name: 'sUSDS sUSDS sUSDS' }).click();

  await page.getByTestId('trade-input-origin').click();
  await page.getByTestId('trade-input-origin').fill('10');

  await approveOrPerformAction(page, 'Trade');

  await page.locator('button', { hasText: 'Add sUSDS to wallet' }).first().click();

  //select sUsds for target token then use the switcher to select usdc
  await page.getByRole('button', { name: 'Select token' }).click();
  await page.getByRole('button', { name: 'sUSDS sUSDS sUSDS' }).click();

  await page.getByTestId('trade-input-target').click();
  await page.getByTestId('trade-input-target').fill('9');

  await page.getByLabel('Switch token inputs').click();

  await approveOrPerformAction(page, 'Trade');

  await page.locator('button', { hasText: 'Add USDC to wallet' }).first().click();
});

test('trade usds to susds, then trade susds back to usds', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await switchToBase(page);

  await page.getByRole('tab', { name: 'Trade' }).click();

  //select usds for origin token
  await page.getByRole('button', { name: 'USDC USDC' }).click();
  await page.getByRole('button', { name: 'USDS USDS USDS' }).click();

  //select sUsds for target token
  await page.getByRole('button', { name: 'Select token' }).click();
  await page.getByRole('button', { name: 'sUSDS sUSDS sUSDS' }).click();

  //specify target amount
  await page.getByTestId('trade-input-target').click();
  await page.getByTestId('trade-input-target').fill('10');

  await approveOrPerformAction(page, 'Trade');

  await page.locator('button', { hasText: 'Add sUSDS to wallet' }).first().click();

  //select usds for origin token (will be switched)
  await page.getByRole('button', { name: 'USDC USDC' }).click();
  await page.getByRole('button', { name: 'USDS USDS USDS' }).click();

  //select sUsds for target token (will be switched)
  await page.getByRole('button', { name: 'Select token' }).click();
  await page.getByRole('button', { name: 'sUSDS sUSDS sUSDS' }).click();

  await page.getByLabel('Switch token inputs').click();
  await page.waitForTimeout(1000);
  await page.getByTestId('trade-input-origin').click();
  await page.getByTestId('trade-input-origin').fill('5');

  await approveOrPerformAction(page, 'Trade');

  await page.locator('button', { hasText: 'Add USDS to wallet' }).first().click();
});
