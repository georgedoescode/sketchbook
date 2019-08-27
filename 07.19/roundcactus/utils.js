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

class WonkyLine {
  constructor(x, y, x1, y1, roughness) {
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.roughness = roughness;
  }

  draw() {
    const d = dist(this.x, this.y, this.x1, this.y1);
    let xoff = random(1000);
    push();
    translate(this.x, this.y);
    rotate(atan2(this.y1 - this.y, this.x1 - this.x));
    noFill();
    beginShape();
    for (let x = 0; x < d; x += 1) {
      const n = map(noise(xoff), 0, 1, -5, 5);
      vertex(x, n);
      xoff += this.roughness;
    }
    endShape();
    pop();
  }
}

function wonkyLine(x, y, x1, y1, roughness = 0.01) {
  const line = new WonkyLine(x, y, x1, y1, roughness);
  line.draw();
}
