import { readFile } from 'fs/promises';
import { NetworkName, TEST_ADDRESS } from './constants';
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

const setEthBalanceRequest = async (amount: string, network = NetworkName.mainnet) => {
  const file = await readFile('./tenderlyTestnetData.json', 'utf-8');
  const [{ TENDERLY_RPC_URL: TENDERLY_MAINNET_RPC_URL }, { TENDERLY_RPC_URL: TENDERLY_BASE_RPC_URL }] =
    JSON.parse(file);
  const rpcUrl = network === NetworkName.mainnet ? TENDERLY_MAINNET_RPC_URL : TENDERLY_BASE_RPC_URL;

  const response = await fetch(rpcUrl, {
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

export const setEthBalance = async (amount: string, network = NetworkName.mainnet) => {
  await backOffRetry(() => setEthBalanceRequest(amount, network), 3, 2);
};

const setErc20BalanceRequest = async (
  tokenAddress: string,
  amount: string,
  decimals: number = 18,
  network = NetworkName.mainnet
) => {
  const file = await readFile('./tenderlyTestnetData.json', 'utf-8');
  const [{ TENDERLY_RPC_URL: TENDERLY_MAINNET_RPC_URL }, { TENDERLY_RPC_URL: TENDERLY_BASE_RPC_URL }] =
    JSON.parse(file);
  const rpcUrl = network === NetworkName.mainnet ? TENDERLY_MAINNET_RPC_URL : TENDERLY_BASE_RPC_URL;

  const response = await fetch(rpcUrl, {
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

export const setErc20Balance = async (
  tokenAddress: string,
  amount: string,
  decimals: number = 18,
  network = NetworkName.mainnet
) => {
  await backOffRetry(() => setErc20BalanceRequest(tokenAddress, amount, decimals, network), 3, 2);
};
