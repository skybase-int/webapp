import { Table, TableBody } from '@/components/ui/table';
import { HistoryTableProps, SortDirection } from './types';
import { HistoryTableHeader } from './HistoryTableHeader';
import { HistoryRow } from './HistoryRow';

export function LoadingHistoryTable({
  transactionHeader,
  typeColumn,
  typeHeader,
  toggleSortDirection,
  sortDirection,
  chainId
}: Pick<HistoryTableProps, 'transactionHeader' | 'typeHeader' | 'typeColumn'> & {
  toggleSortDirection: () => void;
  sortDirection: SortDirection;
  chainId: number;
}) {
  return (
    <Table key="table-loading">
      <HistoryTableHeader
        transactionHeader={transactionHeader}
        typeColumn={typeColumn}
        typeHeader={typeHeader}
        toggleSortDirection={toggleSortDirection}
        sortDirection={sortDirection}
      />

      <TableBody>
        {[...Array(5)].map((_, index) => (
          <HistoryRow key={index} chainId={chainId} index={index} typeColumn={typeColumn} />
        ))}
      </TableBody>
    </Table>
  );
}
