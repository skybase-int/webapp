import { defineChain } from 'viem';
import { readFileSync } from 'fs';

export const TENDERLY_CHAIN_ID = 314310;
// only works if hardcoded, cannot be set via env variable. Corresponds to the public RPC of `mainnet_sep_30_0`
export const TENDERLY_RPC_URL =
  'https://virtual.mainnet.rpc.tenderly.co/b333d3ac-c24f-41fa-ad41-9176fa719ac3';

export const getTestTenderlyChain = () => {
  const tenderlyTestnetData = readFileSync('../../../../tenderlyTestnetData.json', 'utf8');
  const parsedData = JSON.parse(tenderlyTestnetData);
  const { TENDERLY_RPC_URL: TEMP_RPC_URL } = parsedData;
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
