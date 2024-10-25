import { useEffect } from 'react';
import { WidgetPane } from './WidgetPane';
import { DetailsPane } from './DetailsPane';
import { AppContainer } from './AppContainer';
import { useSearchParams } from 'react-router-dom';
import { QueryParams, mapQueryParamToIntent } from '@/lib/constants';
import { Intent } from '@/lib/enums';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { validateLinkedActionSearchParams, validateSearchParams } from '@/modules/utils/validateSearchParams';
import { useAvailableTokenRewardContracts } from '@jetstreamgg/hooks';
import { useChainId } from 'wagmi';
import { BP, useBreakpointIndex } from '@/modules/ui/hooks/useBreakpointIndex';
import { LinkedActionSteps } from '@/modules/config/context/ConfigContext';

export function MainApp() {
  const {
    userConfig,
    updateUserConfig,
    linkedActionConfig,
    updateLinkedActionConfig,
    setSelectedRewardContract
  } = useConfigContext();

  const { bpi } = useBreakpointIndex();

  const { intent } = userConfig;
  const chainId = useChainId();

  const rewardContracts = useAvailableTokenRewardContracts(chainId);
  const [searchParams, setSearchParams] = useSearchParams();

  const widgetParam = searchParams.get(QueryParams.Widget);
  const detailsParam = !(searchParams.get(QueryParams.Details) === 'false');
  const rewardContract = searchParams.get(QueryParams.Reward) || undefined;
  const sourceToken = searchParams.get(QueryParams.SourceToken) || undefined;
  const targetToken = searchParams.get(QueryParams.TargetToken) || undefined;
  const linkedAction = searchParams.get(QueryParams.LinkedAction) || undefined;
  const inputAmount = searchParams.get(QueryParams.InputAmount) || undefined;
  const timestamp = searchParams.get(QueryParams.Timestamp) || undefined;

  // step is initialized as 0 and will evaluate to false, setting the first step to 1
  const step = linkedAction ? linkedActionConfig.step || 1 : 0;

  // Run validation on search params whenever search params change
  useEffect(() => {
    setSearchParams(
      params => {
        // Runs initial validation for globally allowed params
        const validatedParams = validateSearchParams(
          params,
          rewardContracts,
          widgetParam || '',
          setSelectedRewardContract
        );
        // Runs second validation for linked-action-specific criteria
        const validatedLinkedActionParams = validateLinkedActionSearchParams(validatedParams);
        return validatedLinkedActionParams;
      },
      { replace: true }
    );
  }, [searchParams, rewardContracts, setSelectedRewardContract, widgetParam]);

  useEffect(() => {
    // Updates the active widget pane in the config
    let validatedWidgetParam: Intent | undefined;
    if (widgetParam) {
      validatedWidgetParam = mapQueryParamToIntent(widgetParam);
    }

    updateUserConfig({
      ...userConfig,
      intent: validatedWidgetParam ?? userConfig.intent
    });
  }, [widgetParam, userConfig.intent]);

  useEffect(() => {
    updateLinkedActionConfig({
      sourceToken,
      targetToken,
      // Only update the initialAction value if we are on the first widget
      initialAction:
        step < LinkedActionSteps.COMPLETED_CURRENT ? widgetParam : linkedActionConfig.initialAction,
      linkedAction,
      inputAmount,
      rewardContract,
      step,
      showLinkedAction: !!linkedAction,
      timestamp
    });
  }, [
    sourceToken,
    targetToken,
    linkedAction,
    inputAmount,
    step,
    widgetParam,
    linkedActionConfig.initialAction
  ]);

  return (
    <AppContainer>
      <WidgetPane intent={intent}>
        {bpi === BP.sm && detailsParam && <DetailsPane intent={intent} />}
      </WidgetPane>
      {bpi > BP.sm && detailsParam && <DetailsPane intent={intent} />}
    </AppContainer>
  );
}
