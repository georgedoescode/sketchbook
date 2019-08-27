function setup() {
  createCanvas(500, 500);
  background(252);
  colorMode(HSB, 255);
  noLoop();
}

function draw() {
  background(254);

  let cactus = new RoundCactus(width / 2, height / 2, 250);
  cactus.draw();
}

class RoundCactus {
  constructor(x, y, radius) {
    this.oX = x;
    this.oY = y;
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.variationOffset = radius / 4;
    this.maxRadius = radius - this.variationOffset;
    this.xoff = 0;
    this.yoff = 0;
    this.stepInc = 0.0005;
    this.points = [];
  }
  draw() {
    noStroke();
    noFill();

    beginShape();
    for (let i = 0; i < TWO_PI; i += this.stepInc) {
      this.xoff = map(cos(i), -1, 1, 0, 2.75);
      this.yoff = map(sin(i), -1, 1, 0, 2.75);
      this.radius = map(
        noise(this.xoff, this.yoff),
        0,
        1,
        this.maxRadius - this.variationOffset,
        this.maxRadius + this.variationOffset
      );
      this.x = this.oX + this.radius * cos(i);
      this.y = this.oY + this.radius * sin(i);
      this.points.push({ x: this.x, y: this.y });
      vertex(this.x, this.y);
    }
    endShape(CLOSE);

    // if (index % 1000 !== 0) return;

    let pointNoiseOffset = random(1000);
    for (let i = 0; i < this.points.length - 1; i++) {
      const { x, y } = this.points[i];
      const { x: oppositeX, y: oppositeY } = this.points[
        this.points.length - 1 - i
      ];
      noStroke();
      fill(10);
      const pointNoise = map(noise(pointNoiseOffset), 0, 1, 0, 3);
      const pointFill = map(noise(pointNoiseOffset), 0, 1, 100, 125);
      stroke(pointFill, 255, 150, 5);
      line(x, y, oppositeX, oppositeY);

      pointNoiseOffset += 0.001;
    }
  }
}
