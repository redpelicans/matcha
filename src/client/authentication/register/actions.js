export const ADD_USER = 'evtx:server:users:post';
export const ADDED_USER = 'evtx:response:addedUser';
export const addUser = (user) => ({ type: ADD_USER, payload: user, replyTo: ADDED_USER });
