let gridAreas;

function setup() {
  createCanvas(4000, 4000);
  noLoop();
  colorMode(HSB, 255);

  gridAreas = createGrid({
    x: 0,
    y: 0,
    w: width,
    h: height,
    minWidth: 0,
    minHeight: 0,
    gap: 8,
    limit: 10
  });

  console.log(gridAreas);
}

function draw() {
  background(252);
  let xoff = 0;
  gridAreas.map(area => {
    const { x, y, w, h } = area;
    noStroke();
    const fillProb = noise(xoff);
    if (fillProb > 0.5) {
      fill(125, 200, 200);
      noStroke();
    } else {
      noFill();
      stroke(125, 200, 200);
      // noStroke();
    }
    rect(x, y, w, h);
    xoff += 0.1;
  });
  save();
}
