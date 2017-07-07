import { omit } from 'lodash';
import { ADD_AUTHOR, ADD_RANDOM_AUTHOR, REMOVE_AUTHOR, IS_FETCHING } from './actions';

const initialState = {
  list: {
    1: { id: 1, name: 'Allan', country: 'fr' },
    2: { id: 2, name: 'Nico', country: 'en' },
  },
  isFetching: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_AUTHOR:
      const author = action.payload.author;
      return { ...state, list: { ...state.list, [author.id]: { ...author } } };
    case ADD_RANDOM_AUTHOR:
      return { ...state, list: { ...state.list, 4: { id: 4, name: 'James Bond', country: 'uk' } } };
    case REMOVE_AUTHOR:
      return { ...state, list: omit(state.list, action.payload.id) };
    case IS_FETCHING:
      return { ...state, isFetching: action.payload.is };
    default:
      return state;
  }
}
