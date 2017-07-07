import { createSelector } from 'reselect';

export const getAuthor = (state) => state.author;

export const getAuthorSep = (sep) => createSelector(
  [getAuthor],
  (author) => author.split('').join(sep)
);
