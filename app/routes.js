import Home from './containers/Home';
import ShopList from './containers/ShopList';
import Profile from './containers/Profile';

const routes = [
  { path: '/',
    exact: true,
    component: Home
  },
  { path: '/list',
    component: ShopList
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
