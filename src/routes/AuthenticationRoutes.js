import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const Logout = Loadable(lazy(() => import('views/Logout')));
const Landing = Loadable(lazy(() => import('views/pages/authentication/authentication3/Landing')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/login',
      element: <AuthLogin3 />
    },
    {
      path: '/register',
      element: <AuthRegister3 />
    },
    {
      path: '/logout',
      element: <Logout />
    }
  ]
};

export default AuthenticationRoutes;
