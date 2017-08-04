export const LOGIN_REQUEST = 'evtx:server:users:login';
export const CHECK_TOKEN = 'evtx:server:users:checkToken';
export const USER_LOGGED = 'users:logged';
export const USER_LOGOUT = 'evtx:server:users:logout';
export const USER_LOGGED_OUT = 'auth:logout';

export const loginRequest = ({ login, password }) => ({
  type: LOGIN_REQUEST,
  replyTo: USER_LOGGED,
  payload: { login, password },
});

export const checkToken = (callback) => ({
  type: CHECK_TOKEN,
  callback,
});

export const userLogged = (user, matchaToken) => ({
  type: USER_LOGGED,
  payload: { user, matchaToken },
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('matchaToken');
  dispatch({ type: USER_LOGOUT });
  // dispatch({ type: USER_LOGGED_OUT });
};
