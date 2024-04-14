// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconReceipt, IconCalendar, IconMicroscope, IconUserHeart, IconBook } from '@tabler/icons-react';
import config from '../config';


// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconReceipt,
  IconCalendar,
  IconMicroscope,
  IconUserHeart,
  IconBook
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: config.menuTitle,
  type: 'group',
  children: [
    {
      id: 'booking',
      title: config.menuSubTitle.bookAppointment,
      type: 'item',
      url: '/booking',
      icon: icons.IconCalendar,
      breadcrumbs: true
    },
    {
      id: 'lab-reports',
      title: config.menuSubTitle.labReport,
      type: 'item',
      url: '/lab-reports',
      icon: icons.IconMicroscope,
      breadcrumbs: true
    },
    {
      id: 'receipts',
      title: config.menuSubTitle.viewReceipts,
      type: 'item',
      url: '/receipts',
      icon: icons.IconReceipt,
      breadcrumbs: true
    },
    {
      id: 'demography',
      title: config.menuSubTitle.viewDemography,
      type: 'item',
      url: '/demography',
      icon: icons.IconUserHeart,
      breadcrumbs: true
    },
    {
      id: 'bookings',
      title: config.menuSubTitle.viewBookings,
      type: 'item',
      url: '/bookings',
      icon: icons.IconBook,
      breadcrumbs: true
    },
    // {
    //   id: 'icons',
    //   title: 'Icons',
    //   type: 'collapse',
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: 'tabler-icons',
    //       title: 'Tabler Icons',
    //       type: 'item',
    //       url: '/icons/tabler-icons',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'material-icons',
    //       title: 'Material Icons',
    //       type: 'item',
    //       external: true,
    //       target: '_blank',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
  ]
};

export default utilities;
