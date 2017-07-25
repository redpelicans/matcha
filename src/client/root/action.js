export const IF_USER_CHECK_CONNECTED = 'evtx:server:users:isCheckAndConnected';
export const USER_IS_CONNECTED = 'evtx:response:isConnected';
export const RESET_ERROR = 'resetError';
export const resetError = () => ({ type: RESET_ERROR, payload: {} });
export const ifUserCheckConnected = () => ({ type: IF_USER_CHECK_CONNECTED, payload: {}, replyTo: USER_IS_CONNECTED });
