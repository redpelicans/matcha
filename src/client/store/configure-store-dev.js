import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { logMiddleware, socketIoMiddleWare } from './middlewares';

const configureStore = (initialState, socket) => (
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        socketIoMiddleWare(socket),
        logMiddleware(process.env.NODE_ENV),
        createLogger({duration: true, timestamp: false, collapsed: true })
      )
    )
  )
);

export default configureStore;
