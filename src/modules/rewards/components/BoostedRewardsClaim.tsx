import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useBoostedRewards } from '@/modules/rewards/hooks/useBoostedRewards';
import { Rewards, RewardsEmpty, Rocket } from '@/modules/icons';
import { TokenIconWithBalance } from '@/modules/ui/components/TokenIconWithBalance';
import { Trans } from '@lingui/macro';
import { useAccount } from 'wagmi';
import { formatBigInt } from '@jetstreamgg/utils';
import { mapIntentToQueryParam } from '@/lib/constants';
import { Intent } from '@/lib/enums';
import { Link } from 'react-router-dom';

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
            <Button size="xs" variant="chip" className="bg-primary" asChild>
              <Link to={`/?widget=${mapIntentToQueryParam(Intent.REWARDS_INTENT)}`}>
                <Trans>Claim all</Trans>
              </Link>
            </Button>
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
