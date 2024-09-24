import { getBalancesFaqItems } from '../getBalancesFaqItems';
import { FaqAccordion } from '@/modules/ui/components/FaqAccordion';

export function BalancesFaq() {
  const faqItems = getBalancesFaqItems();

  return <FaqAccordion items={faqItems} />;
}
