export const UPDATE_USER = 'evtx:server:users:updateInfos';
export const USER_UPDATED = 'usersUpdated';
export const updateUserInfos = (user) => ({ type: UPDATE_USER, payload: user, replyTo: USER_UPDATED });
