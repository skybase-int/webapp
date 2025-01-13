import { useSubgraphUrl } from '@/modules/app/hooks/useSubgraphUrl';
import { StatsCard } from '@/modules/ui/components/StatsCard';
import { TokenIconWithBalance } from '@/modules/ui/components/TokenIconWithBalance';
import { useUpgradeTotals } from '@jetstreamgg/hooks';
import { formatBigInt, isBaseChainId } from '@jetstreamgg/utils';
import { t } from '@lingui/macro';
import { useChainId } from 'wagmi';

export function UpgradedMkrToSky() {
  const chainId = useChainId();
  const chainIdToUse = isBaseChainId(chainId) ? 1 : chainId; // Display mainnet data on Base
  const subgraphUrl = useSubgraphUrl(chainIdToUse);
  const { data, isLoading, error } = useUpgradeTotals({ subgraphUrl });

  return (
    <StatsCard
      title={t`Total MKR upgraded`}
      isLoading={isLoading}
      error={error}
      content={
        <TokenIconWithBalance
          className="mt-2"
          token={{ symbol: 'MKR', name: 'mkr' }}
          balance={data?.totalMkrUpgraded ? formatBigInt(data?.totalMkrUpgraded) : '0'}
          chainId={chainIdToUse}
        />
      }
    />
  );
}
