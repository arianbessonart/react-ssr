import Home from './containers/Home';
import ShopList from './containers/ShopList';
import ShopListClient from './containers/ShopListClient';
import Profile from './containers/Profile';

const routes = [
  { path: '/',
    exact: true,
    component: Home
  },
  { path: '/list',
    exact: true,
    component: ShopList
  },
  { path: '/list-client',
    exact: true,
    component: ShopListClient
  },
  { path: '/profile',
    component: Profile
  },
  // {
  //   path: '*',
  //   component: NotFound
  // }
];

export default routes;
