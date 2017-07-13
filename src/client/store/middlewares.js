import { isFunction } from 'lodash';
//import { push, goBack } from '../history';
//import { USER_LOGGED } from '../actions/login';

const EVTX_ERROR = 'EvtX:Error';

export const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  socket.on('action', (action) => {
    console.log('socket.on', action);
    if (!action || !action.type) return;
    switch (action.type) {
      /*
      case USER_LOGGED:
        localStorage.setItem('matchToken', action.payload.token);
        dispatch(action);
        return goBack();
      */
      case EVTX_ERROR:
        switch (action.code) {
          /*
          case 403:
          case 401:
            return push('/login');
          */
          default:
            return dispatch(action);
        }
      default:
        return dispatch(action);
    }
  });
  
  return next => (action) => {
    if (action.type && action.type.toLowerCase().indexOf('evtx:server:') === 0) {
      console.log('socket.emit');
      const { login } = getState();
      const message = { ...action, type: action.type.toLowerCase().slice(12), /*token: login.token*/ };
      const params = ['action', message];
      const { callback } = action;
      if (callback && isFunction(callback)) params.push(callback);
      socket.emit(...params);
    }
    return next(action);
  };
};

export const logMiddleware = (prefix) => ({ dispatch, getState }) => (next) => (action) => {
  const newAction = { ...action, logMiddleware: true };
  return next(newAction);
};
