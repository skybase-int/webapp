import { useContext, useMemo } from 'react';
import { RewardsOverview } from './RewardsOverview';
import { RewardsDetailsView } from './RewardsDetailsView';
import { ConfigContext } from '@/modules/config/context/ConfigContext';
import { ActiveRewardsDetailsView } from '@/modules/rewards/helpers/rewards.constants';

export function RewardsDetailsPane() {
  const { selectedRewardContract } = useContext(ConfigContext);
  const view = useMemo(
    () => (selectedRewardContract ? ActiveRewardsDetailsView.DETAILS : ActiveRewardsDetailsView.OVERVIEW),
    [selectedRewardContract]
  );

  return view === ActiveRewardsDetailsView.DETAILS ? (
    <RewardsDetailsView rewardContract={selectedRewardContract} />
  ) : (
    <RewardsOverview />
  );
}
