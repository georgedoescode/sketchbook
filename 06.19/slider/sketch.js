function setup() {
  createCanvas(windowWidth, windowHeight);
  background(252);
  noLoop();
}

function draw() {
  background(252);
  createSlider({
    x: width / 2,
    y: height / 4,
    h: height / 2
  });
}

class Slider {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.buttonY;
    this.thickness;
    this.borderRadius;
    this.buttonBorderRadius;
    this.buttonSize;
    this.buttonFill;
    this.numMarkerPoints;
    this.markerOffset;
  }

  setup() {
    this.thickness = floor(random(this.h / 16, this.h / 24));
    this.borderRadius = random(0, this.thickness / 2);
    this.buttonSize = random(this.thickness * 2.25, this.thickness * 2.75);
    this.buttonBorderRadius = random(0, this.buttonSize / 2);
    this.buttonY = random(0, this.h);
    this.numMarkerPoints = floor(random(4, 12));
    this.markerOffset = random(this.h / 12, this.h / 16);
  }

  draw() {
    fill(0);
    rect(
      this.x - this.thickness / 2,
      this.y,
      this.thickness,
      this.h,
      this.borderRadius
    );

    this.createMarkers();
    this.createButton();
  }

  createButton() {
    strokeWeight(2);
    fill(255);
    rect(
      this.x - this.buttonSize / 2,
      this.y + this.buttonY,
      this.buttonSize,
      this.buttonSize,
      this.buttonBorderRadius
    );
  }

  createMarkers() {
    const markerDist = (this.h - this.markerOffset * 2) / this.numMarkerPoints;
    for (let i = 0; i <= this.numMarkerPoints; i++) {
      strokeWeight(2);
      line(
        this.x - this.thickness * 1.5,
        this.y + this.markerOffset + i * markerDist,
        this.x + this.thickness * 1.5,
        this.y + this.markerOffset + i * markerDist
      );
    }
  }

  run() {
    this.setup();
    this.draw();
  }
}

function createSlider({ x, y, h }) {
  const slider = new Slider(x, y, h);
  push();
  slider.run();
  pop();
}
