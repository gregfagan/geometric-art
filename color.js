// Returns a gradient color function that varies on two spacial
// dimensions and one time dimension.
export default function(xHueLow, xHueHigh, yHueLow, yHueHigh) {
  return function(x, y, t) {
    const cycleT = t / (1000 * 60); // cycle every 60 seconds
    
    const xHue = pingPongLerp(xHueLow, xHueHigh, x + cycleT);
    const yHue = pingPongLerp(yHueLow, yHueHigh, y + cycleT);
    
    const hue = (xHue + yHue) / 2;

    return `hsl(${hue}, 100%, 80%)`;
  }
}

function pingPongLerp(min, max, t) {
  t = t % 2;
  if (t > 1) t = 2 - t;
  
  return min + t * (max - min);
}