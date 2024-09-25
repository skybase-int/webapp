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

export function SealDetails(): React.ReactElement {
  const { isConnectedAndAcceptedTerms } = useConnectedContext();
  const { linkedActionConfig } = useConfigContext();
  const { data: actionData } = useUserSuggestedActions();
  const widget = IntentMapping.SEAL_INTENT;

  return (
    <DetailSectionWrapper>
      <DetailSection title={t`Your position 01`}>
        <DetailSectionRow>
          {/* TODO: Add this section */}
          <></>
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`Position 01 details`}>
        <DetailSectionRow>
          {/* TODO: Add this section */}
          <></>
        </DetailSectionRow>
      </DetailSection>
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
          {/* TODO: Add this section */}
          <></>
        </DetailSectionRow>
      </DetailSection>
      {isConnectedAndAcceptedTerms && (
        <DetailSection title={t`Your Seal transaction history`}>
          <DetailSectionRow>
            {/* TODO: Add this section */}
            <></>
          </DetailSectionRow>
        </DetailSection>
      )}
      <DetailSection title={t`Vault stats`}>
        <DetailSectionRow>
          {/* TODO: Add this section */}
          <></>
        </DetailSectionRow>
      </DetailSection>
      <DetailSection title={t`FAQs`}>
        <DetailSectionRow>
          {/* TODO: Add this section */}
          <></>
        </DetailSectionRow>
      </DetailSection>
    </DetailSectionWrapper>
  );
}
