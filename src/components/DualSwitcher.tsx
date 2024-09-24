import { HStack } from '@/modules/layout/components/HStack';
import { DetailsSwitcher } from './DetailsSwitcher';

export function DualSwitcher(): JSX.Element {
  return (
    <HStack className="space-x-0">
      <DetailsSwitcher />
    </HStack>
  );
}
