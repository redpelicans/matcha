export const CONNECT_USER = 'evtx:server:users:login';
export const CONNECTED_USER = 'evtx:response:connectedUser';
export const connectUser = (user) => ({ type: CONNECT_USER, payload: user, replyTo: CONNECTED_USER });
