import React from 'react';
import { Table } from 'src/components';

const DEFAULT_COLUMNS = [
  { id: 'barber', header: 'Barbero' },
  { id: 'services', header: 'Servicios' },
  { id: 'value', header: 'Ingresos' },
];

export const ConsolidatedTable = ({ data }) => {
  return <Table columns={DEFAULT_COLUMNS} data={data || []} />;
};
