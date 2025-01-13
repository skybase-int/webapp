import { RewardContract } from '@jetstreamgg/hooks';
import { SUPPORTED_TOKEN_SYMBOLS } from '@jetstreamgg/widgets';
import {
  QueryParams,
  IntentMapping,
  VALID_LINKED_ACTIONS,
  CHAIN_WIDGET_MAP,
  mapQueryParamToIntent,
  COMING_SOON_MAP
} from '@/lib/constants';
import { Intent } from '@/lib/enums';
import { defaultConfig } from '../config/default-config';
import { isBaseChainId } from '@jetstreamgg/utils';

export const validateSearchParams = (
  searchParams: URLSearchParams,
  rewardContracts: RewardContract[],
  widget: string,
  setSelectedRewardContract: (rewardContract?: RewardContract) => void,
  chainId: number
) => {
  const isBaseChain = isBaseChainId(chainId);

  searchParams.forEach((value, key) => {
    // removes any query param not found in QueryParams
    if (!Object.values(QueryParams).includes(key as QueryParams)) {
      searchParams.delete(key);
    }

    // removes details param if value is not true or false
    if (key === QueryParams.Details && !['true', 'false'].includes(value.toLowerCase())) {
      searchParams.delete(key);
    }

    // removes widget param is value is not valid
    if (
      key === QueryParams.Widget &&
      (!Object.values(IntentMapping).includes(value.toLowerCase()) ||
        !CHAIN_WIDGET_MAP[chainId].includes(mapQueryParamToIntent(value)) ||
        COMING_SOON_MAP[chainId]?.includes(mapQueryParamToIntent(value)))
    ) {
      searchParams.delete(key);
    }

    // removes rewards param if value is not a valid reward contract address
    // also sets the selected reward contract if the reward contract address is valid
    if (key === QueryParams.Reward) {
      const rewardContract = rewardContracts?.find(
        f => f.contractAddress.toLowerCase() === value.toLowerCase()
      );
      if (!rewardContract) {
        searchParams.delete(key);
      } else {
        setSelectedRewardContract(rewardContract);
      }
    }

    // if widget changes to something other than rewards, and we're not in a rewards linked action, reset the selected reward contract
    if (
      widget !== IntentMapping[Intent.REWARDS_INTENT] &&
      searchParams.get(QueryParams.LinkedAction) !== IntentMapping[Intent.REWARDS_INTENT]
    ) {
      searchParams.delete(QueryParams.Reward);
      setSelectedRewardContract(undefined);
    }

    // validate source token
    if (key === QueryParams.SourceToken) {
      // source token is only valid for upgrade and trade in Mainnet, and for savings and trade in Base, remove if widget value is not correct
      const widgetParam = searchParams.get(QueryParams.Widget);
      if (
        !widgetParam ||
        (![IntentMapping[Intent.UPGRADE_INTENT], IntentMapping[Intent.TRADE_INTENT]].includes(
          widgetParam.toLowerCase()
        ) &&
          !isBaseChain) ||
        (![IntentMapping[Intent.SAVINGS_INTENT], IntentMapping[Intent.TRADE_INTENT]].includes(
          widgetParam.toLowerCase()
        ) &&
          isBaseChain)
      ) {
        searchParams.delete(key);
      }

      // if widget is upgrade, only valid source token is MKR or DAI
      if (widgetParam?.toLowerCase() === IntentMapping[Intent.UPGRADE_INTENT]) {
        if (!['mkr', 'dai'].includes(value.toLowerCase())) {
          searchParams.delete(key);
        }
      }

      // if widget is trade, check if token is valid
      if (widgetParam?.toLowerCase() === IntentMapping[Intent.TRADE_INTENT]) {
        const tradeValidValues = Object.values(SUPPORTED_TOKEN_SYMBOLS).map(symbol => symbol.toLowerCase());
        if (!tradeValidValues.includes(value.toLowerCase())) {
          searchParams.delete(key);
        }
      }
    }

    // validate target token
    if (key === QueryParams.TargetToken) {
      // target token is only valid on trade widget
      const widgetParam = searchParams.get(QueryParams.Widget);
      if (!widgetParam || ![IntentMapping[Intent.TRADE_INTENT]].includes(widgetParam.toLowerCase())) {
        searchParams.delete(key);
      }

      // check if token is supported
      const tradeValidValues = Object.values(SUPPORTED_TOKEN_SYMBOLS).map(symbol => symbol.toLowerCase());
      if (!tradeValidValues.includes(value.toLowerCase())) {
        searchParams.delete(key);
      }

      // check if target token is valid based off source token
      const sourceToken = searchParams.get(QueryParams.SourceToken);
      if (sourceToken) {
        const disallowedPairs = defaultConfig.tradeDisallowedPairs;
        const pairsToCheck = disallowedPairs[sourceToken.toUpperCase()];
        if (pairsToCheck?.includes(value.toUpperCase())) {
          searchParams.delete(key);
        }
      }
    }

    // validate input amount
    if (key === QueryParams.InputAmount) {
      // check if input amount is not a valid number or is negative
      if (isNaN(Number(value)) || Number(value) <= 0) {
        searchParams.delete(key);
      }
    }

    // removes linked action param if value is not valid
    if (key === QueryParams.LinkedAction && !VALID_LINKED_ACTIONS.includes(value.toLowerCase())) {
      // TODO here we could also check if it's a valid linked action based on the combination of widget and LA value
      searchParams.delete(key);
    }
  });

  return searchParams;
};

// This is intended to be run immediately after the global validation function
export const validateLinkedActionSearchParams = (searchParams: URLSearchParams) => {
  const linkedActionParam = searchParams.get(QueryParams.LinkedAction);
  // Only run this validation if we are in linked action mode
  if (linkedActionParam) {
    searchParams.forEach((value, key) => {
      if (key === QueryParams.SourceToken) {
        const widgetParam = searchParams.get(QueryParams.Widget);

        // Only DAI is allowed as a source token for Upgrade when in linked action
        if (widgetParam?.toLowerCase() === IntentMapping[Intent.UPGRADE_INTENT]) {
          if (value.toLowerCase() !== 'dai') {
            searchParams.delete(key);
          }
        }
      }

      // Only USDS is allowed as a target token for Trade when in linked action
      if (key === QueryParams.TargetToken) {
        const widgetParam = searchParams.get(QueryParams.Widget);

        if (widgetParam?.toLowerCase() === IntentMapping[Intent.TRADE_INTENT]) {
          if (value.toLowerCase() !== 'usds') {
            searchParams.delete(key);
          }
        }
      }
    });
  }
  return searchParams;
};
