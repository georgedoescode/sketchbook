function setup() {
  createCanvas(400, 400);
  background(252);
  frameRate(2);
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
  dial.setup();
  dial.draw();
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
    this.lineWidth = lineWidth;
    this.boldWidth = floor(random(2, 4));
    this.numberPadding = numberPadding;
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
  }

  drawNumbers() {
    for (let i = 0; i <= this.numPoints; i++) {
      const { x, y } = this.calcCircVals(i);
      text(i, x * this.numberPadding, y * this.numberPadding);
    }
  }

  drawMarkers() {
    for (let i = 0; i <= this.numPoints; i += this.lineIncrement) {
      const { x, y } = this.calcCircVals(i);
      if (i % 1 !== 0) {
        strokeWeight(1);
      } else {
        strokeWeight(this.boldWidth);
      }
      if (this.type !== `dots` && this.type !== `triangles`) {
        line(x * this.lineWidth, y * this.lineWidth, x, y);
      }
      if (this.type === `dots`) {
        strokeWeight(1);
        fill(50);
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
}
