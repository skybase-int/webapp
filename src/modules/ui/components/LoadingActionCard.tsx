import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { VStack } from '@/modules/layout/components/VStack';

export function LoadingActionCard() {
  return (
    <Card className="h-full w-full px-10 py-12">
      <VStack className="h-full justify-between gap-4">
        {/* Placeholder for Heading */}
        <div className="flex flex-col">
          <div className="flex h-[24px] flex-col">
            <Skeleton className="h-[20px] w-full" />
          </div>
          <div className="flex h-[24px] flex-col">
            <Skeleton className="h-[20px] w-full" />
          </div>
        </div>
        {/* Placeholder for Rate */}
        <div className="flex flex-col">
          <div className="flex h-[24px] flex-col">
            <Skeleton className="h-3 w-8" />
          </div>
          <div className="flex h-[26px] w-1/3 flex-col">
            <Skeleton className="h-12" />
          </div>
        </div>
        {/* Placeholder for Button */}
        <Skeleton className="h-8 w-1/2" />
      </VStack>
    </Card>
  );
}
