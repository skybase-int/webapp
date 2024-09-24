import { getSavingsFaqItems } from '../getSavingsFaqItems';
import { FaqAccordion } from '@/modules/ui/components/FaqAccordion';

export function SavingsFaq() {
  const faqItems = getSavingsFaqItems();

  return <FaqAccordion items={faqItems} />;
}
