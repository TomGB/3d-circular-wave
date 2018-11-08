const processing = require('./processing');

const numBoxes = 20;
const boxSize = 20;
const numberOfWaves = -0.4;
const speed = 0.05;

let boxes = Array(numBoxes * numBoxes).fill(null);
const halfOffset = numBoxes * boxSize / 2;

let camera;

const createBoxes = (p) => {
  boxes = boxes.map((_, index) => {
    const ix = index % numBoxes;
    const iy = p.floor(index / numBoxes);
    const x = ix * boxSize - halfOffset;
    const y = iy * boxSize - halfOffset;

    const dist = p.sqrt(p.pow(x, 2) + p.pow(y, 2));
    const offset = p.map(dist, 0, 300, 0, 1);

    return {
      ix,
      iy,
      x,
      y,
      offset,
    };
  });
}

const drawBoxes = (p) => {
  boxes.forEach(({ ix, iy, x, y, offset }) => {
    p.push();
    p.translate(x, y, 0)

    const height = p.map(p.sin(offset * boxSize * numberOfWaves + p.frameCount * speed), -1, 1, boxSize, 400);
    const colour = p.map(height, boxSize, 400, 0, 255);
    p.ambientMaterial(p.map(ix, 0, numBoxes, 0, 255), colour, p.map(iy, 0, numBoxes, 0, 255))

    p.box(boxSize, boxSize, height);
    p.pop();
  })
}

const setup = (p) => {
  camera = {
    pan: p.radians(45),
    tilt: p.radians(45),
  };

  p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  p.ortho(-p.width / 2, p.width / 2, -p.height / 2, p.height / 2, 0, 2000);
  
  createBoxes(p);

  p.noStroke();
  p.ambientLight(50);
};

const draw = (p) => {
  p.directionalLight(250, 250, 250, 0, 2, 0.25);
  p.directionalLight(250, 250, 250, 1, 0.3, 0.25);
  
  p.rotateX(camera.tilt);
  p.rotateZ(camera.pan);

  p.background(0);
  
  drawBoxes(p);
};

processing(setup, draw);