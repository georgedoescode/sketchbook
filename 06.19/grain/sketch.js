function setup() {
  createCanvas(600, 600);
  background(255);
  noLoop();
}

function draw() {
  background(252);
  fill(0);
  ellipse(width / 2, height / 2, 150, 150);
  grain(1200);
}

function grain(num) {
  push();
  noStroke();
  // draw the bulk of the grain
  for (let i = 0; i < num; i++) {
    const x = random(width);
    const y = random(height);
    const w = random(1, 2);
    const h = random(1, 2);
    fill(random(150, 255), 80);
    rect(x, y, w, h);
  }
  // draw some dark grains
  for (let i = 0; i < num / 50; i++) {
    const x = random(width);
    const y = random(height);
    const w = random(1, 3);
    const h = random(1, 3);
    fill(25, random(100, 150));
    rect(x, y, w, h);
  }
  pop();
}
