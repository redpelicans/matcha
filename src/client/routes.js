import React, { Component } from 'react';

const asyncComponent = (getComponent) =>
  class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      const { Component } = this.state;
      if (!Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (!Component) return null;
      return <Component {...this.props} />;
    }
};

const Login = asyncComponent(() => import('./components/login').then(module => module.default));
const Register = asyncComponent(() => import('./components/register').then(module => module.default));
const Account = asyncComponent(() => import('./components/me').then(module => module.default));
const Suggestion = asyncComponent(() => import('./components/suggestion').then(module => module.default));

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
    default: true,
    auth: true,
    component: Account,
  },
  {
    path: '/register',
    exact: true,
    component: Register,
  },
];

export const defaultRoute = () => routes.filter(r => r.default)[0];
export default routes;
