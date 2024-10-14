import { t } from '@lingui/macro';
import { DetailSectionWrapper } from '@/modules/ui/components/DetailSectionWrapper';
import { DetailSection } from '@/modules/ui/components/DetailSection';
import { DetailSectionRow } from '@/modules/ui/components/DetailSectionRow';
import { ActionsShowcase } from '@/modules/ui/components/ActionsShowcase';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import { IntentMapping } from '@/lib/constants';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { useUserSuggestedActions } from '@/modules/ui/hooks/useUserSuggestedActions';
import { filterActionsByIntent } from '@/lib/utils';
import { AboutSealModule } from '@/modules/ui/components/AboutSealModule';
import { SealFaq } from './SealFaq';
import { SealPositionOverview } from './SealPositionOverview';
import { SealPositionDetailsSection } from './SealPositionDetailsSection';
import { SealRewardsOverview } from './SealRewardsOverview';
import { SealHistory } from './SealHistory';

export function SealPositionDetails({ positionIndex }: { positionIndex?: number }): React.ReactElement {
  const { isConnectedAndAcceptedTerms } = useConnectedContext();
  const { linkedActionConfig } = useConfigContext();
  const { data: actionData } = useUserSuggestedActions();
  const widget = IntentMapping.SEAL_INTENT;
  return (
    <DetailSectionWrapper>
      {!!positionIndex && (
        <>
          <DetailSection title={t`Your position ${positionIndex}`}>
            <DetailSectionRow>
              <SealPositionOverview positionIndex={positionIndex} />
            </DetailSectionRow>
          </DetailSection>
          <SealPositionDetailsSection positionIndex={positionIndex} />
        </>
      )}
      {isConnectedAndAcceptedTerms &&
        !linkedActionConfig?.showLinkedAction &&
        (filterActionsByIntent(actionData?.linkedActions || [], widget).length ?? 0) > 0 && (
          <DetailSection title={t`Combined actions`}>
            <DetailSectionRow>
              <ActionsShowcase widget={widget} />
            </DetailSectionRow>
          </DetailSection>
        )}
      <DetailSection title={t`About Seal module`}>
        <DetailSectionRow>
          <AboutSealModule />
        </DetailSectionRow>
      </DetailSection>
      {isConnectedAndAcceptedTerms && (
        <DetailSection title={t`Your Seal transaction history`}>
          <DetailSectionRow>
            <SealHistory />
          </DetailSectionRow>
        </DetailSection>
      )}
      <DetailSection title={t`Rewards overview`}>
        <DetailSectionRow>
          <SealRewardsOverview />
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`FAQs`}>
        <DetailSectionRow>
          <SealFaq />
        </DetailSectionRow>
      </DetailSection>
    </DetailSectionWrapper>
  );
}
