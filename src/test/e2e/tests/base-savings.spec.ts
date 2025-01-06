import { test } from '@playwright/test';
import '../mock-rpc-call.ts';
import '../mock-vpn-check.ts';
import { setErc20Balance, setEthBalance } from '../utils/setBalance.ts';
import { usdcBaseAddress, usdsBaseAddress } from '@jetstreamgg/hooks';
import { TENDERLY_BASE_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain.ts';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.ts';
import { switchToBase } from '../utils/switchToBase.ts';
import { NetworkName } from '../utils/constants.ts';
import { expect } from '@playwright/test';
import { approveOrPerformAction } from '../utils/approveOrPerformAction.ts';

test.beforeAll(async () => {
  await setEthBalance('100', NetworkName.base);
  await setErc20Balance(usdsBaseAddress[TENDERLY_BASE_CHAIN_ID], '100', 18, NetworkName.base);
  await setErc20Balance(usdcBaseAddress[TENDERLY_BASE_CHAIN_ID], '100', 6, NetworkName.base);
});

test('Go to Base Savings, deposit usds and usdc, withdraw usdc and usds', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();
  await switchToBase(page);

  await expect(page.getByRole('button', { name: 'Transaction overview' })).not.toBeVisible();

  //supply usds
  await page.getByTestId('base-savings-suuply-input').click();
  await page.getByTestId('base-savings-suuply-input').fill('10');

  await expect(page.getByRole('button', { name: 'Transaction overview' })).toBeVisible();

  await approveOrPerformAction(page, 'Supply');

  await page.getByRole('button', { name: 'Back to Savings' }).click();

  //supply usdc
  await page.getByTestId('undefined-menu-button').click();
  await page.getByRole('button', { name: 'USDC USDC USDC' }).click();

  await page.getByTestId('base-savings-suuply-input').click();
  await page.getByTestId('base-savings-suuply-input').fill('10');

  await expect(page.getByRole('button', { name: 'Transaction overview' })).toBeVisible();

  await approveOrPerformAction(page, 'Supply');

  await page.getByRole('button', { name: 'Back to Savings' }).click();

  await page.getByRole('tab', { name: 'Withdraw' }).click();

  //withdraw usdc
  await page.getByTestId('base-savings-withdraw-input').click();
  await page.getByTestId('base-savings-withdraw-input').fill('10');
  await expect(page.getByRole('button', { name: 'Transaction overview' })).toBeVisible();

  await approveOrPerformAction(page, 'Withdraw');

  await page.getByRole('button', { name: 'Back to Savings' }).click();

  //withdraw usds
  await page.getByTestId('undefined-menu-button').click();
  await page.getByRole('button', { name: 'USDS USDS USDS' }).click();

  await page.getByTestId('base-savings-withdraw-input').click();
  await page.getByTestId('base-savings-withdraw-input').fill('10');

  await expect(page.getByRole('button', { name: 'Transaction overview' })).toBeVisible();

  await approveOrPerformAction(page, 'Withdraw');

  await page.getByRole('button', { name: 'Back to Savings' }).click();
});
