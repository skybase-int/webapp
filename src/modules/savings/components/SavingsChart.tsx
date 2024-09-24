import { useSavingsChartInfo } from '@jetstreamgg/hooks';
import { Chart, TimeFrame } from '@/modules/ui/components/Chart';
import { useState } from 'react';
import { ErrorBoundary } from '@/modules/layout/components/ErrorBoundary';
import { Trans } from '@lingui/macro';
import { useParseSavingsChartData } from '../hooks/useParseSavingsChartData';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SavingsChart() {
  const [activeChart, setActiveChart] = useState('tvl');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('w');

  const { data: savingsChartInfo, isLoading, error } = useSavingsChartInfo();
  const chartData = useParseSavingsChartData(timeFrame, savingsChartInfo || []);

  return (
    <div>
      <ErrorBoundary variant="small">
        <div className="mb-4 flex">
          <Tabs value={activeChart} onValueChange={value => setActiveChart(value)}>
            <TabsList className="flex">
              <TabsTrigger position="whole" value="tvl">
                <Trans>TVL</Trans>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Chart
          dataTestId="savings-chart"
          data={chartData}
          isLoading={isLoading}
          error={error}
          symbol={'sUSDS'}
          onTimeFrameChange={tf => {
            setTimeFrame(tf);
          }}
        />
      </ErrorBoundary>
    </div>
  );
}
