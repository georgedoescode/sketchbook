let egg;

function setup() {
  createCanvas(600, 600);
  background(252);

  egg = new Egg();
}

function draw() {
  translate(width / 2, height / 2);
  egg.draw();
}

class Egg {
  constructor() {
    this.radius;
    this.maxRadius = 150;
    this.step = 25;
    this.yMultiplier = 1.5;
    this.ended = false;
    this.xoff = 0;
    this.yoff = 0;
    this.x;
    this.y;
  }

  draw() {
    if (this.ended) return;
    noFill();
    stroke(25, random(225, 255));
    strokeWeight(random(2, 4));
    beginShape();
    for (var i = 0; i < TWO_PI; i += 0.125) {
      this.xoff = map(cos(i), -1, 1, 0, 0.5);
      this.yoff = map(sin(i), -1, 1, 0, 0.4575);
      this.radius = map(
        noise(this.xoff, this.yoff),
        0,
        1,
        this.maxRadius / 2,
        this.maxRadius
      );
      this.x = this.radius * cos(i);
      this.y = this.radius * sin(i) * 1.5;
      if (random(0, 1) > 0.97) {
        point(this.x + random(-5, 5), this.y + random(-5, 5));
      }
      vertex(this.x, this.y);
    }
    endShape(CLOSE);

    if (this.maxRadius > 0) {
      this.step = this.step + random(-0.125, 0.125);
      this.maxRadius -= this.step;
    } else {
      this.end();
    }
  }

  end() {
    this.ended = true;
  }
}
