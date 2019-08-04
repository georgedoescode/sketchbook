function grain(num) {
  push();
  noStroke();
  // draw the bulk of the grain
  for (let i = 0; i < num; i++) {
    const x = random(width);
    const y = random(height);
    const w = random(1, 2);
    const h = random(1, 2);
    fill(random(150, 255), 50);
    rect(x, y, w, h);
  }
  // draw some dark grains
  for (let i = 0; i < num / 50; i++) {
    const x = random(width);
    const y = random(height);
    const w = random(1, 2);
    const h = random(1, 2);
    fill(25, random(100, 150));
    rect(x, y, w, h);
  }
  pop();
}
