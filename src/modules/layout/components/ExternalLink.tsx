import React from 'react';
import { HStack } from './HStack';
import { LinkExternal } from '@/modules/icons';
import { cn } from '@/lib/utils';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';

export function ExternalLink({
  href,
  children,
  className,
  iconSize = 16,
  showIcon = true,
  skipConfirm,
  iconClassName,
  iconColor
}: {
  href?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  iconSize?: number;
  className?: string;
  iconClassName?: string;
  skipConfirm?: boolean;
  iconColor?: string;
}): React.ReactElement {
  const { onExternalLinkClicked } = useConfigContext();

  const content = (
    <>
      {children ? children : null}
      {showIcon && <LinkExternal boxSize={iconSize} className={iconClassName} stroke={iconColor} />}
    </>
  );
  return (
    <a
      href={href}
      onClick={skipConfirm ? undefined : onExternalLinkClicked}
      target="_blank"
      rel="noreferrer"
      className={cn('inline-flex items-center text-text', className)}
    >
      {['string', 'number'].includes(typeof children) || children === undefined ? (
        content
      ) : (
        <HStack>{content}</HStack>
      )}
    </a>
  );
}
