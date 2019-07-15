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
  const PIOffset = PI / floor(random(4, 6));
  const numPoints = helpers.randomEvenNumber(minPoints, maxPoints);
  // whole half or quater
  const pointIncrement = helpers.choice([1, 0.5, 0.25]);

  const drawDot = (x, y, radius) => {
    ellipse(x, y, radius);
  };

  const drawRect = (x, y, width, height) => {
    rect(x, y, width, height);
  };

  const drawTriangle = (x, y, width, height) => {
    helpers.triangleSimple(x, y, width, height);
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
      push();
      // do the ting
      let a = atan2(y, x) - HALF_PI;
      translate(x, y);
      rotate(a);
      pop();
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
