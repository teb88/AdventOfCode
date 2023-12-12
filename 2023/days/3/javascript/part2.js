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
// wip
