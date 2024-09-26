import { useSubgraphUrl } from '@/modules/app/hooks/useSubgraphUrl';
import { StatsCard } from '@/modules/ui/components/StatsCard';
import { TokenIconWithBalance } from '@/modules/ui/components/TokenIconWithBalance';
import { useUpgradeTotals } from '@jetstreamgg/hooks';
import { formatBigInt } from '@jetstreamgg/utils';
import { t } from '@lingui/macro';

export function UpgradedMkrToSky() {
  const subgraphUrl = useSubgraphUrl();
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
        />
      }
    />
  );
}
