import Login  from './components/login';
import Register from './components/register';
import Account from './components/me';
import AboutMe from'./components/aboutme';
import Suggestion from './components/suggestion';

const routes = [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/suggestion',
    exact: true,
    default: true,
    auth: true,
    component: Suggestion,
  },
  {
    path: '/me',
    exact: true,
    auth: true,
    component: Account,
  },
  {
    path: '/register',
    exact: true,
    component: Register,
  },
  {
    path: '/about_me',
    exact: true,
    auth: true,
    component: AboutMe,
  },
];

export const defaultRoute = () => routes.filter(r => r.default)[0];
export default routes;
