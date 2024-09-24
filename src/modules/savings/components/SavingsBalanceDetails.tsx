import { useSavingsData } from '@jetstreamgg/hooks';
import { SuppliedBalanceCard, UnsuppliedBalanceCard } from '@/modules/ui/components/BalanceCards';

export function SavingsBalanceDetails() {
  const { data, isLoading, error } = useSavingsData();
  const token = { name: 'USDS', symbol: 'USDS' };
  return (
    <div className="flex w-full flex-col justify-between gap-3 xl:flex-row">
      <SuppliedBalanceCard
        balance={data?.userSavingsBalance || 0n}
        isLoading={isLoading}
        token={token}
        error={error}
      />
      <UnsuppliedBalanceCard
        balance={data?.userNstBalance || 0n}
        isLoading={isLoading}
        token={token}
        error={error}
      />
    </div>
  );
}
