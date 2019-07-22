function setup() {
  createCanvas(500, 500);
  background(252);
  noLoop();

  // textFont("Fira Code");
}

function draw() {
  background(252);
  createButton(width / 2, height / 2.5, 100);
}

class Button {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.points;
    this.strokeWeight = floor(random(2, 3));
    this.fill = color(25);
    this.textColor = color(0);
    this.shadowFill = 0;
    this.words = [`OFF`, `ON`, `ENABLE`, `DISABLE`];
    this.symbols = `∣∤⫮⌅⌆ℓ⫛⦜∟⊾⦝⊿⦵⦶⦷⦸⦹⦺⦽⧀⧁⧂⧃∥∦⫲⫳⋕¬⫬⫭⊨⊭∀∁∃∄∴∵⊦⊬⊧⊩⊮⊫⊯⊪`;
    this.textSize;
    this.drawBottomWord = false;
    if (random() > 0.75) {
      this.text = this.words[floor(random(this.words.length))];
      this.textSize = this.rad / 4.5;
      this.drawBottomWord = true;
    } else {
      this.text = this.symbols.charAt(floor(random(this.symbols.length)));
      this.textSize = this.rad / 1.75;
    }

    if (random() > 0.5) {
      this.points = floor(random(2, 6)) * 2;
    } else {
      this.points = 500;
    }
  }

  polygon(originX, originY, rad, points) {
    beginShape();
    for (let i = 0; i < points; i++) {
      const a = map(i, 0, points, 0, TWO_PI) - HALF_PI;
      const x = originX + cos(a) * rad;
      const y = originY + sin(a) * rad;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  draw() {
    translate(this.x, this.y);
    strokeWeight(this.strokeWeight);
    this.drawOuter();
    this.drawInner();
  }

  drawOuter() {
    if (random() > 0.125) {
      this.drawShadow();
    }
    fill(252);
    this.polygon(0, 0, this.rad, this.points);
  }

  drawShadow() {
    fill(this.shadowFill);
    this.polygon(
      this.strokeWeight * 2,
      this.strokeWeight * 2,
      this.rad,
      this.points
    );
  }

  drawInner() {
    if (random() > 0.5) {
      fill(this.fill);
      this.textColor = color(255);
    }
    this.polygon(0, 0, this.rad * random(0.625, 0.875), this.points);
    this.drawText();
  }

  drawText() {
    textAlign(CENTER, CENTER);
    textSize(this.textSize);
    fill(this.textColor);
    text(this.text, 0, 0);
  }
}

function createButton(x, y, rad) {
  const button = new Button(x, y, rad);
  push();
  button.draw();
  pop();
}
