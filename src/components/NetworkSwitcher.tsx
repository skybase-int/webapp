import { tenderlyBase } from '@/data/wagmi/config/config.default';
import { MainnetNetwork, BaseNetwork } from '@/modules/icons';
import { useChainModal } from '@rainbow-me/rainbowkit';
import { base } from 'viem/chains';
import { useChainId } from 'wagmi';
import { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipTrigger } from './ui/tooltip';
import { Text } from '@/modules/layout/components/Typography';
import { Trans } from '@lingui/macro';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { Intent } from '@/lib/enums';

export function NetworkSwitcer() {
  const chainId = useChainId();
  const { openChainModal } = useChainModal();
  const { userConfig } = useConfigContext();

  const { intent } = userConfig;
  const supportedMultichainWidgets = [
    Intent.BALANCES_INTENT,
    // TODO: Uncomment once rewards in Base support is added
    // Intent.REWARDS_INTENT,
    Intent.SAVINGS_INTENT,
    Intent.TRADE_INTENT
  ];

  if (!supportedMultichainWidgets.includes(intent)) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-pointer" onClick={openChainModal}>
          {chainId === base.id || chainId === tenderlyBase.id ? <BaseNetwork /> : <MainnetNetwork />}
        </div>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent arrowPadding={10}>
          <Text variant="small">
            <Trans>Switch network</Trans>
          </Text>
          <TooltipArrow width={12} height={8} />
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}
