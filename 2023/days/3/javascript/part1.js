const path = require("path");
const input = require("fs").readFileSync(
  path.join(__dirname, "../input.txt"),
  "utf-8"
);

const lines = input.split("\n");

console.time("run");
const result = lines.reduce((acc, line, index) => {
  return acc + evalLine(line, index);
}, 0);
console.timeEnd("run");

console.log(result);

function evalLine(line, index) {
  const matchesNumbers = line.matchAll(/(\d+)/g);

  let lineSum = 0;

  for (const match of Array.from(matchesNumbers)) {
    const isValid = isNumberValid({
      value: match[0],
      indexStart: match.index,
      indexEnd: match.index + match[0].length,
      lineNumber: index,
    });
    if (isValid) {
      lineSum += parseInt(match[0]);
    }
  }

  return lineSum;
}

function isNumberValid({value, indexStart, indexEnd, lineNumber}) {
  const linesToScan = [];
  const start = Math.max(0, indexStart - 1);
  const end = Math.min(indexEnd + 1, lines[lineNumber].length);

  if (lineNumber >= 1) {
    linesToScan.push(lines[lineNumber - 1].slice(start, end));
  }

  linesToScan.push(lines[lineNumber].slice(start, end));

  if (lineNumber < lines.length - 1) {
    linesToScan.push(lines[lineNumber + 1].slice(start, end));
  }

  return !!linesToScan.join("").match(/[^A-Za-z0-9.]/g);
}
