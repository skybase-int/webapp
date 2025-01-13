import { Heading, Text } from './Typography';
import { Button } from '@/components/ui/button';
import { useCustomConnectModal } from '@/modules/ui/hooks/useCustomConnectModal';
import { Trans, t } from '@lingui/macro';
import { GradientShapeCard } from '@/modules/ui/components/GradientShapeCard';
import { Intent } from '@/lib/enums';
import { useChainId } from 'wagmi';
import { isBaseChainId } from '@jetstreamgg/utils';

export function ConnectCard({ intent }: { intent: Intent }) {
  const connect = useCustomConnectModal();
  const chainId = useChainId();
  const isBaseChain = isBaseChainId(chainId);

  const heading = {
    [Intent.BALANCES_INTENT]: t`About Balances`,
    [Intent.REWARDS_INTENT]: t`About Sky Token Rewards`,
    [Intent.SAVINGS_INTENT]: t`About the Sky Savings Rate`,
    [Intent.UPGRADE_INTENT]: t`Ready to upgrade and explore?`,
    [Intent.TRADE_INTENT]: t`About Trade`,
    [Intent.SEAL_INTENT]: t`About Seal Engine`
  };

  const contentText = {
    [Intent.BALANCES_INTENT]: isBaseChain
      ? t`Balances displays all of your Sky-related funds available on the Base network. When you connect your crypto wallet to Sky.money to access the decentralised Sky Protocol, only the tokens in the wallet that are relevant to the app on Base are listed. With this visibility, you can better self-manage your funds. Sky.money is non-custodial and permissionless.`
      : t`Balances displays all of your Sky-related funds. When you connect your crypto wallet to Sky.money to access the decentralised Sky Protocol, only the tokens in the wallet that are relevant to the app are listed. With all of your Sky funds visible in one place, you can better self-manage your funds. Sky.money is non-custodial and permissionless.`,
    [Intent.REWARDS_INTENT]: t`Sky Tokens Rewards are what you access when you supply USDS to the Sky Token Rewards module of the decentralised Sky Protocol. Sky Token Rewards are in the form of SKY governance tokens. No minimum USDS supply amount is required. With the Sky Protocol, you can access rewards without giving up control of your supplied funds.`,
    [Intent.SAVINGS_INTENT]: isBaseChain
      ? t`The experience of supplying stablecoins to the Savings widget on Base and Ethereum is very similar. However, given that no native Sky Savings Rate module is deployed to Base, when on Base you always interact with the Peg Stability Module (PSM) for conversions to/from USDS, sUSDS and USDC. The PSM on Base handles conversions between these pairs directly. PSMs are smart contracts designed to maintain the stability of stablecoins and allow users to trade certain stablecoins directly with the Sky Protocol at a fixed rate and with relatively low fees.`
      : t`When you supply USDS to the Sky Savings Rate module of the decentralised Sky Protocol, you access the Sky Saving Rate and may accumulate additional USDS over time. No minimum supply amount is required, and you always maintain control of your supplied funds, as this feature is non-custodial.`,
    [Intent.UPGRADE_INTENT]: t`Your DeFi journey with Sky is just beginning. Connect your wallet to access the decentralised Sky Protocol and upgrade your DAI to USDS, and your MKR to SKY. Unlocking all the Sky Protocol has to offer, without giving up control, is easy. `,
    [Intent.TRADE_INTENT]: isBaseChain
      ? t`On Base, you can trade between USDS, sUSDS and USDC through a PSM (Peg Stability Module) deployed to the Base blockchain and powered by Spark. PSMs are smart contracts designed to maintain the stability of stablecoins and allow users to trade certain stablecoins directly with the Sky Protocol at a fixed rate and with relatively low fees.`
      : t`Directly trade eligible tokens for Sky ecosystem tokens using permissionless and non-custodial rails. With the Sky.money interface, you can access the decentralised Sky Protocol to trade, via smart contracts on the blockchain instead of relying on centralised entities.`,
    [Intent.SEAL_INTENT]: t`The Seal Engine is a module of the Sky Protocol. The MKR and or SKY tokens you supply to the Seal Engine are sealed behind an exit fee in order to provide access to Seal Rewards and encourage a deeper commitment to Sky ecosystem governance. With Sky, you always remain in control of your funds.`
  };

  return (
    <GradientShapeCard
      colorLeft="radial-gradient(100% 177.78% at 100% 0%, #A273FF 0%, #4331E9 100%)"
      colorMiddle="radial-gradient(circle at 0% 100%, #FFCD6B 0%, #EB5EDF 150%)"
      colorRight="#2A197D"
    >
      <div className="w-[80%] space-y-2 lg:w-1/2" data-testid="connect-wallet-card">
        <Heading className="mb-2">{heading[intent]}</Heading>
        <Text variant="small" className="leading-[18px]">
          {contentText[intent]}
        </Text>
      </div>
      <Button
        className="mt-3 w-fit border-border px-6 py-6 lg:mt-0"
        variant="outline"
        onClick={connect}
        data-testid="connect-wallet-card-button"
      >
        <Trans>Connect wallet</Trans>
      </Button>
    </GradientShapeCard>
  );
}
