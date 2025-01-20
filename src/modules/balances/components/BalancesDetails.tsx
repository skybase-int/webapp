import { DetailSection } from '@/modules/ui/components/DetailSection';
import { DetailSectionRow } from '@/modules/ui/components/DetailSectionRow';
import { DetailSectionWrapper } from '@/modules/ui/components/DetailSectionWrapper';
import { t } from '@lingui/core/macro';
import { BalancesModuleShowcase } from './BalancesModuleShowcase';
import { BalancesAssets } from './BalancesAssets';
import { BalancesSkyStatsOverview } from './BalancesSkyStatsOverview';
import { useBreakpointIndex, BP } from '@/modules/ui/hooks/useBreakpointIndex';
import { BalancesChart } from './BalancesChart';
import { BoostedRewardsClaim } from '@/modules/rewards/components/BoostedRewardsClaim';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { BalancesFaq } from './BalancesFaq';

export function BalancesDetails() {
  const { bpi } = useBreakpointIndex();
  const isDesktop = bpi > BP.lg;
  const { isConnectedAndAcceptedTerms } = useConnectedContext();

  return (
    <DetailSectionWrapper>
      {/* BoostedRewardsClaim is only rendered if the user is connected and has rewards to claim */}
      <BoostedRewardsClaim />

      {isConnectedAndAcceptedTerms && (
        <DetailSectionRow>
          <BalancesModuleShowcase />
        </DetailSectionRow>
      )}
      {/* only render this section on desktop */}
      {isConnectedAndAcceptedTerms && isDesktop && (
        <DetailSection title={t`Your funds`}>
          <DetailSectionRow>
            <BalancesAssets />
          </DetailSectionRow>
        </DetailSection>
      )}
      <DetailSection title={t`Sky Protocol overview`}>
        <DetailSectionRow>
          <BalancesSkyStatsOverview />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`Sky Protocol activity`}>
        <DetailSectionRow>
          <BalancesChart />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`FAQs`}>
        <DetailSectionRow>
          <BalancesFaq />
        </DetailSectionRow>
      </DetailSection>
    </DetailSectionWrapper>
  );
}
