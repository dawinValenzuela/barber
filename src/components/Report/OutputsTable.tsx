import React from 'react';
import { Table } from 'src/components';

const DEFAULT_COLUMNS = [
  { id: 'detail', header: 'Detalle' },
  { id: 'date', header: 'Fecha' },
  { id: 'value', header: 'Valor' },
];

export const OutputsTable = ({ data }) => {
  return <Table columns={DEFAULT_COLUMNS} data={data || []} />;
};
