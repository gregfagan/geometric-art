import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Triangles from './triangles';

import colorFnGenerator from './color';

ReactDOM.render(
  <Triangles sideLength={45} spacing={2} color={colorFnGenerator(200, 490, 275, 325)}/>,
  document.getElementById('app')
);