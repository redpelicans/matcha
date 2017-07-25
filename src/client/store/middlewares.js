import { CONNECTED_USER } from '../authentication/login/actions';

const EVTX_ERROR = 'EvtX:Error';

export const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  socket.on('action', action => {
    if (!action || !action.type) return;
    switch (action.type) {
      case CONNECTED_USER:
        localStorage.setItem('matchaToken', action.payload.matchaToken);
        localStorage.setItem('id', action.payload.id);
        return dispatch(action);
      case EVTX_ERROR:
        switch (action.status) {
          default:
            return dispatch(action);
        }
      default:
        return dispatch(action);
    }
  });

  return next => (action) => {
    if (action.type && action.type.toLowerCase().indexOf('evtx:server:') === 0) {
      const { login: { matchaToken } } = getState();
      const message = { ...action, type: action.type.slice(12), matchaToken };
      const params = ['action', message];
      socket.emit(...params);
    }
    return next(action);
  };
};

export const logMiddleware = () => (next) => (action) => (next(action));
