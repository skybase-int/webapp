import { Intent } from '@/lib/enums';
import { HStack } from '@/modules/layout/components/HStack';
import { t } from '@lingui/macro';
import { ModuleCard } from '@/modules/balances/components/ModuleCard';
import { useChainId } from 'wagmi';
import { isBaseChainId } from '@jetstreamgg/utils';

export function BalancesModuleShowcase() {
  const isRestrictedBuild = import.meta.env.VITE_RESTRICTED_BUILD === 'true';
  const isRestrictedMiCa = import.meta.env.VITE_RESTRICTED_BUILD_MICA === 'true';
  const chainId = useChainId();
  const isBase = isBaseChainId(chainId);

  return (
    <HStack className="mb-8 flex-wrap items-stretch gap-3 space-x-0">
      {!isRestrictedBuild && (
        <>
          <ModuleCard
            intent={Intent.REWARDS_INTENT}
            module={t`Rewards`}
            title={t`Access rewards without giving up control`}
            className="bg-sky-blue"
            notAvailable={isBase}
            soon={isBase}
          />
          <ModuleCard
            intent={Intent.SAVINGS_INTENT}
            module={t`Savings`}
            title={t`Access the Sky Savings Rate`}
            className="bg-sky-purple"
          />
        </>
      )}
      {!isRestrictedMiCa && (
        <ModuleCard
          intent={Intent.TRADE_INTENT}
          module={t`Trade`}
          title={t`Trade your crypto tokens`}
          className="bg-sky-purplish-blue"
        />
      )}
      <ModuleCard
        intent={Intent.UPGRADE_INTENT}
        module={t`Upgrade`}
        title={t`Upgrade your DAI and MKR`}
        className="bg-sky-pink"
        notAvailable={isBase}
      />
    </HStack>
  );
}
