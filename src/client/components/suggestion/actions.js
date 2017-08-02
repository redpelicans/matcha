export const SUGGESTION_USER = 'evtx:server:users:suggestion';
export const USER_SUGGESTED = 'userSuggested';
export const suggestionUser = () => ({ type: SUGGESTION_USER, payload: {}, replyTo: USER_SUGGESTED });
