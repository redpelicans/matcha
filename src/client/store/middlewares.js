import R from 'ramda';
import { push, goBack } from '../history';
import { USER_LOGGED } from '../components/login/actions';

const CONFIRM_EMAIL = 'confirmEmail';
export const EVTX_ERROR = 'EvtX:Error';

export const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  socket.on('action', action => {
    if (!action || !action.type) return;
    switch (action.type) {
      case CONFIRM_EMAIL:
        return push('/login');
      case USER_LOGGED:
        localStorage.setItem('matchaToken', action.payload.matchaToken);
        dispatch(action);
        return goBack();
      case EVTX_ERROR:
        switch (action.status) {
          case 201:
            return push('/login');
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

export const logMiddleware = () => (next) => (action) => (next(action));
