const p5 = require('p5');

const init = (setup, draw) => {
  let processing;
  const sketch = (p) => {
    processing = p;
    p.setup = () => setup(p);
    p.draw = () => draw(p);
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
  }

  new p5(sketch);

  return processing;
}

module.exports = init;