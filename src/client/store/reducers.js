import authors from '../authors/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authors,
});

export default rootReducer;
