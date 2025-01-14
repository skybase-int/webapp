import { Button } from '@/components/ui/button';
import { Trans } from '@lingui/macro';
import { ExternalLinkIcon } from 'lucide-react';
import { ExternalLink } from '@/modules/layout/components/ExternalLink';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { getEtherscanLink } from '@jetstreamgg/utils';
import { useChainId } from 'wagmi';
import { usdsAddress } from '@jetstreamgg/hooks';
import { GradientShapeCard } from './GradientShapeCard';

export const AboutUsds = () => {
  const chainId = useChainId();

  const nstEtherscanLink = getEtherscanLink(
    chainId,
    usdsAddress[chainId as keyof typeof usdsAddress],
    'address'
  );

  return (
    <GradientShapeCard
      colorLeft="radial-gradient(200.08% 406.67% at 5.14% 108.47%, #4331E9 0%, #2A197D 21.68%)"
      colorMiddle="linear-gradient(43deg, #F7A7F9 -2.45%, #6D28FF 100%)"
      colorRight="#1e1a4b"
      className="mb-6"
    >
      <div className="w-[80%] space-y-2 lg:w-1/2">
        <Heading>
          <Trans>USDS</Trans>
        </Heading>
        <Text variant="small">
          <Trans>
            USDS is the stablecoin of the decentralised Sky Protocol. It can be used in several ways,
            including to participate in the Sky Savings Rate and get Sky Token Rewards without giving up
            control. It is the upgraded version of DAI.
          </Trans>
        </Text>
      </div>
      <ExternalLink href={nstEtherscanLink} showIcon={false} className="mt-3 w-fit lg:mt-0">
        <Button variant="outline" className="gap-2 border-border">
          <Trans>View contract</Trans>
          <ExternalLinkIcon size={16} />
        </Button>
      </ExternalLink>
    </GradientShapeCard>
  );
};
