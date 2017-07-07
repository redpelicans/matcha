// action: { type, payload }
// action creator: function -> action

export const ADD_AUTHOR = 'ADD_AUTHOR';
export const addAuthor = (author) => ({ type: ADD_AUTHOR, payload: { author } });

export const ADD_RANDOM_AUTHOR = 'ADD_RANDOM_AUTHOR';
export const addRandomAuthor = () => ({ type: ADD_RANDOM_AUTHOR });

export const REMOVE_AUTHOR = 'REMOVE_AUTHOR';
export const removeAuthor = (id) => ({ type: REMOVE_AUTHOR, payload: { id } });

export const IS_FETCHING = 'IS_FETCHING';
export const isFetching = (is) => ({ type: IS_FETCHING, payload: { is } });

// thunk
export const ADD_DELAYED_AUTHOR = 'ADD_DELAYED_AUTHOR';
export const addDelayedAuthor = () => (dispatch, getState) => {
  dispatch(isFetching(true));
  setTimeout(
    () => {
      dispatch(addAuthor({id: 5, name: 'Mr Late', country: 'ja'}));
      dispatch(isFetching(false));
    },
    5000
  );
};
