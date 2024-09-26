import {
  STAGING_URL_SKY_SUBGRAPH_MAINNET,
  PROD_URL_SKY_SUBGRAPH_MAINNET,
  STAGING_URL_SKY_SUBGRAPH_TESTNET
} from '@/lib/constants';
import { useState, useEffect } from 'react';
import { useChainId } from 'wagmi';
import { mainnet } from 'viem/chains';
import { tenderly } from '@/data/wagmi/config/config.default';

export function useSubgraphUrl() {
  const chainId = useChainId();
  const [subgraphUrl, setSubgraphUrl] = useState('');

  useEffect(() => {
    if (import.meta.env.VITE_ENV_NAME === 'staging' || import.meta.env.VITE_ENV_NAME === 'development') {
      switch (chainId) {
        case mainnet.id:
          setSubgraphUrl(STAGING_URL_SKY_SUBGRAPH_MAINNET);
          break;
        case tenderly.id:
          setSubgraphUrl(STAGING_URL_SKY_SUBGRAPH_TESTNET);
          break;
        default:
          setSubgraphUrl(PROD_URL_SKY_SUBGRAPH_MAINNET);
      }
    } else {
      setSubgraphUrl(PROD_URL_SKY_SUBGRAPH_MAINNET);
    }
  }, [chainId]);

  return subgraphUrl;
}
