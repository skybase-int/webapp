import { Toggle } from '@/components/ui/toggle';
import { Metrics } from '@/modules/icons';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '@/lib/constants';
import { Text } from '@/modules/layout/components/Typography';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
  TooltipPortal
} from '@/components/ui/tooltip';
import { t } from '@lingui/macro';

export function DetailsSwitcher(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsParam = !(searchParams.get(QueryParams.Details) === 'false');
  const handleSwitch = (pressed: boolean) => {
    const queryParam = pressed ? 'true' : 'false';
    searchParams.set(QueryParams.Details, queryParam);
    setSearchParams(searchParams);
  };

  // Note: onPressedChange callback fires when the toggle is clicked
  // https://www.radix-ui.com/primitives/docs/components/toggle
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <Toggle
            variant="singleSwitcher"
            className="hidden h-10 w-10 rounded-xl pb-2 pl-3 pr-[14px] pt-[9px] md:block"
            pressed={detailsParam}
            onPressedChange={handleSwitch}
            aria-label="Toggle details"
          >
            <Metrics width={20} height={20} />
          </Toggle>
        </div>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent arrowPadding={10}>
          <Text variant="small">{detailsParam ? t`Hide details` : t`View details`}</Text>
          <TooltipArrow width={12} height={8} />
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}
