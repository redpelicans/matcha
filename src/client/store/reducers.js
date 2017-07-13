import authors from '../authors/reducer';
import { reducer as ping } from '../ping';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authors,
  ping,
});

export default rootReducer;
