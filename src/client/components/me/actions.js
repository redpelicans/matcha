export const GETUSER = 'evtx:server:users:get';
export const GOTUSER = 'evtx:response:gotuser';
export const getUser = () => ({ type: GETUSER, payload: {}, replyTo: GOTUSER });
