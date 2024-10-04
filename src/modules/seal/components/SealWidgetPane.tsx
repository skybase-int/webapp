import { SealModuleWidget, TxStatus, WidgetStateChangeParams, SealFlow } from '@jetstreamgg/widgets';
import { REFRESH_DELAY } from '@/lib/constants';
import { SharedProps } from '@/modules/app/types/Widgets';
import { LinkedActionSteps } from '@/modules/config/context/ConfigContext';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { useSearchParams } from 'react-router-dom';
import { deleteSearchParams } from '@/modules/utils/deleteSearchParams';

export function SealWidgetPane(sharedProps: SharedProps) {
  const { linkedActionConfig, updateLinkedActionConfig, exitLinkedActionMode } = useConfigContext();
  // TODO: Implemet `useSealHistory` hook
  const refreshSealHistory = () => {};
  // const { mutate: refreshSealHistory } = useSealHistory();
  const [, setSearchParams] = useSearchParams();

  const onSealWidgetStateChange = ({ hash, txStatus, widgetState }: WidgetStateChangeParams) => {
    // After a successful linked action open flow, set the final step to "success"
    if (
      widgetState.flow === SealFlow.OPEN &&
      txStatus === TxStatus.SUCCESS &&
      linkedActionConfig.step === LinkedActionSteps.COMPLETED_CURRENT
    ) {
      updateLinkedActionConfig({ step: LinkedActionSteps.COMPLETED_SUCCESS });
    }

    // Reset the linked action state and URL params after clicking "finish"
    if (txStatus === TxStatus.IDLE && linkedActionConfig.step === LinkedActionSteps.COMPLETED_SUCCESS) {
      exitLinkedActionMode();
      setSearchParams(prevParams => {
        const params = deleteSearchParams(prevParams);
        return params;
      });
    }

    if (
      hash &&
      txStatus === TxStatus.SUCCESS &&
      [SealFlow.OPEN, SealFlow.MANAGE].includes(widgetState.flow)
    ) {
      setTimeout(() => {
        refreshSealHistory();
      }, REFRESH_DELAY);
    }
  };
  return (
    <SealModuleWidget
      {...sharedProps}
      onWidgetStateChange={onSealWidgetStateChange}
      externalWidgetState={{ amount: linkedActionConfig?.inputAmount }}
    />
  );
}
