import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { socketIoMiddleWare } from './middlewares';

const configureStore = (initialState, io, history) => (
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(socketIoMiddleWare(io, history), thunk, createLogger({ duration: true, timestamp: false, collapsed: true }))),
  )
);

export default configureStore;
