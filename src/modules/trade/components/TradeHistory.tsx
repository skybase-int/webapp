import { useMemo } from 'react';
import { useTradeHistory } from '@jetstreamgg/hooks';
import { formatNumber, useFormatDates } from '@jetstreamgg/utils';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { HistoryTable } from '@/modules/ui/components/historyTable/HistoryTable';
import { formatUnits } from 'viem';

export function TradeHistory() {
  const { data: tradeHistory, isLoading: tradeHistoryLoading, error } = useTradeHistory();
  const { i18n } = useLingui();
  const formatTradeAmount = (input: bigint, decimals: number = 18): string => {
    return formatNumber(parseFloat(formatUnits(input, decimals)), { locale: i18n.locale, compact: true });
  };

  const memoizedDates = useMemo(() => {
    return tradeHistory?.map(s => s.blockTimestamp);
  }, [tradeHistory]);

  const formattedDates = useFormatDates(memoizedDates, i18n.locale, 'MMMM d, yyyy, h:mm a');

  // map tradehistory to rows
  const history = tradeHistory?.map((s, index) => ({
    id: s.id,
    textLeft: formatTradeAmount(s.fromAmount, s.fromToken.decimals),
    tokenLeft: s.fromToken.symbol,
    textRight: formatTradeAmount(s.toAmount, s.toToken.decimals),
    tokenRight: s.toToken.symbol,
    formattedDate: formattedDates.length > index ? formattedDates[index] : '',
    rawDate: s.blockTimestamp,
    transactionHash: s.transactionHash,
    cowOrderStatus: s.cowOrderStatus
  }));

  return (
    <HistoryTable
      history={history}
      error={error}
      isLoading={tradeHistoryLoading}
      transactionHeader={t`Trades`}
      statusColumn={true}
      cowExplorerLink
    />
  );
}
