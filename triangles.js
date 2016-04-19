import React from 'react';
import ReactDOM from 'react-dom';
import WindowSize from './react-window-size';
import _range from 'lodash/range'

class Triangles extends React.Component {
  render() {
    const { sideLength, spacing, windowWidth, windowHeight, ...rest } = this.props;
    const hCount = 2 * windowWidth / (sideLength + spacing) + 1;
    const vCount = windowHeight / (equilateralHeight(sideLength) + spacing) + 1;
    return (
      <div style={{width: '100vw', height: '100vh'}}>
        <svg width='100%' height='100%'>
          <g transform={`translate(-${sideLength + spacing})`}>
          {
            _range(hCount).map(i => (
              _range(vCount).map(j => (
                <EquilateralTriangle
                  sideLength={sideLength}
                  flip={(i % 2)}
                  fill='#ccf'
                  transform={`translate(
                    ${i * (sideLength/2 + spacing) + (j % 2) * (sideLength/2 + spacing)},
                    ${j * (equilateralHeight(sideLength) + spacing)}
                  )`}
                  key={`${i}.${j}`}
                />
              ))
            ))
          }
          </g>
        </svg>
      </div>
    );
  }
}

function equilateralHeight(sideLength) {
  return sideLength * 0.86602540378; // √3 / 2
}

function EquilateralTriangle(props) {
  const { sideLength, flip, ...rest } = props;
  return (
    <g {...rest}>
      <polygon
        points={`0,0 ${sideLength},0 ${sideLength/2},${equilateralHeight(sideLength)}`}
        transform={flip && `translate(${sideLength}, ${equilateralHeight(sideLength)}) rotate(180)` || ''}
      />
    </g>
  );
}

export default WindowSize((width, height) => ({windowWidth: width, windowHeight: height}))(Triangles);
