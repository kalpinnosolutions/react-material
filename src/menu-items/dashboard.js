// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconSwitch } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconSwitch };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: '',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: true
    },
    {
      id: 'patientlist',
      title: 'Switch User',
      type: 'item',
      url: '/patientlist',
      icon: icons.IconSwitch,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
