import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import routes, { defaultRoute } from './routes';
import { logout } from './components/login/actions';
import Header from './containers/headers';
import { Auth } from './kontrolo';
import MyToaster from './components/toaster';


const makeAuthRoute = route => (props) => {
  if (route.auth) {
    return (
      <Auth redirect>
        <route.component {...props} />
      </Auth>
    );
  }
  return <route.component {...props} />;
};

const App = ({ logout }) => {
  // const handleClick = () => history.push(`/people/${user._id}`);
  const handleLogout = () => logout();
  return (
    <div>
      <MyToaster />
      <Header onLogout={handleLogout} />
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index} // eslint-disable-line react/no-array-index-key
            path={route.path}
            exact={route.exact}
            render={makeAuthRoute(route)}
          />
        ))}
        <Auth redirect>
          <Route component={defaultRoute().component} />
        </Auth>
      </Switch>
    </div>
  );
};

App.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.currentUser.user,
  message: state.toaster.message,
});

const mapDispatchToProps = {
  logout,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
