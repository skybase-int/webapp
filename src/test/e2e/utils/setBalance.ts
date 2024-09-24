import { readFile } from 'fs/promises';
import { TEST_ADDRESS } from './constants';
import { parseEther, parseUnits, toHex } from 'viem';

export async function backOffRetry<T>(fn: () => Promise<T>, retries: number, delay: number): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay * 1000));
    return backOffRetry(fn, retries - 1, delay * 2);
  }
}

const setEthBalanceRequest = async (amount: string) => {
  const file = await readFile('./tenderlyTestnetData.json', 'utf-8');
  const { TENDERLY_RPC_URL } = JSON.parse(file);

  const response = await fetch(TENDERLY_RPC_URL, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      method: 'tenderly_setBalance',
      params: [[TEST_ADDRESS], toHex(parseEther(amount))],
      id: 42,
      jsonrpc: '2.0'
    })
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
};

export const setEthBalance = async (amount: string) => {
  await backOffRetry(() => setEthBalanceRequest(amount), 3, 2);
};

const setErc20BalanceRequest = async (tokenAddress: string, amount: string, decimals: number = 18) => {
  const file = await readFile('./tenderlyTestnetData.json', 'utf-8');
  const { TENDERLY_RPC_URL } = JSON.parse(file);

  const response = await fetch(TENDERLY_RPC_URL, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      method: 'tenderly_setErc20Balance',
      params: [tokenAddress, [TEST_ADDRESS], toHex(parseUnits(amount, decimals))],
      id: 42,
      jsonrpc: '2.0'
    })
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
};

export const setErc20Balance = async (tokenAddress: string, amount: string, decimals: number = 18) => {
  await backOffRetry(() => setErc20BalanceRequest(tokenAddress, amount, decimals), 3, 2);
};
