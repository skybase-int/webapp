import { getTradeFaqItems } from '../getTradeFaqItems';
import { FaqAccordion } from '@/modules/ui/components/FaqAccordion';

export function TradeFaq() {
  const faqItems = getTradeFaqItems();

  return <FaqAccordion items={faqItems} />;
}
