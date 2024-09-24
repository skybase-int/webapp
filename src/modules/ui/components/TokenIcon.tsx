import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Token } from '@jetstreamgg/hooks';
import React from 'react';

export function TokenIcon({
  token,
  width = 50,
  className,
  fallbackClassName
}: {
  token: Partial<Token> & { symbol: string };
  width?: number;
  className?: string;
  fallbackClassName?: string;
}): React.ReactElement {
  if (!token.symbol) return <></>;

  return (
    <Avatar className={cn('', className)}>
      <AvatarImage
        width={width}
        height={width}
        src={`/tokens/${token.symbol.toLowerCase()}.svg`}
        alt={token.name}
      />
      <AvatarFallback className={cn('bg-slate-200 text-xs', fallbackClassName)} delayMs={500}>
        {token.symbol.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
