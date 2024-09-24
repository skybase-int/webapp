import { SavingsRateCard } from '@/modules/savings/components/SavingsRateCard';
import { SkySavingsRatePoolCard } from '@/modules/savings/components/SkySavingsRatePoolCard';
import { SavingsSuppliersCard } from '@/modules/savings/components/SavingsSuppliersCard';

export function SavingsInfoDetails() {
  return (
    <div className="flex w-full flex-wrap justify-between gap-3 xl:flex-nowrap">
      <SavingsRateCard />
      <SkySavingsRatePoolCard />
      <SavingsSuppliersCard />
    </div>
  );
}
