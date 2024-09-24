import { AboutSky } from '@/modules/ui/components/AboutSky';
import { AboutUsds } from '@/modules/ui/components/AboutUsds';

export function UpgradeAbout() {
  const isRestricted = import.meta.env.VITE_RESTRICTED_BUILD === 'true';

  return (
    <div>
      <AboutUsds />
      {!isRestricted && <AboutSky />}
    </div>
  );
}
