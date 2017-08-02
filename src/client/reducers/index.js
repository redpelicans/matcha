import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import currentUser from './currentUser';
import toaster from './toaster';
import suggestion from './suggestion';

const rootReducer = combineReducers({
  form: formReducer,
  currentUser,
  toaster,
  suggestion,
});

export default rootReducer;
