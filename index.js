import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Triangles from './triangles';

ReactDOM.render(
  <Triangles sideLength={75} spacing={3}/>,
  document.getElementById('app')
);