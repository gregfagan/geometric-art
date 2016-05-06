import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Triangles from './triangles';
import TrianglesCanvas from './triangles-canvas';
import WindowSize from './react-window-size';

import colorFnGenerator from './color';

class Toggler extends React.Component {
  constructor() {
    super();
    this.state = { canvas: true };
    this.handleToggle = this.handleToggle.bind(this);
  }
  
  handleToggle(e) {
    this.setState({canvas: !this.state.canvas});
  }
  
  render() {
    const { width, height } = this.props;
    const { canvas } = this.state;
    const Background = canvas ? TrianglesCanvas : Triangles;
    return (
      <div>
        <button 
          onClick={this.handleToggle}
          style={{position: 'absolute', right: 0, margin: 10, padding: 10}}
         >
           Switch to {canvas ? 'SVG' : 'canvas'}
         </button>
        <Background width={width} height={height} sideLength={60} spacing={2} color={colorFnGenerator(200, 490, 275, 325)} />
      </div>
    )
  }
};

ReactDOM.render(
  React.createElement(WindowSize()(Toggler)),
  document.getElementById('app')
);