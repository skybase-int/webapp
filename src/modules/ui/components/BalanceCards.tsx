import React, { useMemo } from 'react';
import { Trans, t } from '@lingui/macro';
import { Card, CardTitle } from '@/components/ui/card';
import { TokenIconWithBalance } from '@/modules/ui/components/TokenIconWithBalance';
import { Supplied, SuppliedEmpty, WithdrawnEmpty, Withdrawn, Rewards, RewardsEmpty } from '@/modules/icons';
import { formatBigInt } from '@jetstreamgg/utils';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingErrorWrapper } from './LoadingErrorWrapper';
import { Text } from '@/modules/layout/components/Typography';

interface BalanceCardProps {
  balance: bigint | string;
  isLoading: boolean;
  token: {
    symbol: string;
    name: string;
  };
  label?: string;
  error?: Error | null;
}

interface BaseBalanceCardProps extends BalanceCardProps {
  label: string;
  icon: React.ReactElement;
  iconEmpty: React.ReactElement;
  className?: string;
  error?: Error | null;
}

function BaseBalanceCard({
  label,
  balance,
  icon,
  iconEmpty,
  isLoading,
  token,
  className,
  error
}: BaseBalanceCardProps): React.ReactElement {
  const isPositiveBalance = useMemo(() => {
    if (typeof balance === 'bigint') {
      return balance > 0n;
    }
    if (typeof balance === 'string') {
      const numericPart = parseFloat(balance.replace(/[^0-9.-]+/g, ''));
      return !isNaN(numericPart) && numericPart > 0;
    }
    return false;
  }, [balance]);

  return (
    <Card variant="stats" className={cn('flex justify-between', className)}>
      <div className="flex w-full flex-col justify-center">
        <LoadingErrorWrapper
          isLoading={isLoading}
          loadingComponent={<LoadingBalanceCard label={label} />}
          error={error ? error : null}
          errorComponent={<ErrorComponent label={label} />}
        >
          <BaseBalanceCardContent label={label}>
            <TokenIconWithBalance
              token={token}
              balance={typeof balance === 'string' ? balance : formatBigInt(balance || 0n)}
            />
          </BaseBalanceCardContent>
        </LoadingErrorWrapper>
      </div>
      {isPositiveBalance ? icon : iconEmpty}
    </Card>
  );
}

function BaseBalanceCardContent({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <CardTitle variant="stats" className="mb-2">
        {label}
      </CardTitle>
      {children}
    </>
  );
}

function LoadingBalanceCard({ label }: { label: string }) {
  return (
    <BaseBalanceCardContent label={label}>
      <Skeleton className="h5 w-16" />
    </BaseBalanceCardContent>
  );
}

function ErrorComponent({ label }: { label: string }) {
  return (
    <BaseBalanceCardContent label={label}>
      <Text>
        <Trans>Unable to fetch balance</Trans>
      </Text>
    </BaseBalanceCardContent>
  );
}

export function SuppliedBalanceCard({
  balance,
  isLoading,
  token,
  label,
  error
}: BalanceCardProps): React.ReactElement {
  return (
    <BaseBalanceCard
      label={label || t`Supplied to Savings`}
      balance={balance}
      icon={<Supplied />}
      iconEmpty={<SuppliedEmpty />}
      isLoading={isLoading}
      token={token}
      error={error}
    />
  );
}

export function UnsuppliedBalanceCard({
  balance,
  isLoading,
  token,
  label,
  error
}: BalanceCardProps): React.ReactElement {
  return (
    <BaseBalanceCard
      label={label || t`Remaining balance`}
      balance={balance}
      icon={<Withdrawn />}
      iconEmpty={<WithdrawnEmpty />}
      isLoading={isLoading}
      token={token}
      error={error}
    />
  );
}

export function RewardsBalanceCard({
  balance,
  isLoading,
  token,
  label,
  error
}: BalanceCardProps): React.ReactElement {
  return (
    <BaseBalanceCard
      label={label || t`Accumulated Rewards`}
      balance={balance}
      icon={<Rewards />}
      iconEmpty={<RewardsEmpty />}
      isLoading={isLoading}
      token={token}
      error={error}
    />
  );
}
