const path = require("path");
const input = require("fs").readFileSync(
  path.join(__dirname, "../input.txt"),
  "utf-8"
);
const cards = input.split("\n");

const result = cards.reduce((acc, line) => {
  return acc + processCard(line);
}, 0);

console.log("RESULT: " + result);

function processCard(cardLine) {
  if (!cardLine) {
    return 0;
  }

  const {winning, obtained} = cardToData(cardLine);

  const totalLength = winning.length + obtained.length;
  const dedupe = new Set([...winning, ...obtained]).size;

  const hits = totalLength - dedupe;

  return hits === 0 ? 0 : 1 * 2 ** (hits - 1);
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
