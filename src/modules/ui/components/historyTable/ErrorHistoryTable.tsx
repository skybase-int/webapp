import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Text } from '@/modules/layout/components/Typography';

export function ErrorHistoryTable({ error }: { error: Error | null }) {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Text className="text-center">{error?.message}</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
