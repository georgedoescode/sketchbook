const ngrams = {};

const txt = ``;

const n = 1;
const desiredWordLength = 4;

function setup() {
  createCanvas(400, 400);
  background(250);
  noLoop();
}

// Start with an arbitrary ngram

function draw() {
  const words = txt.split(/\W+/);
  words.forEach(w => {
    const word = w.toLowerCase();
    for (var i = 0; i < word.length - n; i++) {
      // look at an ngram
      const gram = word.substring(i, i + n);
      // look at the next character
      const next = word.charAt(i + n);
      // if this is a new one, make an empty array
      if (!ngrams.hasOwnProperty(gram)) {
        ngrams[gram] = [];
      }
      // add the character as a possible outcome

      ngrams[gram].push(next);
    }
  });

  const keys = Object.keys(ngrams);
  let curr = keys[floor(random(keys.length))];
  let finalWord = curr;

  for (var i = 0; i < desiredWordLength; i++) {
    if (ngrams.hasOwnProperty(curr)) {
      const possible = ngrams[curr];
      const next = choice(possible);

      finalWord += next;
      curr = finalWord.substring(finalWord.length - 1, finalWord.length);
    } else break;
  }
  rectMode(CENTER);
  finalWord += ` mk${floor(random(1, 5))}`;
  text(finalWord.toUpperCase(), width / 2, height / 2);
}

function choice(list) {
  const i = floor(random(list.length));
  return list[i];
}
