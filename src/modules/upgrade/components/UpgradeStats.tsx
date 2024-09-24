import { UpgradedMkrToSky } from './UpgradedMkrToSky';
import { UpgradedDaiToUsds } from './UpgradedDaiToUsds';

export function UpgradeStats() {
  const isRestricted = import.meta.env.VITE_RESTRICTED_BUILD === 'true';

  return (
    <div
      data-testid="upgrade-stats-details"
      className="flex w-full flex-wrap justify-between gap-3 xl:flex-nowrap"
    >
      <UpgradedDaiToUsds />
      {!isRestricted && <UpgradedMkrToSky />}
    </div>
  );
}
