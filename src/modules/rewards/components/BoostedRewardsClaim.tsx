import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useBoostedRewards } from '@/modules/rewards/hooks/useBoostedRewards';
import { Hourglass, Rewards, RewardsEmpty, Rocket } from '@/modules/icons';
import { TokenIconWithBalance } from '@/modules/ui/components/TokenIconWithBalance';
import { Text } from '@/modules/layout/components/Typography';
import { Trans } from '@lingui/macro';
import { useAccount } from 'wagmi';
import { formatBigInt } from '@jetstreamgg/utils';

export const BoostedRewardsClaim = () => {
  const { address } = useAccount();
  const { data, isLoading, error } = useBoostedRewards({ address });

  if (!address || !data || error || !data?.qualified) {
    return null;
  }

  return (
    <div className="mb-8">
      <Card variant="stats" className="flex justify-between border border-borderPurple">
        <div className="flex flex-col justify-center">
          <div className="align-center mb-2 flex items-center">
            <CardTitle variant="stats">
              <Trans>Boosted Rewards</Trans>
            </CardTitle>
            <Rocket className="ml-1 mr-2" height="16" width="18" />
            {/* TODO: Implement boosted rewards claim functionality once they're available */}
            <Button size="xs" variant="chip" disabled={true} onClick={() => {}}>
              <Trans>Claim all</Trans>
            </Button>
            <Text className="ml-2 text-sm font-normal leading-tight text-textSecondary">
              <Trans>Coming soon</Trans>
            </Text>
            <Hourglass className="ml-1" height="16" width="11" />
          </div>
          {isLoading ? (
            <Skeleton className="h5 w-16" />
          ) : (
            <TokenIconWithBalance
              token={{ symbol: 'SKY', name: 'New Governance Token' }}
              balance={formatBigInt(data.rewards)}
            />
          )}
        </div>
        {data?.rewards && data?.rewards > 0 ? <Rewards /> : <RewardsEmpty />}
      </Card>
    </div>
  );
};
