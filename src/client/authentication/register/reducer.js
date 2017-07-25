import { ADD_USER } from './actions';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return state;
    default:
      return state;
  }
};
