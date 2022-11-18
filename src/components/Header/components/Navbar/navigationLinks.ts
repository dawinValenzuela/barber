export const NAVIGATION_LINKS = [
  {
    label: 'usuarios',
    children: [
      {
        href: '/users/add',
        label: 'Crear usuario',
      },
    ],
  },
  {
    label: 'Inventario',
    children: [
      {
        label: 'Proveedores',
        href: '/suppliers',
      },
      {
        label: 'Productos',
        href: '/suppliers/products',
      },
    ],
  },
  {
    label: 'Reportes',
  },
];
