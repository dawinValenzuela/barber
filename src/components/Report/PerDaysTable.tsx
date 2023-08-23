import React from 'react';
import { Table } from 'src/components';

const DEFAULT_COLUMNS = [
  { id: 'date', header: 'Fecha' },
  { id: 'total', header: 'total' },
];

export const PerDaysTable = ({ data }) => {
  return <Table columns={DEFAULT_COLUMNS} data={data || []} />;
};
