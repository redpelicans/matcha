import { createSelector } from 'reselect';

export const getState = (state) => state.authors;

export const getAuthors = () => createSelector(
  [getState],
  (state) => state.list
);

export const getIsFetching = () => createSelector(
  [getState],
  (state) => state.isFetching
);
