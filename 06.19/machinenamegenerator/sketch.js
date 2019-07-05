let wordGenerator;
let file;
let t;

function preload() {
  file = loadStrings(`./assets/scifi.txt`);
}

function setup() {
  createCanvas(400, 400);
  background(250);
  frameRate(1);

  for (let i = 0; i < file.length; i++) {
    t += file[i];
  }

  wordGenerator = new PseudoWordGenerator(t, 4, 2);
}

function draw() {
  background(250);
  textSize(32);
  text(wordGenerator.run(t), width / 2, height / 2);
}

class PseudoWordGenerator {
  constructor(input, targetLen, n) {
    // remove special chars, casing
    this.input = this.sanitizeInputString(input);
    // split input into words
    this.words = this.input.split(/\W+/);
    this.targetLen = targetLen;
    this.n = n;
    this.ngrams = {};
    this.finalWord;
  }

  sanitizeInputString(input) {
    let i = input.replace(/[0-9]/g, "");
    return i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
  }

  storeNgrams() {
    this.words.forEach(w => {
      const word = w;
      for (let i = 0; i < word.length - this.n; i++) {
        const gram = word.substring(i, i + this.n);
        const next = word.charAt(i + this.n);
        if (!this.ngrams.hasOwnProperty(gram)) {
          this.ngrams[gram] = [];
        }
        this.ngrams[gram].push(next);
      }
    });
  }

  generateWord() {
    let keys = Object.keys(this.ngrams);
    let curr = keys[floor(random(keys.length))];
    this.finalWord = curr;

    for (var i = 0; i < this.targetLen; i++) {
      if (this.ngrams.hasOwnProperty(curr)) {
        let possible = this.ngrams[curr];
        let next = this.choice(possible);

        this.finalWord += next;
        curr = this.finalWord.substring(
          this.finalWord.length - this.n,
          this.finalWord.length
        );
      }
    }
  }

  choice(list) {
    return list[floor(random(list.length))];
  }

  run() {
    this.storeNgrams();
    this.generateWord();
    this.finalWord = this.finalWord.toUpperCase();
    return this.finalWord;
  }
}
