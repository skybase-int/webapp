import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingAssetBalanceCard() {
  return (
    <Card className="flex h-[84px] min-w-[208px] items-center justify-between">
      <div className="flex w-full justify-between">
        <div className="flex justify-center">
          <div className="mr-2 flex items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex flex-col justify-between">
            <Skeleton className="mb-1 h-4 w-14" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Skeleton className="mb-1 h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </Card>
  );
}
