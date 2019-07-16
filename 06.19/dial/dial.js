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
    },
    randomChars: length => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
  };

  // vars
  const { x: originX, y: originY, radius } = args;

  const minPoints = 2;
  const maxPoints = 10;
  const PIOffset = PI / random(4, 5);
  const numPoints = helpers.randomEvenNumber(minPoints, maxPoints);

  // whole half or quater
  const pointIncrement = helpers.choice([1, 0.5, 0.25]);
  // choose what shape to draw for the main and sub dial points
  const primaryChoice = floor(random(0, 4));
  const secondaryChoice = floor(random(0, 4));

  // secondary shapes are always smaller than primary

  const ellipseSizePrimary = random(radius / 14, radius / 10);
  const ellipseSizeSecondary = ellipseSizePrimary * random(0.5, 1);

  const markerDepthPrimary = random(radius / 4, radius / 2);
  const markerDepthSecondary = markerDepthPrimary * random(0.5, 1);

  const markerWidthPrimary = random(radius / 14, radius / 10);
  const markerWidthSecondary = markerWidthPrimary * random(0.5, 1);

  // which has a fill color?
  const fillPrimary = random() > 0.5;
  const fillSecondary = !fillPrimary;

  // the size of lines
  const lineDivider = random(1.075, 1.125);

  const pointMarker = floor(random(0, numPoints + 1));
  const markerType = floor(random(0, 3));

  const drawNums = random() > 0.5;
  const isOdd = random() > 0.5;

  const textDist = 1.25;
  const fontSize = radius / 7;

  const dialAcronymLength = floor(random(2, 4));

  const drawDot = (x, y, radius, shouldFill) => {
    push();
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
    noFill();
    if (shouldFill) fill(0);
    rect(-width / 2, 0, width, height);
    pop();
  };

  const drawTriangle = (x, y, width, height, shouldFill) => {
    push();
    let a = atan2(y, x) - HALF_PI;
    translate(x, y);
    rotate(a);
    noFill();
    if (shouldFill) fill(0);
    helpers.triangleSimple(-width / 2, 0, width, height);
    pop();
  };

  const drawLine = (x, y) => {
    line(x, y, x / lineDivider, y / lineDivider);
  };

  const drawMarker = (x, y) => {
    push();
    // draw the inner circle
    fill(0);
    ellipse(0, 0, radius, radius);
    let a = atan2(y, x) - HALF_PI;
    if (random() > 0.5) {
      fill(255);
    } else {
      noFill();
      strokeWeight(2);
      stroke(255);
    }
    switch (markerType) {
      case 0:
        let circRadius = random(radius / 12, radius / 8);
        ellipse(x / 3, y / 3, circRadius, circRadius);
        break;
      case 1:
        let triangleSize = random(radius / 10, radius / 6);
        rotate(a);
        helpers.triangleSimple(
          -triangleSize / 2,
          triangleSize / 2,
          triangleSize,
          radius / 2
        );
        break;
      default:
        let markerSize = random(radius / 14, radius / 10);
        rotate(a);
        rect(-markerSize / 2, markerSize / 2, markerSize, radius / 3);
        break;
    }
    pop();
  };

  // return evenly spaced points around a circle, accounting of our 'offset' at the bottom, starting from 6 oClock (+ HALF_PI)
  const calcMappedCirclePos = pointIndex => {
    const val =
      map(pointIndex, 0, numPoints, PIOffset, TWO_PI - PIOffset) + HALF_PI;
    return {
      x: cos(val),
      y: sin(val)
    };
  };

  const render = () => {
    // translate to desired coords
    translate(originX, originY);

    for (let i = 0; i <= numPoints; i += pointIncrement) {
      let { x, y } = calcMappedCirclePos(i);
      x *= radius;
      y *= radius;
      textAlign(CENTER);
      textSize(fontSize);
      // draw 'main' markers
      if (i % 1 === 0) {
        if (drawNums) {
          if (isOdd) {
            text(i + 1, x * textDist, y * textDist);
          } else {
            text(i, x * textDist, y * textDist);
          }
        } else {
          text(
            helpers.randomChars(dialAcronymLength),
            x * textDist,
            y * textDist
          );
        }

        switch (primaryChoice) {
          case 1:
            drawTriangle(
              x,
              y,
              markerWidthPrimary,
              -markerDepthPrimary,
              fillPrimary
            );
            break;
          case 2:
            drawRect(
              x,
              y,
              markerWidthPrimary,
              -markerDepthPrimary,
              fillPrimary
            );
            break;
          case 3:
            drawLine(x, y, markerDepthPrimary);
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
          case 3:
            drawLine(x, y, markerDepthSecondary);
            break;
          default:
            drawDot(x, y, ellipseSizeSecondary, fillSecondary);
            break;
        }
      }

      if (i === pointMarker) {
        drawMarker(x, y);
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
