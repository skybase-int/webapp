import { StatsCard } from '@/modules/ui/components/StatsCard';
import { t } from '@lingui/macro';
import { Text } from '@/modules/layout/components/Typography';
import { useSavingsData } from '@jetstreamgg/hooks';
import { formatBigInt } from '@jetstreamgg/utils';

export function SkySavingsRatePoolCard(): React.ReactElement {
  const { data, isLoading, error } = useSavingsData();
  const tvl = data && formatBigInt(data.savingsTvl);

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
