import {
  FiHome,
  FiPieChart,
  FiUsers,
  FiTruck,
  FiCoffee,
  FiArchive,
  FiUserPlus,
} from 'react-icons/fi';

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
    children: [
      {
        href: '/users/add',
        label: 'Crear usuario',
        icon: FiUserPlus,
      },
    ],
  },
  {
    label: 'Inventario',
    icon: FiArchive,
    children: [
      {
        label: 'Proveedores',
        href: '/suppliers',
        icon: FiTruck,
      },
      {
        label: 'Productos',
        href: '/suppliers/products',
        icon: FiCoffee,
      },
    ],
  },
];
