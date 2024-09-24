import { useUpgradeTotals } from '@jetstreamgg/hooks';
import { formatBigInt } from '@jetstreamgg/utils';
import { t } from '@lingui/macro';
import { StatsCard } from '@/modules/ui/components/StatsCard';
import { TokenIconWithBalance } from '@/modules/ui/components/TokenIconWithBalance';

export function UpgradedDaiToUsds() {
  const { data, isLoading, error } = useUpgradeTotals();

  return (
    <StatsCard
      title={t`Total DAI upgraded`}
      isLoading={isLoading}
      error={error}
      content={
        <TokenIconWithBalance
          className="mt-2"
          token={{ symbol: 'DAI', name: 'dai' }}
          balance={data?.totalDaiUpgraded ? formatBigInt(data?.totalDaiUpgraded) : '0'}
        />
      }
    />
  );
}
