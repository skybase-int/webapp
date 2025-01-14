import { UpgradedDaiToUsds } from '@/modules/upgrade/components/UpgradedDaiToUsds';
import { UpgradedMkrToSky } from '@/modules/upgrade/components/UpgradedMkrToSky';
import { RewardsSuppliersCard } from '@/modules/rewards/components/RewardsSuppliersCard';
import { SavingsRateCard } from '@/modules/savings/components/SavingsRateCard';
import { SkySavingsRatePoolCard } from '@/modules/savings/components/SkySavingsRatePoolCard';
import { UsdsTotalSupplyCard } from '@/modules/ui/components/UsdsTotalSupplyCard';
import { SavingsSuppliersCard } from '@/modules/savings/components/SavingsSuppliersCard';

export function BalancesSkyStatsOverview(): React.ReactElement {
  const isRestricted = import.meta.env.VITE_RESTRICTED_BUILD === 'true';

  return (
    <div className="scrollbar-thin flex w-full flex-col justify-between gap-3 lg:overflow-x-scroll  xl:flex-row">
      <UsdsTotalSupplyCard />
      {!isRestricted && <SavingsRateCard />}
      {!isRestricted && <SkySavingsRatePoolCard />}
      <UpgradedMkrToSky />
      <UpgradedDaiToUsds />
      {!isRestricted && <RewardsSuppliersCard />}
      {!isRestricted && <SavingsSuppliersCard />}
    </div>
  );
}
