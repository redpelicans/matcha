export const USERS_GET = 'evtx:server:users:getUser';
export const USER_LOADED = 'users:loaded';
export const userGet = (id) => ({ type: USERS_GET, payload: id, replyTo: USER_LOADED });
