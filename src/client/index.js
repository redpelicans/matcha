import React from 'react';
import socketIO from 'socket.io-client';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import R from 'ramda';
import { FocusStyleManager } from '@blueprintjs/core';
import Kontrolo from './kontrolo';
import history from './history';
import configureStore from './store';
import App from './app';
import { checkToken, userLogged } from './components/login/actions';

FocusStyleManager.onlyShowFocusOnTabs();
const mountNode = window.document.getElementById('__MATCHA__');
const url = 'http://127.0.0.1:3004';
const io = socketIO.connect(url);

io.on('disconnect', () => console.log('socket.io disconnected ...')); // eslint-disable-line no-console
io.on('error', err => console.log(`socket.io error: ${err}`)); // eslint-disable-line no-console

const matchaToken = localStorage.getItem('matchaToken');
const initialState = {
  currentUser: {
    matchaToken,
  },
};

const store = configureStore(initialState, io);

const isAuthorized = (user) => {
  console.log(user);  // eslint-disable-line no-console
  if (!user || R.isEmpty(user)) return false;
  return true;
};

const Root = (
  <Provider store={store}>
    <Router history={history}>
      <Kontrolo user={state => state.currentUser.user} isAuthorized={user => isAuthorized(user)} redirect="/login">
        <App />
      </Kontrolo>
    </Router>
  </Provider>
);

io.on('connect', () => {
  console.log('socket.io connected.'); // eslint-disable-line no-console
  if (matchaToken) {
    store.dispatch(checkToken((err, { user, matchaToken } = { }) => {
      if (err) console.log(err.message); // eslint-disable-line no-console
      else {
        store.dispatch(userLogged(user, matchaToken));
      }
      render(Root, mountNode);
    }));
  } else {
    render(Root, mountNode);
  }
});
