import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Intent } from '@/lib/enums';
import { mapIntentToQueryParam } from '@/lib/constants';
import { t, Trans } from '@lingui/macro';
import { cn } from '@/lib/utils';
import { HStack } from '@/modules/layout/components/HStack';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { useRetainedQueryParams } from '@/modules/ui/hooks/useRetainedQueryParams';
import { ChainModal } from '@/modules/ui/components/ChainModal';
import { isBaseChainId } from '@jetstreamgg/utils';
import { useChainId } from 'wagmi';

type ModuleCardProps = {
  className: string;
  title: string;
  intent: Intent;
  module: string;
  notAvailable?: boolean;
  soon?: boolean;
};

export const ModuleCard = ({ className, title, intent, module, notAvailable, soon }: ModuleCardProps) => {
  const chainId = useChainId();
  const isBase = isBaseChainId(chainId);
  const url = useRetainedQueryParams(`/?widget=${mapIntentToQueryParam(intent)}`);
  const content = (
    <>
      {soon && (
        <Text
          variant="small"
          className="absolute -top-3 right-2 z-10 rounded-full bg-primary px-1.5 py-0 text-text md:px-2 md:py-1"
        >
          <Trans>Soon on Base</Trans>
        </Text>
      )}
      <Card className={cn('relative flex h-full flex-col justify-between bg-[length:100%_100%]', className)}>
        <CardTitle
          className={`mb-7 text-left font-custom-450 font-normal leading-8 ${notAvailable ? '' : ''}`}
        >
          {t`${title}`}
        </CardTitle>
        <CardContent className="relative p-0 pb-2">
          <HStack className="items-center justify-between">
            <Heading variant="extraSmall" className="text-left">
              {notAvailable ? t`View on Mainnet` : t`Go to ${isBase ? 'Base' : ''} ${module}`}
            </Heading>
            <ArrowRight />
          </HStack>
        </CardContent>
      </Card>
    </>
  );

  return (
    <>
      <Link
        to={url}
        className={`relative flex flex-1 basis-full flex-col xl:basis-[20%] ${notAvailable ? 'hidden' : ''}`}
      >
        {content}
      </Link>
      <div
        className={`relative flex flex-1 basis-full flex-col xl:basis-[20%] ${!notAvailable ? 'hidden' : ''}`}
      >
        <ChainModal variant="wrapper" nextIntent={intent}>
          {content}
        </ChainModal>
      </div>
    </>
  );
};
