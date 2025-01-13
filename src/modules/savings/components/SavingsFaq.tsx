import { useChainId } from 'wagmi';
import { getSavingsFaqItems } from '../getSavingsFaqItems';
import { FaqAccordion } from '@/modules/ui/components/FaqAccordion';

export function SavingsFaq() {
  const chainId = useChainId();
  const faqItems = getSavingsFaqItems(chainId);

  return <FaqAccordion items={faqItems} />;
}
