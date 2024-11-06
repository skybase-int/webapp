import { expect, test } from '@playwright/test';
import '../mock-rpc-call.ts';
import '../mock-vpn-check.ts';
import { approveOrPerformAction } from '../utils/approveOrPerformAction.ts';
import { setErc20Balance } from '../utils/setBalance.ts';
import { mkrAddress } from '@jetstreamgg/hooks';
import { TENDERLY_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain.ts';
// import { withdrawAllAndReset } from '../utils/rewards.ts';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.ts';

test.beforeAll(async () => {
  await setErc20Balance(mkrAddress[TENDERLY_CHAIN_ID], '100');
});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Seal' }).click();
});

test('Lock MKR, select rewards, select delegate, and open position', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'About Seal Rewards' }).nth(1)).toBeVisible();
  await page.getByRole('checkbox').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByTestId('supply-first-input-lse-balance')).toHaveText('100 MKR');

  // fill seal and borrow inputs and click next
  await page.getByTestId('supply-first-input-lse').fill('100');
  await page.getByTestId('borrow-input-lse').fill('38000');

  // TODO: check all the params
  await expect(page.getByTestId('widget-button')).toBeEnabled();
  await page.getByTestId('widget-button').click();

  // select rewards
  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByRole('button', { name: 'USDS' }).click();
  await expect(page.getByTestId('widget-button')).toBeEnabled();
  await page.getByTestId('widget-button').click();

  // select delegate
  await expect(page.getByText('Choose your delegate')).toBeVisible();
  await page.getByRole('button', { name: '0x278' }).click();
  await expect(page.getByTestId('widget-button')).toBeEnabled();
  await page.getByTestId('widget-button').click();

  // position summary
  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible();
  await expect(page.getByTestId('widget-container').getByText('Sealing')).toBeVisible();
  await expect(page.getByText('100 MKR')).toBeVisible();
  await expect(page.getByTestId('widget-container').getByText('Borrowing')).toBeVisible();
  await expect(page.getByText('38,000 USDS')).toBeVisible();
  await expect(page.getByTestId('widget-container').getByText('Seal reward')).toBeVisible();

  // approval
  await approveOrPerformAction(page, 'Approve seal amount');
  expect(page.getByRole('heading', { name: 'Token access approved' })).toBeVisible();

  // confirm position
  await approveOrPerformAction(page, 'Continue');
  expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible();
  await expect(
    page.getByText("You've borrowed 38,000 USDS by sealing 100 MKR. Your new position is open.")
  ).toBeVisible();

  // positions overview
  await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  await expect(page.getByText('Position 1')).toBeVisible();

  // manage position
  await page.getByRole('button', { name: 'Manage Position' }).click();
  await expect(page.getByText('Your position 1')).toBeVisible();
  await expect(page.getByTestId('borrow-input-lse-balance')).toHaveText('Limit 0 <> 15,593 USDS');

  // borrow more and skip rewards and delegate selection
  await page.getByTestId('borrow-input-lse').fill('100');
  await expect(page.getByText('Insufficient collateral')).not.toBeVisible();
  await page.getByTestId('widget-button').click();

  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();
  await expect(page.getByText('Choose your delegate')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();

  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible();
  await approveOrPerformAction(page, 'Confirm');
  expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible();
  await expect(page.getByText("You've borrowed 100 USDS. Your position is updated.")).toBeVisible();
  await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  await expect(page.getByText('Position 1')).toBeVisible();

  // repay all
  // await page.getByRole('button', { name: 'Manage Position' }).click();
  // await expect(page.getByText('Your position 1')).toBeVisible();
  // await expect(page.getByTestId('borrow-input-lse-balance')).toHaveText('Limit 0 <> 15,493 USDS');

  // // switch tabs
  // await page.getByRole('tab', { name: 'Unseal and pay back' }).click();
  // await expect(page.getByTestId('repay-input-lse-balance')).toHaveText('Limit 0 <> 28,100, or 38,100 USDS');

  // // click repay 100% button
  // await page.getByRole('button', { name: '100%' }).nth(1).click();
  // // due to stability fee accumulation, the exact repay amount will change based on time
  // const repayValue = Number(await page.getByTestId('repay-input-lse').inputValue());
  // expect(repayValue).toBeGreaterThan(38100);
  // expect(repayValue).toBeLessThan(38101);
  // await page.getByTestId('widget-button').click();

  // // skip the rewards and delegates and confirm position
  // await expect(page.getByText('Choose your reward token')).toBeVisible();
  // await page.getByRole('button', { name: 'skip' }).click();
  // await expect(page.getByText('Choose your delegate')).toBeVisible();
  // await page.getByRole('button', { name: 'skip' }).click();

  // await expect(page.getByText('Confirm your position').nth(0)).toBeVisible();

  // // need to approve
  // await approveOrPerformAction(page, 'Approve repay amount');
  // expect(page.getByRole('heading', { name: 'Token access approved' })).toBeVisible();

  // await approveOrPerformAction(page, 'Continue');
  // expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible();
  // await expect(page.getByText("You've borrowed 100 USDS. Your position is updated.")).toBeVisible();
  // await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  // await expect(page.getByText('Position 1')).toBeVisible();

  // unseal all
  await page.getByRole('button', { name: 'Manage Position' }).click();
  await expect(page.getByText('Your position 1')).toBeVisible();

  // switch tabs
  await page.getByRole('tab', { name: 'Unseal and pay back' }).click();
  await expect(page.getByTestId('supply-first-input-lse-balance')).toHaveText('100 MKR');

  // fill some MKR and proceed to skip the rewards and delegates and confirm position
  await page.getByTestId('supply-first-input-lse').fill('0.5');
  await page.getByTestId('widget-button').click();

  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();
  await expect(page.getByText('Choose your delegate')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();

  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible();

  await approveOrPerformAction(page, 'Confirm');
  expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible();
  await expect(
    page.getByText("You've unsealed 0.5 MKR to exit your position. An exit fee was applied.")
  ).toBeVisible();
  await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  await expect(page.getByText('Position 1')).toBeVisible();
});
