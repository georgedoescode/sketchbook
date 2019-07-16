let font;

function preload() {
  font = loadFont(`fonts/Inconsolata-Regular.ttf`);
}

function setup() {
  createCanvas(400, 400);
  background(252);
  noLoop();
  textFont(font);
}

function draw() {
  background(252);
  dial = new Dial(
    // x
    width / 2,
    // y
    height / 2,
    // rad
    100,
    // numPoints
    [4, 12],
    // piOffset
    PI / floor(random(4, 8)),
    // line size
    random(0.625, 0.975),
    // text dist
    1.175
  );

  dial.generate();
}

class Dial {
  constructor(x, y, radius, pointRange, PIOffset, lineWidth, numberPadding) {
    this.x = x;
    this.y = y;
    this.rad = radius;
    this.minRange = pointRange[0];
    this.maxRange = pointRange[1];
    this.numPoints = 0;
    this.PIOffset = PIOffset;
    this.types = [`minimal`, `sublines`, `dots`];
    this.type = this.choice(this.types);
    this.lineIncrements = [0.25, 0.5];
    this.lineIncrement = 1;
    this.sublineSize = random(1.25, 1.5);
    this.lineWidth = lineWidth;
    this.boldWidth = floor(random(2, 4));
    this.numberPadding = numberPadding;
    this.minInnerRadius = (this.rad * 2) / this.sublineSize;
  }

  setup() {
    // select a random even number within the range

    this.numPoints = floor(random(this.minRange, this.maxRange));

    if (this.type !== `minimal`) {
      this.lineIncrement = this.choice(this.lineIncrements);
    } else {
      this.lineIncrement = 1;
    }
  }

  draw() {
    strokeCap(SQUARE);
    textAlign(CENTER);

    translate(this.x, this.y);

    this.drawNumbers();
    this.drawMarkers();
    this.drawInner();
  }

  drawNumbers() {
    for (let i = 0; i <= this.numPoints; i++) {
      const { x, y } = this.calcCircVals(i);
      textSize(14);
      text(i, x * this.numberPadding, y * this.numberPadding);
    }
  }

  drawMarkers() {
    const fillIfCircles = random() > 0.5;
    for (let i = 0; i <= this.numPoints; i += this.lineIncrement) {
      const { x, y } = this.calcCircVals(i);
      if (i % 1 !== 0) {
        strokeWeight(1);
      } else {
        strokeWeight(this.boldWidth);
      }
      if (this.type !== `dots` && this.type !== `triangles`) {
        if (i % 1 !== 0) {
          line(x * this.lineWidth, y * this.lineWidth, x, y);
        } else {
          line(x * this.lineWidth, y * this.lineWidth, x, y);
        }
      }
      if (this.type === `dots`) {
        strokeWeight(1);
        if (fillIfCircles) {
          fill(50);
        } else {
          noFill();
        }
        if (i % 1 !== 0) {
          ellipse(x, y, 2, 2);
        } else {
          ellipse(x, y, 5, 5);
        }
      }
      if (this.type === `triangles`) {
      }
    }
  }

  drawInner() {
    strokeWeight(2);
    noFill();
    beginShape();

    let innerMult = 1;

    if (this.type === `dots`) {
      innerMult = 0.9;
    }
    for (let i = 0; i <= this.numPoints; i += 0.1) {
      const val = map(i, 0, this.numPoints, 0, TWO_PI);
      const x = cos(val) * this.rad * (this.lineWidth * innerMult);
      const y = sin(val) * this.rad * (this.lineWidth * innerMult);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  calcCircVals(i) {
    const mapppedPIVal =
      map(i, 0, this.numPoints, this.PIOffset, TWO_PI - this.PIOffset) +
      HALF_PI;
    const x = cos(mapppedPIVal) * this.rad;
    const y = sin(mapppedPIVal) * this.rad;
    return { x, y };
  }

  choice(list) {
    const i = floor(random(list.length));
    return list[i];
  }

  generate() {
    push();
    this.setup();
    this.draw();
    pop();
  }
}
