const path = require("path");
const input = require("fs").readFileSync(
  path.join(__dirname, "../input.txt"),
  "utf-8"
);

const cards = input.split("\n");

console.time("run");

const repeatCount = [0];
let result = 0;

for (let lineIndex = 0; lineIndex < cards.length; lineIndex++) {
  const repeats = repeatCount[lineIndex] ? repeatCount[lineIndex] + 1 : 1;
  const winningNumbers = processCard(cards[lineIndex]);

  for (let nextLineInc = 0; nextLineInc < winningNumbers; nextLineInc++) {
    repeatCount[lineIndex + nextLineInc + 1] ||= 0;
    repeatCount[lineIndex + nextLineInc + 1] += repeats;
  }

  result += repeats;
}
console.timeEnd("run");

console.log("RESULT: " + result);

function processCard(cardLine) {
  if (!cardLine) {
    return 0;
  }

  const {winning, obtained} = cardToData(cardLine);

  const totalLength = winning.length + obtained.length;
  const dedupe = new Set([...winning, ...obtained]).size;

  return totalLength - dedupe;
}

function cardToData(cardLine) {
  const cardParts = cardLine.split("|");
  const winningNumbersStr = cardParts[0].substring(
    cardParts[0].indexOf(":") + 1
  );

  const winningNumbers = Array.from(winningNumbersStr.matchAll(/(\d+)/g)).map(
    (match) => match[0]
  );

  const obtainedNumbers = Array.from(cardParts[1].matchAll(/(\d+)/g)).map(
    (match) => match[0]
  );

  return {
    winning: winningNumbers,
    obtained: obtainedNumbers,
  };
}
