import { formatAddress } from '@jetstreamgg/utils';
import { t } from '@lingui/macro';
import { StatsCard } from '@/modules/ui/components/StatsCard';
import { Text } from '@/modules/layout/components/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDelegates } from '@jetstreamgg/hooks';
import { useChainId } from 'wagmi';

interface SealDelegateCardProps {
  selectedDelegate: string;
}

export function SealDelegateCard({ selectedDelegate }: SealDelegateCardProps): React.ReactElement {
  const chainId = useChainId();
  const {
    data: delegates,
    isLoading: delegatesLoading,
    error: delegatesError
  } = useDelegates({ chainId, pageSize: 1, search: selectedDelegate });

  return (
    <StatsCard
      title={t`Delegate`}
      isLoading={delegatesLoading}
      error={delegatesError}
      content={
        delegates ? (
          <div className="mt-2 flex gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                width={6}
                height={6}
                src={delegates[0].metadata?.image}
                alt={delegates[0].metadata?.name}
              />
              <AvatarFallback className="bg-slate-200 text-xs" delayMs={500}>
                {(delegates[0].metadata?.name.slice(0, 2) || 'SD').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Text>{delegates[0].metadata?.name || formatAddress(selectedDelegate, 6, 4)}</Text>
          </div>
        ) : (
          <Text className="mt-2">{formatAddress(selectedDelegate, 6, 4)}</Text>
        )
      }
    />
  );
}
