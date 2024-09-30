import { HStack } from '@/modules/layout/components/HStack';
import { useDelegates, useRewardContractTokens, useSealPosition } from '@jetstreamgg/hooks';
import { formatAddress, formatBigInt } from '@jetstreamgg/utils';
import { t } from '@lingui/macro';
import { useState } from 'react';
import { SealToken } from '../constants';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/modules/icons';
import { SealPositionRewardsCard } from './SealPositionRewardsCard';
import { SealBorrowedCard, SealSealedCard } from '@/modules/ui/components/BalanceCards';
import { VStack } from '@/modules/layout/components/VStack';
import { StatsCard } from '@/modules/ui/components/StatsCard';
import { TokenIcon } from '@/modules/ui/components/TokenIcon';
import { Text } from '@/modules/layout/components/Typography';
import { useChainId } from 'wagmi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SealPositionOverview({
  positionIndex
}: {
  positionIndex: number;
}): React.ReactElement | null {
  const [sealedToken, setSealedToken] = useState<SealToken>(SealToken.SKY);
  const isSkySelected = sealedToken === SealToken.SKY;

  const handleSwitchSealToken = () => {
    setSealedToken(isSkySelected ? SealToken.MKR : SealToken.SKY);
  };

  const chainId = useChainId();
  const { data, isLoading, error } = useSealPosition({ urnIndex: positionIndex });
  const {
    data: rewardContractTokens,
    isLoading: tokensLoading,
    error: tokensError
  } = useRewardContractTokens(data?.selectedReward as `0x${string}` | undefined);
  const {
    data: delegates,
    isLoading: delegatesLoading,
    error: delegatesError
  } = useDelegates({ chainId, pageSize: 1, search: data?.selectedDelegate });

  if (!error && !isLoading && !data) return null;

  return (
    <VStack className="gap-8">
      <HStack gap={2} className="scrollbar-thin w-full overflow-auto">
        <SealSealedCard
          label={t`${sealedToken} sealed`}
          toggle={
            <Button
              variant="pill"
              size="xs"
              className="flex h-[17.5px] items-center text-sm leading-tight"
              onClick={handleSwitchSealToken}
            >
              {isSkySelected ? SealToken.MKR : SealToken.SKY}
              <Toggle className="ml-1 h-3 w-3" />
            </Button>
          }
          token={{ name: sealedToken, symbol: sealedToken }}
          balance={formatBigInt((data?.mkrLocked || 0n) * (isSkySelected ? 24000n : 1n))}
          isLoading={isLoading}
          error={error}
        />
        <SealBorrowedCard
          isLoading={isLoading}
          error={error}
          balance={data?.usdsDebt || 0n}
          token={{ name: 'USDS', symbol: 'USDS' }}
        />
        {data?.selectedReward && (
          <SealPositionRewardsCard rewardContractAddress={data.selectedReward as `0x${string}`} />
        )}
      </HStack>
      {(data?.selectedDelegate || data?.selectedReward) && (
        <HStack gap={2} className="w-full">
          {data?.selectedReward && (
            <StatsCard
              title={t`Reward`}
              isLoading={tokensLoading}
              error={tokensError}
              content={
                rewardContractTokens ? (
                  <div className="mt-2 flex gap-2">
                    <TokenIcon token={rewardContractTokens.rewardsToken} className="h-6 w-6" />
                    <Text>{rewardContractTokens.rewardsToken.symbol}</Text>
                  </div>
                ) : (
                  <Text className="mt-2">{formatAddress(data.selectedReward, 6, 4)}</Text>
                )
              }
            />
          )}
          {data?.selectedDelegate && (
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
                    <Text>{delegates[0].metadata?.name || formatAddress(data.selectedDelegate, 6, 4)}</Text>
                  </div>
                ) : (
                  <Text className="mt-2">{formatAddress(data.selectedDelegate, 6, 4)}</Text>
                )
              }
            />
          )}
        </HStack>
      )}
    </VStack>
  );
}
