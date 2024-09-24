import { StatsCard } from '@/modules/ui/components/StatsCard';
import { Text } from '@/modules/layout/components/Typography';
import { t } from '@lingui/macro';
import { useRewardsSuppliersCount } from '../hooks/useRewardsSuppliersCount';

export function RewardsSuppliersCard() {
  const { data: suppliers, isLoading, error } = useRewardsSuppliersCount();
  return (
    <StatsCard
      title={t`Rewards Suppliers`}
      isLoading={isLoading}
      error={error}
      content={
        <Text className="mt-2" variant="large">
          {`${suppliers}`}
        </Text>
      }
    />
  );
}
