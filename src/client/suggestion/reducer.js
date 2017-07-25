import { USER_SUGGESTED } from './actions';

const initialState = {
  listUser: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SUGGESTED:
      return { ...state, listUser: action.payload.listUser };
    default: return state;
  }
};
