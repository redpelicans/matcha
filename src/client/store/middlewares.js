import R from 'ramda';
import { USER_LOGGED } from '../actions/login';

const CONFIRM_EMAIL = 'confirmEmail';
export const EVTX_ERROR = 'EvtX:Error';

export const socketIoMiddleWare = (socket, history) => ({ dispatch, getState }) => {
  socket.on('action', action => {
    if (!action || !action.type) return;
    switch (action.type) {
      case CONFIRM_EMAIL:
        return history.push('/login');
      case USER_LOGGED:
        localStorage.setItem('matchaToken', action.payload.matchaToken);
        return dispatch(action);
      case EVTX_ERROR:
        switch (action.status) {
          case 201:
            return history.push('/login');
          default:
            return dispatch(action);
        }
      default:
        return dispatch(action);
    }
  });

  return next => (action) => {
    if (action.type && action.type.toLowerCase().indexOf('evtx:server:') === 0) {
      const { currentUser: { matchaToken } } = getState();
      const message = { ...action, type: action.type.slice(12), matchaToken };
      const params = ['action', message];
      const { callback } = action;
      if (callback && R.is(Function, callback)) params.push(callback);
      socket.emit(...params);
    }
    return next(action);
  };
};

export const logMiddleware = ({ getState }) => (next) => (action) => {
  next(action);
};
