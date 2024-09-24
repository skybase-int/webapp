import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { Success, Failure } from '@/modules/icons';
import { Info } from 'lucide-react';

export function Toaster() {
  const { toasts } = useToast();

  const truncateDescription = (description: string, maxLength: number = 135): string => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, icon, onClose, ...props }) {
        const truncatedDescription =
          typeof description === 'string' ? truncateDescription(description) : null;

        return (
          <Toast variant={variant} key={id} {...props}>
            <div className="flex w-full gap-1">
              {variant === 'success' && <Success />}
              {variant === 'failure' && <Failure />}
              {variant === 'info' && <Info size={20} className="pt-[2px] text-textEmphasis" />}
              {icon}
              <div className="w-full">
                {title && <ToastTitle>{title}</ToastTitle>}
                {truncatedDescription && <ToastDescription>{truncatedDescription}</ToastDescription>}
                {typeof description === 'object' && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>
            {action}
            <ToastClose onClick={onClose} />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
