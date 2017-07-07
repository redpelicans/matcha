import React from 'react';

const SubAuthorView = ({ author }) => <em>{ author }</em>

const AuthorView = ({ author }) => (
  <span>
    {author}
    <SubAuthorView author={author} />
  </span>
);

export default AuthorView;
