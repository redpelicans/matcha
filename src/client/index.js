import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Authors from './authors/container';
import Ping from './ping';
import socketIO from 'socket.io-client';

const io = socketIO.connect('http://localhost:3004');
io.on('disconnect', () => console.log('socket.io disconnected ...')); // eslint-disable-line no-console
io.on('error', err => console.log(`socket.io error: ${err}`)); // eslint-disable-line no-console

const initialState = {};
const store = configureStore(initialState, io);

const App = () => (
  <Provider store={store}>
    <div className="app">
      <div className="app--content">
        Hello matcha world!
        <hr />
        <Ping />
        <hr />
        <Authors />
      </div>
    </div>
  </Provider>
);

console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('__MATCHA__');
render(<App />, mountNode);

io.on('connect', () => {
  console.log('socket.io connected.'); // eslint-disable-line no-console
});
