import { USER_LOADED } from './actions';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return { state, userLoaded: action.payload };
    default:
      return state;
  }
};
