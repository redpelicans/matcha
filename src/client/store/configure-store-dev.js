import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { logMiddleware, socketIoMiddleWare } from './middlewares';

const configureStore = (initialState, io) => (
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(socketIoMiddleWare(io), thunk, logMiddleware, createLogger({ duration: true, timestamp: false, collapsed: true }))),
  )
);

export default configureStore;
