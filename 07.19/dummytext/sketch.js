function setup() {
  noCanvas();
  const txt = `
  Not surprisingly then, equity markets fell last week on the back of the first interest rate cut by the United States’ Federal Reserve Board in more than a decade (the last time the US Fed cut rates was in December 2008). Looking at the price action and commentary from the Fed, I suspect that the markets had priced in a 50 basis point cut (the Fed cut rates by only 25 basis points) with last week’s surprisingly good data giving the Fed some confidence that the economy wasn’t in need of additional support at this time. The disappointing 25 basis point cut combined with the Fed’s mention of “mid-cycle adjustment” — which created doubt about future rate cuts — and then President Donald Trump’s surprise announcement (via Twitter) of a new 10% tariff on Chinese products effective September 1 led to the markets’ worst week of 2019: the S&P 500 dropped 3.1% for the week to close at 2932.05.
  I find Tracy Alloway’s hypothesis that President Trump is using escalating tariffs on China as a tactic to force the Fed into deeper rate cuts compelling. As I discussed last week, the impact of the tariffs on China have been meaningful, but as evidenced by flat inflation and generally upbeat corporate earnings in Q2, their impact on the US have been muted — so far. Fed Chairman Jerome Powell had previously commented on the improvement in the trade war’s outlook as a reason for holding rates steady, and President Trump responded by addressing that issue promptly after the disappointing rate cut; the timing is unmistakable.
  `;

  const rm = new RiMarkov(2);
  rm.loadText(txt);
  const sentences = [];
  for (let i = 0; i < 50; i++) {
    sentences.push(rm.generateSentence(3));
  }
  for (let i = 0; i < 5; i++) {
    const pLength = floor(random(2, 8));
    const randomPos = floor(random(pLength, sentences.length - pLength));
    const p = document.createElement("p");
    for (let i = randomPos; i < randomPos + pLength; i++) {
      p.innerHTML += sentences[i];
    }
    document.body.appendChild(p);
  }
}
