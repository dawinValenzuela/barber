import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import { useMemo } from 'react';

const columnHelper = createColumnHelper();

export const useTable = ({ columns, data }) => {
  const enhancedColumns = useMemo(() => {
    return columns.map(({ id, ...column }) => {
      return columnHelper.accessor(id, {
        ...column,
      });
    });
  }, [columns]);

  const tableInstance = useReactTable({
    columns: enhancedColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return tableInstance;
};
