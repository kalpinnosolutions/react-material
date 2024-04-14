import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MemberLayout from 'layout/MemberLayout';

// login option 3 routing
const MemberList = Loadable(lazy(() => import('views/member')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MemberLayout />,
  children: [
    {
      path: '/patientlist',
      element: <MemberList />
    },
  ]
};

export default AuthenticationRoutes;
