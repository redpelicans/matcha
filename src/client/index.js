import React from 'react';
import { render } from 'react-dom';

const App = () => (
  <div> Hello matcha world! </div>
);
console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('__MATCHA__');
render(<App />, mountNode);
