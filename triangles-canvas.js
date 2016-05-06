import React from 'react';
import ReactDOM from 'react-dom';

export default class Triangles extends React.Component {
  componentWillMount() {
    const startTime = performance.now();
    const framerate = 5;
    
    let lastRenderTime = 0;
    
    this.step = currentTime => {
      this.raf = requestAnimationFrame(this.step);
      
      const elapsedTime = currentTime - startTime;
      const dt = currentTime - lastRenderTime;
      
      if (dt > (1000/framerate)) {
        this.draw(elapsedTime);
        lastRenderTime = currentTime;
      }
    };
    
    this.raf = requestAnimationFrame(this.step);
  }
  
  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }
  
  draw(elapsedTime) {
    if (!this.refs.canvas || !this.refs.canvas.getContext) {
      return;
    }
    
    const { sideLength, spacing, color, width, height } = this.props;
    const ctx = this.refs.canvas.getContext('2d');
    const hCount = 2 * width / (sideLength + spacing) + 2;
    const vCount = height / (equilateralHeight(sideLength) + spacing) + 2;
    
    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(-(sideLength + spacing), 0);
    
    for (let i = 0; i < hCount; ++i) {
      for (let j = 0; j < vCount; ++j) {
        const x = i * (sideLength/2 + spacing) + (j % 2) * (sideLength/2 + spacing) + (i%2) * sideLength;
        const y = j * (equilateralHeight(sideLength) + spacing) + (i%2) * equilateralHeight(sideLength);
        
        ctx.save();
        
        ctx.fillStyle = color(i/hCount, j/vCount, elapsedTime);
        ctx.translate(x, y);
        ctx.rotate(Math.PI * (i%2));
        
        drawEquilateralTriangle(ctx, sideLength);
        
        ctx.restore();
      }
    }
    
    ctx.restore();
  }
  
  render() {
    const { width, height } = this.props;
    return (
      <canvas width={width} height={height} ref='canvas'/>
    );
  }
}

function equilateralHeight(sideLength) {
  return sideLength * 0.86602540378; // √3 / 2
}

function drawEquilateralTriangle(ctx, sideLength) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(sideLength, 0);
  ctx.lineTo(sideLength/2, equilateralHeight(sideLength));
  ctx.fill();
}
