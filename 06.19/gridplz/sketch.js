let g;

function setup() {
  createCanvas(1920, 1080);
  background(250);
  noLoop();
}

function draw() {
  background(250);
  grid(0, 0, width / 2, height / 2, 0);
  grid(width / 2, 0, width / 2, height / 2, 0);
  grid(width / 2, height / 2, width / 2, height / 2, 0);
  grid(0, height / 2, width / 2, height / 2, 0);
}

function grid(x, y, w, h, depth) {
  const limit = 2;
  noFill();
  rect(x, y, w, h);
  if (depth < limit) {
    depth++;
    if (random() > 0.5) {
      w /= 2;
      if (random() > 0.5) x += w;
    } else {
      h /= 2;
      if (random() > 0.5) y += h;
    }
    grid(x, y, w, h, depth);
  }
}
