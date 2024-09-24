import { ErrorBoundary } from '@/modules/layout/components/ErrorBoundary';
import { UsdsSkyTotalsChart } from '@/modules/ui/components/UsdsSkyTotalsChart';

export const UpgradeChart = () => {
  return (
    <div>
      <ErrorBoundary variant="small">
        <UsdsSkyTotalsChart />
      </ErrorBoundary>
    </div>
  );
};
