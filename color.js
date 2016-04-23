// Returns a gradient color function that varies on two spacial
// dimensions and one time dimension.
export default function(xHueLow, xHueHigh, yHueLow, yHueHigh) {
  return function(x, y, t) {
    const cycleT = t / (1000 * 60); // cycle every 60 seconds
    
    const cycleX = (x + cycleT) > 1 ?
      (1 - (x + cycleT - 1)) :
      (x + cycleT);
      
    const cycleY = (y + cycleT) > 1 ?
      (1 - (y + cycleT - 1)) :
      (y + cycleT);
    
    const xHue = xHueLow + cycleX * (xHueHigh - xHueLow);
    const yHue = yHueLow + cycleY * (yHueHigh - yHueLow);
    
    const hue = (xHue + yHue) / 2;

    return hue;
  }
}