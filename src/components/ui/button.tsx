import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-gradient-and-colors duration-250 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-primaryDisabled disabled:text-surfaceAlt',
  {
    variants: {
      variant: {
        default: 'bg-primary text-text hover:bg-primaryHover active:bg-primaryActive focus:bg-primaryFocus',
        connect:
          'bg-primaryBright text-text border border-[rgb(127,92,246)] [--gradient-opacity:100%] hover:[--gradient-opacity:60%] hover:border-[rgb(101,70,222)] focus:[--gradient-opacity:40%] focus:border-[rgb(92,62,209)]',
        secondary:
          'bg-secondary text-text hover:bg-secondaryHover active:bg-secondaryActive, focus:bg-secondaryFocus',
        pill: 'bg-primary text-text rounded-full hover:bg-primaryHover active:bg-primaryActive focus:bg-primaryFocus',
        chip: 'bg-secondary text-text rounded-full hover:bg-secondaryHover active:bg-secondaryActive, focus:bg-secondaryFocus',
        link: 'text-textSecondary no-underline hover:text-white active:text-[rgba(198,194,255,0.5)]',
        pagination:
          'text-selectActive text-base leading-normal bg-primary [--gradient-opacity:0%] rounded-full hover:[--gradient-opacity:50%] hover:text-text focus:border-2 focus:border-primaryActive focus:text-text active:text-text active:[--gradient-opacity:30%] disabled:bg-primary disabled:[--gradient-opacity:0%] !rounded-full !border-0',
        paginationActive: 'bg-primary [--gradient-opacity:100%] !rounded-full text-text !border-0',
        outline:
          'text-text border border-surface hover:bg-surface/15 active:bg-surface/25 focus:bg-surface/25',
        ghost: 'text-selectActive hover:bg-[rgb(43,36,90)] active:bg-[rgb(49,41,100)] active:text-text',
        input:
          'bg-black/20 hover:bg-primaryAlt hover:[--gradient-opacity:70%] active:bg-primaryAlt active:[--gradient-opacity:50%] text-text text-[13px] font-normal leading-4 disabled:pointer-events-auto disabled:cursor-not-allowed font-graphik',
        suggest:
          'bg-brandLight/10 [--gradient-opacity:0%] hover:bg-primary hover:[--gradient-opacity:50%] active:bg-primary active:[--gradient-opacity:35%] text-text',
        light: 'bg-[#EEDEFF] text-[#39128D] text-base'
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-6 rounded-full px-2 py-1 text-xs',
        sm: 'h-9 rounded-full px-2',
        large: 'p-4',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
