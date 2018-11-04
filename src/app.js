const p5 = require('p5');

const numBoxes = 20;
const boxSize = 20;
const numberOfWaves = -0.4;
const speed = 0.04;

let boxes = Array(numBoxes * numBoxes).fill(null);
const halfOffset = numBoxes * boxSize / 2;


const createBoxes = (p) => {
  boxes = boxes.map((_, index) => {
    const x = index % numBoxes * boxSize - halfOffset;
    const y = p.floor(index / numBoxes) * boxSize - halfOffset;

    const dist = p.sqrt(p.pow(x, 2) + p.pow(y, 2));
    const offset = p.map(dist, 0, 300, 0, 1);

    return {
      x,
      y,
      offset,
    };
  });
}

const drawBoxes = (p) => {
  boxes.forEach(({ x, y, offset }) => {
    p.push();
    p.translate(x, y, 0)

    const height = p.map(p.sin(offset * boxSize * numberOfWaves + p.frameCount * speed), -1, 1, boxSize, 400);

    p.box(boxSize, boxSize, height);
    p.pop();
  })
}


const sketch = (p) => {
	p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.ortho(-p.width / 2, p.width / 2, -p.height / 2, p.height / 2, 0, 2000);
    
    createBoxes(p);

    p.noStroke();
    p.ambientLight(50);
	};

	p.draw = () => {
    p.directionalLight(250, 250, 250, 0, 2, 0.25);
    p.directionalLight(250, 250, 250, 1, 0.3, 0.25);
    p.ambientMaterial(20, 150, 80)
    
    p.rotateX(p.radians(45));
    p.rotateZ(-p.radians(45));

    p.background(0);
    
    drawBoxes(p);
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight);
	}
}

var app = new p5(sketch);