import { getRewardsFaqItems } from '../lib/getRewardsFaqItems';
import { FaqAccordion } from '@/modules/ui/components/FaqAccordion';

export function RewardsFaq() {
  const isRestricted = import.meta.env.VITE_RESTRICTED_BUILD === 'true';
  const faqItems = getRewardsFaqItems().filter(({ type }) => !isRestricted || type !== 'restricted');

  return <FaqAccordion items={faqItems} />;
}
