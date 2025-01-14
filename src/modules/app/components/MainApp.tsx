import { useEffect } from 'react';
import { WidgetPane } from './WidgetPane';
import { DetailsPane } from './DetailsPane';
import { AppContainer } from './AppContainer';
import { useSearchParams } from 'react-router-dom';
import { CHAIN_WIDGET_MAP, COMING_SOON_MAP, QueryParams, mapQueryParamToIntent } from '@/lib/constants';
import { Intent } from '@/lib/enums';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { validateLinkedActionSearchParams, validateSearchParams } from '@/modules/utils/validateSearchParams';
import { useAvailableTokenRewardContracts } from '@jetstreamgg/hooks';
import { useAccount, useAccountEffect, useChainId, useChains, useSwitchChain } from 'wagmi';
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
  const chains = useChains();

  const { connector } = useAccount();
  useAccountEffect({
    // Once the user connects their wallet, check if the network param is set and switch chains if necessary
    onConnect() {
      const parsedChainId = chains.find(chain => chain.name.toLowerCase() === network?.toLowerCase())?.id;
      if (parsedChainId) {
        switchChain({ chainId: parsedChainId });
      }
    }
  });

  const { switchChain } = useSwitchChain({
    mutation: {
      onError: err => {
        // If the user rejects the network switch request, update the network query param to the current chain
        if (err.name === 'UserRejectedRequestError') {
          const chainName = chains.find(c => c.id === chainId)?.name;
          if (chainName) {
            setSearchParams(params => {
              params.set(QueryParams.Network, chainName.toLowerCase());
              return params;
            });
          }
        }
      }
    }
  });

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
  const network = searchParams.get(QueryParams.Network) || undefined;

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
          setSelectedRewardContract,
          chainId
        );
        // Runs second validation for linked-action-specific criteria
        const validatedLinkedActionParams = validateLinkedActionSearchParams(validatedParams);
        return validatedLinkedActionParams;
      },
      { replace: true }
    );
  }, [searchParams, rewardContracts, setSelectedRewardContract, widgetParam]);

  useEffect(() => {
    // If there's no network param, default to the current chain
    if (!network) {
      const chainName = chains.find(c => c.id === chainId)?.name;
      if (chainName)
        setSearchParams(params => {
          params.set(QueryParams.Network, chainName.toLowerCase());
          return params;
        });
    } else {
      // If the network param doesn't match the current chain, switch chains
      const parsedChainId = chains.find(chain => chain.name.toLowerCase() === network.toLowerCase())?.id;
      if (parsedChainId && parsedChainId !== chainId) {
        switchChain({ chainId: parsedChainId });
      }
    }
  }, [network]);

  useEffect(() => {
    // If the user changes the network in their wallet, update the `network` query param
    const handleChainChange = ({ chainId: newChainId }: { chainId?: number | undefined }) => {
      const newChainName = chains.find(c => c.id === newChainId)?.name;
      if (newChainName) {
        setSearchParams(params => {
          params.set(QueryParams.Network, newChainName.toLowerCase());
          return params;
        });
      }
    };

    const emitter = connector?.emitter;
    emitter?.on('change', handleChainChange);

    // Cleanup function to remove the listener
    return () => {
      emitter?.off('change', handleChainChange);
    };
  }, [chains, connector, setSearchParams]);

  useEffect(() => {
    // Updates the active widget pane in the config
    let validatedWidgetParam: Intent | undefined;
    if (widgetParam) {
      validatedWidgetParam = mapQueryParamToIntent(widgetParam);
    }

    updateUserConfig({
      ...userConfig,
      // If user selected intent is not available for the current network, default to the balances intent
      intent:
        validatedWidgetParam ??
        // Use the user config intent if found in the chain widget map, but not on the coming soon map for the given network
        CHAIN_WIDGET_MAP[chainId].find(
          intent =>
            intent === mapQueryParamToIntent(userConfig.intent) &&
            // If there is no coming soon map for the current network, default to true
            (!COMING_SOON_MAP[chainId]?.includes(mapQueryParamToIntent(userConfig.intent)) ?? true)
        ) ??
        Intent.BALANCES_INTENT
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
