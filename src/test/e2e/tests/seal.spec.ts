import { expect, test } from '@playwright/test';
import '../mock-rpc-call.ts';
import '../mock-vpn-check.ts';
// import { approveOrPerformAction } from '../utils/approveOrPerformAction.ts';
// import { setErc20Balance } from '../utils/setBalance.ts';
// import { usdsAddress } from '@jetstreamgg/hooks';
// import { TENDERLY_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain.ts';
// import { withdrawAllAndReset } from '../utils/rewards.ts';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.ts';

// test.beforeAll(async () => {
//   await setErc20Balance(usdsAddress[TENDERLY_CHAIN_ID], '100');
// });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Seal' }).click();
});

test('initial seal module test', async ({ page }) => {
  await expect(page.getByText('About Seal Rewards')).toBeVisible();
});
