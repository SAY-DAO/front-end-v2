import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ChildLayout from '../layouts/child-layoyt/ChildLayout';
import Loadable from '../layouts/loadable/Loadable';
import MainLayout from '../layouts/main-layout/MainLayout';
import BlankLayout from '../layouts/plain-layout/PlainLayout';

const Error = Loadable(lazy(() => import('../components/Error')));

const Splash = Loadable(lazy(() => import('../pages/splash')));
const Intro = Loadable(lazy(() => import('../pages/intro')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const ForgotPassword = Loadable(
  lazy(() => import('../pages/auth/ForgotPassword'))
);
const SearchChild = Loadable(lazy(() => import('../pages/child/searchChild')));
const SearchResult = Loadable(
  lazy(() => import('../pages/child/searchResult'))
);
const NeedPage = Loadable(lazy(() => import('../pages/needPage')));
const MyChildPage = Loadable(lazy(() => import('../pages/child/myChildPage')));
const Settings = Loadable(lazy(() => import('../components/profile/Settings')));
const Profile = Loadable(lazy(() => import('../pages/main/profile')));
const Cart = Loadable(lazy(() => import('../pages/main/cart')));
const Home = Loadable(lazy(() => import('../pages/main/home')));
const ProfileEdit = Loadable(
  lazy(() => import('../components/profile/ProfileEdit'))
);
const ProfileUpload = Loadable(
  lazy(() => import('../components/profile/ProfileUpload'))
);
const Report = Loadable(lazy(() => import('../pages/report')));
const DAO = Loadable(lazy(() => import('../pages/main/dao')));

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth" /> },
      { path: '/auth', element: <Splash /> },
      { path: '/auth/intro', element: <Intro /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/404', element: <Error /> },
    ],
  },
  {
    path: '/main',
    element: <MainLayout />,
    children: [
      { path: '/main', element: <Navigate to="/main" /> },
      { path: '/main/profile/settings', element: <Settings /> },
      { path: '/main/home', element: <Home /> },
      { path: '/main/profile', element: <Profile /> },
      { path: '/main/cart', element: <Cart /> },
      { path: '/main/search', element: <SearchChild /> },
      { path: '/main/profile/edit', element: <ProfileEdit /> },
      { path: '/main/profile/upload', element: <ProfileUpload /> },
      { path: '/main/dao', element: <DAO /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/child',
    element: <ChildLayout />,
    children: [
      { path: '/child', element: <Navigate to="/child" /> },
      { path: '/child/:childId/needs/:needId', element: <NeedPage /> },
      { path: '/child/:childId', element: <MyChildPage /> },
      { path: '/child/search-result', element: <SearchResult /> },
      { path: '/child/needs/needPage/report/:status', element: <Report /> },
    ],
  },
];

export default Router;
