import { useTokenChartInfo, usdsAddress, skyAddress } from '@jetstreamgg/hooks';
import { Chart, TimeFrame } from '@/modules/ui/components/Chart';
import { useState } from 'react';
import { ErrorBoundary } from '@/modules/layout/components/ErrorBoundary';
import { Trans } from '@lingui/macro';
import { useParseTokenChartData } from '@/modules/ui/hooks/useParseTokenChartData';
import { useChainId } from 'wagmi';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

enum ChartName {
  USDS = 'Total USDS',
  SKY = 'Total SKY'
}

export function UsdsSkyTotalsChart() {
  const [activeChart, setActiveChart] = useState<ChartName>(ChartName.USDS);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('w');
  const chainId = useChainId();

  const nstTokenAddress = usdsAddress[chainId as keyof typeof usdsAddress];
  const skyTokenAddress = skyAddress[chainId as keyof typeof skyAddress];

  const {
    data: usdsData,
    error: usdsError,
    isLoading: usdsIsLoading
  } = useTokenChartInfo({ tokenAddress: nstTokenAddress });

  const {
    data: skyData,
    error: skyError,
    isLoading: skyIsLoading
  } = useTokenChartInfo({ tokenAddress: skyTokenAddress });

  const chartDataMapping = {
    [ChartName.USDS]: useParseTokenChartData(timeFrame, usdsData || []),
    [ChartName.SKY]: useParseTokenChartData(timeFrame, skyData || [])
  };

  const symbolMapping = {
    [ChartName.USDS]: 'USDS',
    [ChartName.SKY]: 'SKY'
  };

  const isLoadingMapping = {
    [ChartName.USDS]: usdsIsLoading,
    [ChartName.SKY]: skyIsLoading
  };

  const errorMapping = {
    [ChartName.USDS]: usdsError,
    [ChartName.SKY]: skyError
  };

  const activeData = chartDataMapping[activeChart];
  const activeSymbol = symbolMapping[activeChart];
  const activeDataLoading = isLoadingMapping[activeChart];
  const activeDataError = errorMapping[activeChart];

  return (
    <div>
      <ErrorBoundary variant="small">
        <div className="mb-4 flex">
          <Tabs value={activeChart} onValueChange={value => setActiveChart(value as ChartName)}>
            <TabsList className="flex">
              <TabsTrigger position="left" value={ChartName.USDS}>
                <Trans>Total USDS</Trans>
              </TabsTrigger>
              <TabsTrigger position="right" value={ChartName.SKY}>
                <Trans>Total SKY</Trans>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Chart
          dataTestId="usds-sky-totals-chart"
          data={activeData}
          isLoading={activeDataLoading}
          error={activeDataError}
          symbol={activeSymbol}
          onTimeFrameChange={tf => {
            setTimeFrame(tf);
          }}
        />
      </ErrorBoundary>
    </div>
  );
}
