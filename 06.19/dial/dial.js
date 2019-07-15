function drawDial(args) {
  // helper functions
  const helpers = {
    randomEvenNumber: (min, max) => {
      let num;
      do {
        num = floor(random(min, max));
      } while (num % 2 !== 0);
      return num;
    },
    choice: arr => {
      const i = floor(random(arr.length));
      return arr[i];
    },
    triangleSimple: (x, y, w, h) => {
      triangle(x, y, x + w / 2, y + h / 2, x + w, y);
    }
  };

  // vars
  const { x: originX, y: originY, radius } = args;
  const minPoints = 4;
  const maxPoints = 16;
  const PIOffset = PI / random(4, 5);
  const numPoints = helpers.randomEvenNumber(minPoints, maxPoints);
  // whole half or quater
  const pointIncrement = helpers.choice([1, 0.5, 0.25]);
  // choose what shape to draw for the main and sub dial points
  const primaryChoice = floor(random(0, 3));
  const secondaryChoice = floor(random(0, 3));

  const ellipseSizePrimary = random(4, 8);
  const ellipseSizeSecondary = ellipseSizePrimary * random(0.5, 1);

  const markerDepthPrimray = random(24, 48);
  const markerDepthSecondary = markerDepthPrimray * random(0.5, 1);

  const markerWidthPrimary = random(4, 8);
  const markerWidthSecondary = markerWidthPrimary * random(0.5, 1);

  const fillPrimary = random() > 0.5;
  const fillSecondary = !fillPrimary;

  const drawDot = (x, y, radius, shouldFill) => {
    push();
    // to fill or not to fill?
    noFill();
    if (shouldFill) fill(0);
    ellipse(x, y, radius);
    pop();
  };

  const drawRect = (x, y, width, height, shouldFill) => {
    push();
    let a = atan2(y, x) - HALF_PI;
    translate(x, y);
    rotate(a);
    // to fill or not to fill?
    noFill();
    if (shouldFill) fill(0);
    rect(-width / 2, width / 2, width, height);
    pop();
  };

  const drawTriangle = (x, y, width, height, shouldFill) => {
    push();
    let a = atan2(y, x) - HALF_PI;
    translate(x, y);
    rotate(a);
    // to fill or not to fill?
    noFill();
    if (shouldFill) fill(0);
    helpers.triangleSimple(-width / 2, width / 2, width, height);
    pop();
  };

  // return evenly spaced points around a circle, accounting of our 'offset' at the bottom, starting from 6 oClock (+ HALF_PI)
  const calcMappedCirclePos = (pointIndex, numPoints) => {
    const val =
      map(pointIndex, 0, numPoints, PIOffset, TWO_PI - PIOffset) + HALF_PI;
    return {
      x: cos(val),
      y: sin(val)
    };
  };

  const render = (originX, originY, radius, numPoints, pointIncrement) => {
    // translate to desired coords
    translate(originX, originY);

    for (let i = 0; i <= numPoints; i += pointIncrement) {
      let { x, y } = calcMappedCirclePos(i, numPoints);
      x *= radius;
      y *= radius;
      // draw 'main' markers
      if (i % 1 === 0) {
        textAlign(CENTER);
        text(i, x * 1.125, y * 1.125);
        switch (primaryChoice) {
          case 1:
            drawTriangle(
              x,
              y,
              markerWidthPrimary,
              -markerDepthPrimray,
              fillPrimary
            );
            break;
          case 2:
            drawRect(
              x,
              y,
              markerWidthPrimary,
              -markerDepthPrimray,
              fillPrimary
            );
            break;
          default:
            drawDot(x, y, ellipseSizePrimary, fillPrimary);
            break;
        }
      } else {
        // draw 'sub' markers
        switch (secondaryChoice) {
          case 1:
            drawTriangle(
              x,
              y,
              markerWidthSecondary,
              -markerDepthSecondary,
              fillSecondary
            );
            break;
          case 2:
            drawRect(
              x,
              y,
              markerWidthSecondary,
              -markerDepthSecondary,
              fillSecondary
            );
            break;
          default:
            drawDot(x, y, ellipseSizeSecondary, fillSecondary);
            break;
        }
      }
    }
  };

  /* 
    return to 0,0 after drawing dial as to not affect other els
    in the draw loop
  */

  push();
  render(originX, originY, radius, numPoints, pointIncrement);
  pop();
}
