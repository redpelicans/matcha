import { SET_TOASTER } from '../components/toaster/actions';
import { EVTX_ERROR } from '../store/middlewares';

const initialState = {
  message: '',
};

const toaster = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case EVTX_ERROR:
      return { ...state, message: 'Response Error' };
    case SET_TOASTER:
      return { ...state, message: action.payload.message, intent: action.payload.intent };
    default:
      return state;
  }
};

export default toaster;
