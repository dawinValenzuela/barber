import {
  FiHome,
  FiPieChart,
  FiUsers,
  FiTruck,
  FiCoffee,
  FiArchive,
  FiUserPlus,
  FiFileText
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
        label: 'Articulos',
        href: '/suppliers/products',
        icon: FiCoffee,
      },
      {
        label: 'Productos',
        href: '/inventory/add-product',
        icon: FiFileText,
      }
    ],
  },
];
