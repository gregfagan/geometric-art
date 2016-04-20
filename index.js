import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Triangles from './triangles';

ReactDOM.render(
  <Triangles sideLength={45} spacing={2}/>,
  document.getElementById('app')
);