import { RESET_ERROR } from '../root';

const EVTX_ERROR = 'EvtX:Error';
const EVTX_RESP = 'evtx:respo';
const initialState = {
  error: null,
  didRequested: false,
};

export default (state = initialState, action) => {
  switch (action.type.slice(0, 10)) {
    case RESET_ERROR:
      return { ...state, error: null };
    case EVTX_ERROR:
      if (typeof action.status === 'number') return { ...state, error: action.status.toString(), didRequested: true };
      return { ...state, error: action.status, didRequested: true };
    case EVTX_RESP:
      return { ...state, didRequested: true, error: null };
    default:
      return { ...state, error: null };
  }
};
