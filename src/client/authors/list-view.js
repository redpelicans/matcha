import React from 'react';
import { map } from 'lodash';

const AuthorView = ({ id, name, country, removeAuthor }) => (
  <li>
    {`${name} in ${country}`}
    <button onClick={(event) => removeAuthor(id)}>remove</button>
  </li>
);

const ListView = ({ authors, addAuthor, addRandomAuthor, removeAuthor, addDelayedAuthor, isFetching }) => (
  <div className="authors">
    <div className="authors--actions">
      <button onClick={(event) => addAuthor({ id: 3, name: 'Eric', country: 'es' })}>add eric</button>
      <button onClick={(event) => addRandomAuthor()}>add random</button>
      {
        isFetching
          ? <span>is fetching...</span>
          : <button onClick={(event) => addDelayedAuthor()}>add delayed</button>
      }
    </div>
    <ul>
      {
        map(authors, (author) => (
          <AuthorView key={author.id} {...author} removeAuthor={removeAuthor} />
        ))
      }
    </ul>
  </div>
);

export default ListView;
