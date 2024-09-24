import { defineChain } from 'viem';
import tenderlyTestnetData from '../../../../tenderlyTestnetData.json';

export const TENDERLY_CHAIN_ID = 314311;
// only works if hardcoded, cannot be set via env variable
export const TENDERLY_RPC_URL =
  'https://virtual.mainnet.rpc.tenderly.co/bb05a98c-57d2-425c-8b2e-97431886f42c';

export const getTestTenderlyChain = () => {
  const { TENDERLY_RPC_URL: TEMP_RPC_URL } = tenderlyTestnetData;
  const rpc = TEMP_RPC_URL || TENDERLY_RPC_URL;
  return defineChain({
    id: TENDERLY_CHAIN_ID,
    name: 'Tenderly',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: [rpc] }
    }
  });
};
