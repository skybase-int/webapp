import { formatNumber } from '@jetstreamgg/utils';
import { useCallback } from 'react';
import { RewardContract, useAvailableTokenRewardContracts } from '@jetstreamgg/hooks';
import { useChainId } from 'wagmi';
import { getRetainedQueryParams } from '@/modules/ui/hooks/useRetainedQueryParams';
import { useSearchParams } from 'react-router-dom';
import { IntentMapping, QueryParams } from '@/lib/constants';
import { t } from '@lingui/macro';

export const useActionForToken = () => {
  const chainId = useChainId();
  const rewardContracts = useAvailableTokenRewardContracts(chainId);
  const skyRewardContract = rewardContracts?.find(
    (rewardContract: RewardContract) => rewardContract.rewardToken.symbol === 'SKY'
  );
  const [searchParams] = useSearchParams();
  const isRestricted = import.meta.env.VITE_RESTRICTED_BUILD === 'true';

  const actionForToken = useCallback(
    (symbol: string, balance: string) => {
      const { LinkedAction, InputAmount, SourceToken, TargetToken, Widget, Locale, Details } = QueryParams;
      const { REWARDS_INTENT: REWARD, UPGRADE_INTENT: UPGRADE, TRADE_INTENT: TRADE } = IntentMapping;
      const retainedParams = [Locale, Details];

      const lowerSymbol = symbol.toLowerCase();
      let action;

      // TODO: What do we suggest for SKY?
      switch (lowerSymbol) {
        case 'dai':
          action = isRestricted
            ? {
                label: t`Upgrade your ${formatNumber(parseFloat(balance))} ${symbol.toUpperCase()} to USDS`,
                actionUrl: getRetainedQueryParams(
                  `?${Widget}=${UPGRADE}&${InputAmount}=${balance}`,
                  retainedParams,
                  searchParams
                ),
                image: `/tokens/actions/${lowerSymbol}.png`
              }
            : {
                label: t`Upgrade your ${formatNumber(parseFloat(balance))} ${symbol.toUpperCase()} to USDS to get rewards`,
                actionUrl: getRetainedQueryParams(
                  `?${Widget}=${UPGRADE}&${InputAmount}=${balance}&${LinkedAction}=${REWARD}&${skyRewardContract ? `&reward=${skyRewardContract.contractAddress}` : ''}`,
                  retainedParams,
                  searchParams
                ),
                image: `/tokens/actions/${lowerSymbol}.png`
              };
          break;
        case 'mkr':
          action = isRestricted
            ? undefined
            : {
                label: t`Upgrade your ${formatNumber(parseFloat(balance))} ${symbol.toUpperCase()} to SKY`,
                actionUrl: getRetainedQueryParams(
                  `?${Widget}=${UPGRADE}&${InputAmount}=${balance}&${SourceToken}=MKR`,
                  retainedParams,
                  searchParams
                ),
                image: `/tokens/actions/${lowerSymbol}.png`
              };
          break;
        case 'usds':
          action = isRestricted
            ? undefined
            : {
                label: t`Get rewards with your ${formatNumber(parseFloat(balance))} ${symbol.toUpperCase()}`,
                actionUrl: getRetainedQueryParams(
                  `?${Widget}=${REWARD}&${InputAmount}=${balance}&${skyRewardContract ? `&reward=${skyRewardContract.contractAddress}` : ''}`,
                  retainedParams,
                  searchParams
                ),
                image: `/tokens/actions/${lowerSymbol}.png`
              };
          break;
        // TODO: SKY, what do we suggest?
        case 'usdc':
        case 'usdt':
          // TODO: Uncomment eth-weth when their trades to USDS are supported
          // case 'eth':
          // case 'weth':
          action = isRestricted
            ? {
                label: t`Trade your ${formatNumber(parseFloat(balance))} ${symbol.toUpperCase()} for USDS`,
                // TODO: Some of these trades are not supported by the trade widget (eth - usds, weth - usds)
                actionUrl: getRetainedQueryParams(
                  `?${Widget}=${TRADE}&${InputAmount}=${balance}&${SourceToken}=${symbol}&${TargetToken}=USDS`,
                  retainedParams,
                  searchParams
                ),
                image: `/tokens/actions/${lowerSymbol}.png`
              }
            : {
                label: t`Trade your ${formatNumber(parseFloat(balance))} ${symbol.toUpperCase()} for USDS to get rewards`,
                // TODO: Some of these trades are not supported by the trade widget (eth - usds, weth - usds)
                actionUrl: getRetainedQueryParams(
                  `?${Widget}=${TRADE}&${InputAmount}=${balance}&${SourceToken}=${symbol}&${TargetToken}=USDS&${LinkedAction}=${REWARD}&${skyRewardContract ? `&reward=${skyRewardContract.contractAddress}` : ''}`,
                  retainedParams,
                  searchParams
                ),
                image: `/tokens/actions/${lowerSymbol}.png`
              };
          break;
        default:
          action = undefined;
      }

      return action;
    },
    [skyRewardContract, searchParams, isRestricted]
  );

  return actionForToken;
};
