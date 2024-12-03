import { HStack } from '@/modules/layout/components/HStack';
import { DetailsSwitcher } from './DetailsSwitcher';
import { NetworkSwitcer } from './NetworkSwitcher';

export function DualSwitcher(): JSX.Element {
  return (
    <HStack className="items-center gap-4 space-x-0">
      <NetworkSwitcer />
      <DetailsSwitcher />
    </HStack>
  );
}
