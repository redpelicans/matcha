import { combineReducers } from 'redux';
import listUser from '../suggestion/reducer';
import evtxError from '../error';
import userGet from '../userprofile/reducer';
import { USER_IS_CONNECTED } from '../root/action';

const InitialState = {
  user: {},
  connected: [],
};

const rootReducer = combineReducers({
  login: (state = {}, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  userInfo: (state = InitialState, action) => {
    switch (action.type) {
      case USER_IS_CONNECTED:
        return { ...state, user: action.payload.user, connected: action.payload.connected };
      default:
        return state;
    }
  },
  userGet,
  listUser,
  evtxError,
});

export default rootReducer;
