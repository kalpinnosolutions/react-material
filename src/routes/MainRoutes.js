import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const BookAppontment = Loadable(lazy(() => import('views/BookAppontment')));
const VewDemography = Loadable(lazy(() => import('views/VewDemography')));
const ViewBookings = Loadable(lazy(() => import('views/ViewBookings')));
const ViewLabReports = Loadable(lazy(() => import('views/ViewLabReports')));
const ViewReceipts = Loadable(lazy(() => import('views/ViewReceipts')));
const Contactus = Loadable(lazy(() => import('views/Contactus')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'booking',
      children: [
        {
          path: '',
          element: <BookAppontment />
        }
      ]
    },
    {
      path: 'lab-reports',
      children: [
        {
          path: '',
          element: <ViewLabReports />
        }
      ]
    },
    {
      path: 'receipts',
      children: [
        {
          path: '',
          element: <ViewReceipts />
        }
      ]
    },
    {
      path: 'demography',
      children: [
        {
          path: '',
          element: <VewDemography />
        }
      ]
    },
    {
      path: 'bookings',
      children: [
        {
          path: '',
          element: <ViewBookings />
        }
      ]
    },
    {
      path: 'contact-us',
      children: [
        {
          path: '',
          element: <Contactus />
        }
      ]
    },
  ]
};

export default MainRoutes;
