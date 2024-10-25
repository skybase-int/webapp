import { Button } from '@/components/ui/button';
import { Trans } from '@lingui/macro';
import { ExternalLinkIcon } from 'lucide-react';
import { ExternalLink } from '@/modules/layout/components/ExternalLink';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { getEtherscanLink } from '@jetstreamgg/utils';
import { useChainId } from 'wagmi';
import { sealModuleAddress } from '@jetstreamgg/hooks';
import { GradientShapeCard } from './GradientShapeCard';

export const AboutSealModule = () => {
  const chainId = useChainId();

  const sealEtherscanLink = getEtherscanLink(
    chainId,
    sealModuleAddress[chainId as keyof typeof sealModuleAddress],
    'address'
  );

  return (
    <GradientShapeCard
      colorLeft="radial-gradient(258.73% 268.92% at 116.69% 275.4%, #F7A7F9 0%, #6D28FF 100%)"
      colorMiddle="linear-gradient(0deg, #F7A7F9 0%, #00DDFB 300%)"
      colorRight="bg-card"
      className="mb-6"
    >
      <div className="w-[80%] space-y-2 lg:w-1/2">
        <Heading>
          <Trans>About the Seal Engine</Trans>
        </Heading>
        <Text variant="small">
          <Trans>
            Seal Rewards are accessed when you supply MKR to the Seal Engine of the decentralised Sky
            Protocol. Your supplied MKR tokens, as well as any rewards accumulated, automatically enter a
            non-custodial smart contract, which allows you to always remain in control of your supplied
            assets. The types of Seal Rewards and rates are determined by Sky ecosystem governance.
          </Trans>
        </Text>
      </div>
      <ExternalLink href={sealEtherscanLink} showIcon={false} className="mt-3 w-fit lg:mt-0">
        <Button variant="outline" className="gap-2 border-border">
          <Trans>View contract</Trans>
          <ExternalLinkIcon size={16} />
        </Button>
      </ExternalLink>
    </GradientShapeCard>
  );
};
