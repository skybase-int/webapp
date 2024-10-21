import { IntentMapping, QueryParams, REFRESH_DELAY } from '@/lib/constants';
import { Intent } from '@/lib/enums';
import { useSubgraphUrl } from '@/modules/app/hooks/useSubgraphUrl';
import { SharedProps } from '@/modules/app/types/Widgets';
import { LinkedActionSteps } from '@/modules/config/context/ConfigContext';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { deleteSearchParams } from '@/modules/utils/deleteSearchParams';
import { RewardContract, useRewardsUserHistory } from '@jetstreamgg/hooks';
import { RewardsAction, RewardsWidget, TxStatus, WidgetStateChangeParams } from '@jetstreamgg/widgets';
import { useSearchParams } from 'react-router-dom';

export function RewardsWidgetPane(sharedProps: SharedProps) {
  const subgraphUrl = useSubgraphUrl();
  const {
    selectedRewardContract,
    setSelectedRewardContract,
    linkedActionConfig,
    updateLinkedActionConfig,
    exitLinkedActionMode
  } = useConfigContext();
  const { mutate: refreshRewardsHistory } = useRewardsUserHistory({
    rewardContractAddress: selectedRewardContract?.contractAddress || '',
    subgraphUrl
  });

  const [, setSearchParams] = useSearchParams();

  const onRewardContractChange = (rewardContract?: RewardContract) => {
    setSearchParams(params => {
      if (rewardContract?.contractAddress) {
        params.set(QueryParams.Widget, IntentMapping[Intent.REWARDS_INTENT]);
        params.set(QueryParams.Reward, rewardContract.contractAddress);
      } else {
        params.delete(QueryParams.Reward);
      }
      return params;
    });
    setSelectedRewardContract(rewardContract);
  };

  const onRewardsWidgetStateChange = ({ hash, txStatus, widgetState }: WidgetStateChangeParams) => {
    // After a successful linked action supply, set the step to "success"
    if (
      widgetState.action === RewardsAction.SUPPLY &&
      txStatus === TxStatus.SUCCESS &&
      linkedActionConfig.step === LinkedActionSteps.COMPLETED_CURRENT
    ) {
      updateLinkedActionConfig({ step: LinkedActionSteps.COMPLETED_SUCCESS });
    }

    // Reset the linked action state and URL params after clicking "finish"
    if (txStatus === TxStatus.IDLE && linkedActionConfig.step === LinkedActionSteps.COMPLETED_SUCCESS) {
      exitLinkedActionMode();
      setSearchParams((prevParams: URLSearchParams) => {
        const params = deleteSearchParams(prevParams);
        return params;
      });
    }

    if (
      hash &&
      txStatus === TxStatus.SUCCESS &&
      [RewardsAction.SUPPLY, RewardsAction.WITHDRAW].includes(widgetState.action)
    ) {
      setTimeout(() => {
        refreshRewardsHistory();
      }, REFRESH_DELAY);
    }
  };

  return (
    <RewardsWidget
      {...sharedProps}
      onRewardContractChange={onRewardContractChange}
      externalWidgetState={{ selectedRewardContract, amount: linkedActionConfig?.inputAmount }}
      onWidgetStateChange={onRewardsWidgetStateChange}
    />
  );
}
