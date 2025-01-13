import {
  TradeWidget,
  TxStatus,
  TradeAction,
  WidgetStateChangeParams,
  BaseTradeWidget
} from '@jetstreamgg/widgets';
import { defaultConfig } from '../../config/default-config';
import { useChainId, useConfig as useWagmiConfig } from 'wagmi';
import { QueryParams, REFRESH_DELAY } from '@/lib/constants';
import { SharedProps } from '@/modules/app/types/Widgets';
import { LinkedActionSteps } from '@/modules/config/context/ConfigContext';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { useCustomNavigation } from '@/modules/ui/hooks/useCustomNavigation';
import { capitalizeFirstLetter } from '@/lib/helpers/string/capitalizeFirstLetter';
import { useSearchParams } from 'react-router-dom';
import { updateParamsFromTransaction } from '@/modules/utils/updateParamsFromTransaction';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { isBaseChainId } from '@jetstreamgg/utils';

export function TradeWidgetPane(sharedProps: SharedProps) {
  const chainId = useChainId();

  const queryClient = useQueryClient();
  const { linkedActionConfig, updateLinkedActionConfig } = useConfigContext();

  const wagmiConfig = useWagmiConfig();
  const [, setSearchParams] = useSearchParams();

  const { onNavigate, setCustomHref, customNavLabel, setCustomNavLabel } = useCustomNavigation();

  const isBase = isBaseChainId(chainId);

  const onTradeWidgetStateChange = ({
    hash,
    txStatus,
    widgetState,
    executedBuyAmount
  }: WidgetStateChangeParams) => {
    // After a successful trade, set the linked action step to "success"
    if (
      widgetState.action === TradeAction.TRADE &&
      txStatus === TxStatus.SUCCESS &&
      linkedActionConfig.step === LinkedActionSteps.CURRENT_FUTURE
    ) {
      updateLinkedActionConfig({ step: LinkedActionSteps.SUCCESS_FUTURE });
    }

    if (
      widgetState.action === TradeAction.TRADE &&
      (txStatus === TxStatus.LOADING || txStatus === TxStatus.SUCCESS)
    ) {
      queryClient.invalidateQueries({ queryKey: ['trade-history'] });
    }

    if (
      hash &&
      txStatus === TxStatus.SUCCESS &&
      widgetState.action === TradeAction.TRADE &&
      linkedActionConfig?.linkedAction
    ) {
      updateParamsFromTransaction(hash, wagmiConfig, setSearchParams);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['trade-history'] });
      }, REFRESH_DELAY);
    }

    // When we're ready to proceed with the next LA step, set the href & nav label accordingly
    if (
      txStatus === TxStatus.SUCCESS &&
      widgetState.action === TradeAction.TRADE &&
      linkedActionConfig?.linkedAction &&
      linkedActionConfig.step === LinkedActionSteps.SUCCESS_FUTURE
    ) {
      const widget = linkedActionConfig.linkedAction;
      const reward = linkedActionConfig.rewardContract
        ? `&${QueryParams.Reward}=${linkedActionConfig.rewardContract}`
        : '';
      setCustomHref(
        `/?${QueryParams.Widget}=${widget}&${QueryParams.InputAmount}=${executedBuyAmount}&${QueryParams.LinkedAction}=${widget}${reward}`
      );
      setCustomNavLabel(`Go to ${capitalizeFirstLetter(linkedActionConfig.linkedAction)}`);
    } else {
      setCustomHref(undefined);
      setCustomNavLabel(undefined);
    }
  };

  const externalWidgetState = useMemo(
    () => ({
      amount: linkedActionConfig?.inputAmount,
      token: linkedActionConfig?.sourceToken?.toUpperCase(),
      targetToken: linkedActionConfig?.targetToken?.toUpperCase(),
      timestamp: linkedActionConfig?.timestamp ? Number(linkedActionConfig?.timestamp) : undefined
    }),
    [linkedActionConfig]
  );

  const Widget = isBase ? BaseTradeWidget : TradeWidget;

  return (
    <Widget
      key={externalWidgetState.timestamp}
      {...sharedProps}
      disallowedPairs={defaultConfig.tradeDisallowedPairs}
      customTokenList={defaultConfig.tradeTokenList[chainId]}
      onWidgetStateChange={onTradeWidgetStateChange}
      customNavigationLabel={customNavLabel}
      onCustomNavigation={onNavigate}
      externalWidgetState={externalWidgetState}
    />
  );
}
