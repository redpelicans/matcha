import { CONNECT_USER } from './actions';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_USER:
      return state;
    default:
      return state;
  }
};
