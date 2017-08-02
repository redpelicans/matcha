import R from 'ramda';
import { USER_LOGOUT, USER_LOGGED } from '../components/login/actions';
import { ADD_USER_FORM, USER_ADDED } from '../components/register/actions';
import { EVTX_ERROR } from '../store/middlewares';

const currentUser = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case EVTX_ERROR:
      return { ...state, user: { ...state.user, status: 'responseError' } };
    case USER_ADDED:
      return { ...state, user: { ...state.user, status: 'response', confirmed: action.payload.confirmed } };
    case ADD_USER_FORM:
      return { ...state, user: R.omit(['password'], action.payload) };
    case USER_LOGOUT:
      return R.omit(['user', 'matchaToken'], state);
    case USER_LOGGED:
      return { ...state, user: { ...state.user, status: 'connected' } };
    default:
      return state;
  }
};

export default currentUser;
