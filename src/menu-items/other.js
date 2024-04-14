// assets
import { IconBrandChrome, IconHelp,IconAddressBook, IconLogout } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconAddressBook, IconLogout };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'contact-us',
      title: 'Contact Us',
      type: 'item',
      url: '/contact-us',
      icon: icons.IconAddressBook,
      breadcrumbs: false
    },
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/logout',
      icon: icons.IconLogout,
      breadcrumbs: false
    },
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: 'https://codedthemes.gitbook.io/berry/',
    //   icon: icons.IconHelp,
    //   external: true,
    //   target: false
    // }
  ]
};

export default other;
