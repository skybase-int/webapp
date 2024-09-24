export interface HistoryRow {
  id: string;
  type?: string;
  textLeft: string;
  tokenLeft?: string;
  iconLeft?: JSX.Element;
  textRight?: string;
  tokenRight?: string;
  formattedDate: string;
  rawDate: Date;
  transactionHash: string;
  highlightText?: boolean;
  cowOrderStatus?: string;
}

export interface HistoryTableProps {
  history?: HistoryRow[];
  itemsPerPage?: number;
  error?: Error | null;
  isLoading: boolean;
  errorText: string;
  noWalletText: string;
  noTransactionsText: string;
  transactionHeader: string;
  typeColumn?: boolean;
  statusColumn?: boolean;
  typeHeader?: string;
  dataTestId?: string;
  cowExplorerLink?: boolean;
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}
