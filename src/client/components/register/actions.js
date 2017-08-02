export const ADD_USER_FORM = 'addUserForm';
export const ADD_USER_BACK = 'evtx:server:users:post';
export const USER_ADDED = 'userAdded';

export const addUserForm = (user) => ({ type: ADD_USER_FORM, payload: user });
export const addUserInBack = (user) => ({ type: ADD_USER_BACK, payload: user, replyTo: USER_ADDED });
