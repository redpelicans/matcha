import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Authors from './authors/container';

const initialState = {};
const store = configureStore(initialState);

const App = () => (
  <Provider store={store}>
    <div className="app">
      <div className="app--content">
        Hello matcha world!
        <Authors />
      </div>
    </div>
  </Provider>
);

console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('__MATCHA__');
render(<App />, mountNode);
