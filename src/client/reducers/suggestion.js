import { USER_SUGGESTED } from '../components/suggestion/actions';

const initialState = {
  users: [],
};

const suggestion = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUGGESTED:
      return { ...state, users: action.payload.listUser };
    default: return state;
  }
};

export default suggestion;

