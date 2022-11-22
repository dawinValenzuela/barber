import { FiHome, FiPieChart, FiUsers, FiTruck, FiCoffee } from 'react-icons/fi';

export const NAVIGATION_LINKS = [
  {
    label: 'Home',
    icon: FiHome,
    href: '/',
  },
  {
    label: 'Reporte Consolidado',
    icon: FiPieChart,
    href: '/report',
  },
  {
    label: 'usuarios',
    icon: FiUsers,
    href: '/users/add',
    children: [
      {
        href: '/users/add',
        label: 'Crear usuario',
      },
    ],
  },
  {
    label: 'Proveedores',
    icon: FiTruck,
    href: '/suppliers',
  },
  {
    label: 'Productos',
    icon: FiCoffee,
    href: '/suppliers/products',
  },
  // {
  //   label: 'Inventario',
  //   icon: FiTrendingUp,
  //   href: '/',
  //   children: [
  //     {
  //       label: 'Proveedores',
  //       href: '/suppliers',
  //     },
  //     {
  //       label: 'Productos',
  //       href: '/suppliers/products',
  //     },
  //   ],
  // },
];
