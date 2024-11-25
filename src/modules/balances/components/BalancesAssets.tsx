/* eslint-disable react/no-unescaped-entities */
import { HStack } from '@/modules/layout/components/HStack';
import { usePrices, useTokenBalances } from '@jetstreamgg/hooks';
import { useAccount, useChainId } from 'wagmi';
import { LoadingAssetBalanceCard } from './LoadingAssetBalanceCard';
import { AssetBalanceCard } from './AssetBalanceCard';
import { LoadingErrorWrapper } from '@/modules/ui/components/LoadingErrorWrapper';
import { Text } from '@/modules/layout/components/Typography';
import { Trans } from '@lingui/macro';
import { defaultConfig } from '@/modules/config/default-config';

export function BalancesAssets() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: pricesData, isLoading: pricesIsLoading, error: pricesError } = usePrices();

  const tokens = defaultConfig.balancesTokenList[chainId];

  const {
    data: tokenBalances,
    isLoading: tokenBalancesIsLoading,
    error: balanceError
  } = useTokenBalances({
    address,
    tokens,
    chainId
  });

  // map token balances to include price
  const tokenBalancesWithPrices =
    tokenBalances?.map(tokenBalance => {
      const price = pricesData?.[tokenBalance.symbol]?.price || 0;
      const tokenDecimalsFactor = Math.pow(10, -tokenBalance.decimals);
      return {
        ...tokenBalance,
        valueInDollars: Number(tokenBalance.value) * tokenDecimalsFactor * Number(price)
      };
    }) || [];

  // sort token balances by total in USD prices
  const sortedTokenBalances =
    tokenBalancesWithPrices && pricesData
      ? tokenBalancesWithPrices.sort((a, b) => b.valueInDollars - a.valueInDollars)
      : undefined;

  return (
    <LoadingErrorWrapper
      isLoading={tokenBalancesIsLoading || !sortedTokenBalances}
      loadingComponent={
        <HStack gap={2} className="scrollbar-thin w-full overflow-auto">
          {[1, 2, 3, 4].map(i => (
            <LoadingAssetBalanceCard key={i} />
          ))}
        </HStack>
      }
      error={balanceError}
      errorComponent={
        <Text variant="large" className="text-center text-text">
          <Trans>We couldn't load your funds. Please try again later.</Trans>
        </Text>
      }
    >
      <HStack gap={2} className="scrollbar-thin w-full overflow-auto">
        {sortedTokenBalances?.map(tokenBalance => {
          if (!tokenBalance) return null;
          const priceData = pricesData?.[tokenBalance.symbol];

          return (
            <AssetBalanceCard
              key={tokenBalance.symbol}
              tokenBalance={tokenBalance}
              priceData={priceData}
              isLoadingPrice={pricesIsLoading}
              chainId={chainId}
              error={pricesError}
            />
          );
        })}
      </HStack>
    </LoadingErrorWrapper>
  );
}
