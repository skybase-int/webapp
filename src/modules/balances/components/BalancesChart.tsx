import { ErrorBoundary } from '@/modules/layout/components/ErrorBoundary';
import { UsdsSkyTotalsChart } from '@/modules/ui/components/UsdsSkyTotalsChart';

export function BalancesChart() {
  return (
    <div>
      <ErrorBoundary variant="small">
        <UsdsSkyTotalsChart />
      </ErrorBoundary>
    </div>
  );
}
