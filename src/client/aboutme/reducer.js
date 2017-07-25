import { UPDATE_USER } from './actions';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return state;
    default:
      return state;
  }
};
