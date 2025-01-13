import { RewardContract } from '@jetstreamgg/hooks';
import { getRewardsFaqItems } from '../lib/getRewardsFaqItems';
import { FaqAccordion } from '@/modules/ui/components/FaqAccordion';
import { getRewardsCleFaqItems } from '../lib/getRewardsCleFaqItems';
import { useChainId } from 'wagmi';

export function RewardsFaq({ rewardContract }: { rewardContract?: RewardContract }) {
  const chainId = useChainId();
  const isRestricted = import.meta.env.VITE_RESTRICTED_BUILD === 'true';
  const faqItems =
    rewardContract?.rewardToken.symbol === 'CLE'
      ? getRewardsCleFaqItems(chainId).filter(({ type }) => !isRestricted || type !== 'restricted')
      : getRewardsFaqItems(chainId).filter(({ type }) => !isRestricted || type !== 'restricted');

  return <FaqAccordion items={faqItems} />;
}
