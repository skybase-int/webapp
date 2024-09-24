import { readFile } from 'fs/promises';

export const distributeRewards = async () => {
  const file = await readFile('./tenderlyTestnetData.json', 'utf-8');
  const { TENDERLY_RPC_URL } = JSON.parse(file);
  const VESTED_REWARDS_DISTRIBUTION = '0x81ed8e0325b17a266b2af225570679cfd635d0bb'; // Address of the `VestedRewardsDistribution` contract

  const distributeResponse = await fetch(TENDERLY_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 0,
      method: 'eth_sendTransaction',
      params: [
        {
          from: '0x0000000000000000000000000000000000000000',
          to: VESTED_REWARDS_DISTRIBUTION,
          gas: '0x7A1200',
          gasPrice: '0x0',
          value: '0x0',
          data: '0xe4fc6b6d'
        }
      ]
    })
  });

  if (!distributeResponse.ok) {
    throw new Error(`Error: ${distributeResponse.statusText}`);
  }

  const blockMineResponse = await fetch(TENDERLY_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'evm_increaseTime',
      params: ['0xE10']
    })
  });

  if (!blockMineResponse.ok) {
    throw new Error(`Error: ${blockMineResponse.statusText}`);
  }
};
