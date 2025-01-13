import React from 'react';
import { Text } from '@/modules/layout/components/Typography';
import { TokenIcon } from './TokenIcon';
import { cn } from '@/lib/utils';

interface TokenIconWithBalanceProps {
  token: {
    symbol: string;
    name: string;
  };
  balance: string;
  className?: string;
  chainId?: number;
  afterBalance?: string;
}

export const TokenIconWithBalance: React.FC<TokenIconWithBalanceProps> = ({
  token,
  balance,
  className,
  chainId,
  afterBalance
}) => (
  <div className={cn('flex items-center', className)}>
    {/* TODO the size should come from the width prop and not the class name */}
    <TokenIcon className="h-6 w-6" token={token} width={24} chainId={chainId} />
    <Text className="ml-2">
      {balance} {token.symbol} {token.symbol === 'CLE' ? 'Points' : ''}
    </Text>
    {afterBalance && <span className="ml-1 text-sm text-textSecondary">{afterBalance}</span>}
  </div>
);
