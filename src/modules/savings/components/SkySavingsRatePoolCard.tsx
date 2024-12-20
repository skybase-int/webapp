import { StatsCard } from '@/modules/ui/components/StatsCard';
import { t } from '@lingui/macro';
import { Text } from '@/modules/layout/components/Typography';
import { useOverallSkyData } from '@jetstreamgg/hooks';
import { formatNumber } from '@jetstreamgg/utils';

export function SkySavingsRatePoolCard(): React.ReactElement {
  const { data, isLoading, error } = useOverallSkyData();
  const tvl = data && formatNumber(parseFloat(data.totalSavingsTvl));

  return (
    <StatsCard
      title={t`Sky Savings Rate Pool`}
      content={
        <Text className="mt-2" variant="large">
          {tvl} USDS/DAI
        </Text>
      }
      isLoading={isLoading}
      error={error}
    />
  );
}
