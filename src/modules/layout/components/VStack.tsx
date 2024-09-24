import * as React from 'react';
import { cn } from '@/lib/utils';

type VStackProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: number;
  children: React.ReactNode;
  className?: string;
};

export const VStack = React.forwardRef<HTMLDivElement, VStackProps>(
  ({ children, gap = 4, className = '', ...props }, ref) => {
    const spacingClass = `gap-y-${gap}`;
    const classes = cn(`flex flex-col ${spacingClass}`, className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
