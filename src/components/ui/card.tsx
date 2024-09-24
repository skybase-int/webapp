import * as React from 'react';

import { cn } from '@/lib/utils';
import { tv, type VariantProps } from 'tailwind-variants';

const card = tv({
  base: 'rounded-[20px] bg-card p-4 text-text text-base font-normal leading-normal',
  // Slot styles will apply to every slot before slot variants are applied
  slots: {
    header: 'flex justify-between space-y-1.5',
    title: '',
    description: '',
    content: '',
    footer: ''
  },
  // Variants can be different things like "size", "intent", "position", and have sub-categories
  variants: {
    // This is called "variant" for consistency, it's arbitrary, it could be called "intent".
    variant: {
      // Each variant can define classes for any slot
      default: {
        title: 'text-xl font-custom-450 leading-normal lg:text-2xl lg:leading-8',
        content: 'p-6 pt-0'
      },
      pool: { base: 'leading-tight lg:px-5 lg:py-4' },
      stats: {
        base: 'p-5 w-full min-w-[220px]',
        header: 'p-0',
        title: 'text-sm font-normal leading-tight text-textSecondary',
        content: 'pt-0'
      },
      statsCompact: { base: 'p-3 lg:pl-4 lg:pb-4 lg:pt-3 lg:pr-3' },
      stepper: {
        base: 'w-full rounded-none border text-sm'
      },
      spotlight: {
        base: 'p-10 bg-[linear-gradient(0deg,_#581BE0_0%,_#2A197D_100%)]'
      }
    }
  },
  // Default variant is applied if no other variant is specified
  defaultVariants: {
    variant: 'default'
  },
  // This matches the variant name and applies the styles to the specified slots
  compoundSlots: [{ variant: 'stats', slots: ['base', 'header', 'title', 'content'], className: '' }]
});

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof card>
>(({ className, variant, children, ...props }, ref) => (
  <div ref={ref} className={cn(card({ variant }).base(), className)} {...props}>
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        const childType = child.type as React.ComponentType;
        const childDisplayName = childType.displayName || '';
        // This ensures that only these card slots are affected by the variant
        if (['CardHeader', 'CardTitle', 'CardContent', 'CardFooter'].includes(childDisplayName)) {
          return React.cloneElement(child, { ...child.props, variant });
        }
      }
      return child;
    })}
  </div>
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof card>
>(({ variant, className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(card({ variant }).header(), className)} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          const childType = child.type as React.ComponentType;
          const childDisplayName = childType.displayName || '';
          if (['CardTitle', 'CardDescription'].includes(childDisplayName)) {
            return React.cloneElement(child, { ...child.props, variant });
          }
          return React.cloneElement(child, child.props);
        }
        return child;
      })}
    </div>
  );
});
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof card>
>(({ variant, className, ...props }, ref) => (
  <h3 ref={ref} className={cn(card({ variant }).title(), className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof card>
>(({ variant, className, ...props }, ref) => (
  <div ref={ref} className={cn(card({ variant }).content(), className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof card>
>(({ variant, className, ...props }, ref) => (
  <div ref={ref} className={cn(card({ variant }), 'flex items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
