import { useChainId } from 'wagmi';
import { getBalancesFaqItems } from '../getBalancesFaqItems';
import { FaqAccordion } from '@/modules/ui/components/FaqAccordion';

export function BalancesFaq() {
  const chainId = useChainId();
  const faqItems = getBalancesFaqItems(chainId);

  return <FaqAccordion items={faqItems} />;
}
