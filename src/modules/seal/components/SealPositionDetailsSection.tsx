import { cn } from '@/lib/utils';
import { HStack } from '@/modules/layout/components/HStack';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { DetailSection } from '@/modules/ui/components/DetailSection';
import { StatsCard } from '@/modules/ui/components/StatsCard';
import { RISK_LEVEL_THRESHOLDS, RiskLevel, useUrnAddress, useVault, ZERO_ADDRESS } from '@jetstreamgg/hooks';
import { formatBigInt, WAD_PRECISION } from '@jetstreamgg/utils';
import { t, Trans } from '@lingui/macro';
import { formatUnits } from 'viem';

const RISK_COLORS = {
  [RiskLevel.LIQUIDATION]: { text: 'text-red-400', bg: 'bg-red-400' },
  [RiskLevel.HIGH]: { text: 'text-red-400', bg: 'bg-red-400' },
  [RiskLevel.MEDIUM]: { text: 'text-orange-400', bg: 'bg-orange-400' },
  [RiskLevel.LOW]: { text: 'text-green-400', bg: 'bg-green-400' }
};

export function SealPositionDetailsSection({ positionIndex }: { positionIndex: number }) {
  const {
    data: urnAddress,
    isLoading: urnAddressLoading,
    error: urnAddressError
  } = useUrnAddress(BigInt(positionIndex));

  const { data: vault, isLoading: vaultLoading, error: vaultError } = useVault(urnAddress || ZERO_ADDRESS);

  let liquidationProximityPercentage: number | undefined;
  if (vault && vault.liquidationPrice && vault.delayedPrice) {
    if (vault.liquidationPrice >= vault.delayedPrice) {
      liquidationProximityPercentage = 100;
    } else {
      liquidationProximityPercentage = Number(
        ((vault.delayedPrice - vault.liquidationPrice) * 100n) / vault.delayedPrice
      );
      liquidationProximityPercentage = 100 - liquidationProximityPercentage;
    }
  }

  const riskLevel = liquidationProximityPercentage
    ? RISK_LEVEL_THRESHOLDS.findLast(t => t.threshold >= liquidationProximityPercentage)
    : undefined;
  const riskColor = riskLevel ? RISK_COLORS[riskLevel.level] : undefined;

  if ((!urnAddressError && !urnAddressLoading && !urnAddress) || (!vaultError && !vaultLoading && !vault))
    return null;

  return (
    <div>
      <DetailSection
        title={
          <div className="flex items-center gap-4">
            <Heading className="my-4">
              <Trans>Position {positionIndex} details</Trans>
            </Heading>
            {riskColor && (
              <div className="flex items-center gap-2">
                <div className={cn('h-2.5 w-2.5 rounded-full', riskColor.bg)} />
                <Text variant="small" className="text-textSecondary">
                  <Trans>Risk level</Trans>
                </Text>
              </div>
            )}
          </div>
        }
      >
        <HStack gap={2} className="scrollbar-thin w-full overflow-auto">
          <StatsCard
            title={t`Collateralization ratio`}
            isLoading={urnAddressLoading || vaultLoading}
            error={urnAddressLoading ? null : vaultError}
            content={
              <Text className={cn('mt-2', riskColor ? riskColor.text : '')}>
                {(Number(formatUnits(vault?.collateralizationRatio || 0n, WAD_PRECISION)) * 100).toFixed(2)}%
              </Text>
            }
          />
          <StatsCard
            title={t`Liquidation price`}
            isLoading={urnAddressLoading || vaultLoading}
            error={urnAddressLoading ? null : vaultError}
            content={<Text className="mt-2">${formatBigInt(vault?.liquidationPrice || 0n)}</Text>}
          />
          <StatsCard
            title={t`Current price`}
            isLoading={urnAddressLoading || vaultLoading}
            error={urnAddressLoading ? null : vaultError}
            content={<Text className="mt-2">${formatBigInt(vault?.delayedPrice || 0n)}</Text>}
          />
        </HStack>
      </DetailSection>
    </div>
  );
}
