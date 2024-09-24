import { Page } from '@playwright/test';
import { mockRpcCalls } from '../mock-rpc-call';

const URL = 'https://virtual.mainnet.rpc.tenderly.co/**';

export const interceptAndRejectTransactions = async (
  page: Page,
  delayMs: number = 0,
  shouldAllowReadCalls: boolean = false
) => {
  await page.route(URL, async (route, request) => {
    await new Promise(resolve => setTimeout(resolve, delayMs));
    const isReadCall = request.postData()?.includes('eth_call');
    if (shouldAllowReadCalls && isReadCall) {
      route.continue();
    } else {
      route.abort();
    }
  });
};

export const revertInterception = async (page: Page) => {
  // Revert all interceptions for the given URL
  await page.unroute(URL);
  // Reapply the mockRpcCalls interception
  await page.route(URL, mockRpcCalls);
};
