import { getUpgradeFaqItems } from '../getUpgradeFaqItems';
import { FaqAccordion } from '@/modules/ui/components/FaqAccordion';

export function UpgradeFaq() {
  const faqItems = getUpgradeFaqItems();

  return <FaqAccordion items={faqItems} />;
}
