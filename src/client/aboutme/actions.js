export const UPDATE_USER = 'evtx:server:users:put';
export const USER_UPDATED = 'evtx:response:usersUpdated';
export const updateUser = (user) => ({ type: UPDATE_USER, payload: user, replyTo: USER_UPDATED });
