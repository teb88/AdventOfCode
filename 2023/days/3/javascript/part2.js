const path = require("path");
const input = require("fs").readFileSync(
  path.join(__dirname, "../input.txt"),
  "utf-8"
);

const lines = input.split("\n");

/**
 * coordinates where an adjacent * was found
 * value is an array with the adjacent values
 */
const coordinates = new Map();

console.time("run");

// iterate over the lines
lines.forEach((line, index) => {
  evalLine(line, index);
});

let result = 0;

coordinates.forEach((value, key) => {
  if (value.length === 2) {
    result += value[0] * value[1];
  }
});

console.timeEnd("run");

console.log("RESULT: " + result);

function evalLine(line, index) {
  const matchesNumbers = line.matchAll(/(\d+)/g);

  for (const match of Array.from(matchesNumbers)) {
    findAdjacentAsterisk({
      value: parseInt(match[0]),
      indexStart: match.index,
      indexEnd: match.index + match[0].length,
      lineNumber: index,
    });
  }
}

function findAdjacentAsterisk({value, indexStart, indexEnd, lineNumber}) {
  const linesToScan = [];
  const start = Math.max(0, indexStart - 1);
  const end = Math.min(indexEnd + 1, lines[lineNumber].length - 1);

  if (lineNumber >= 1) {
    linesToScan.push(lineNumber - 1);
  }

  linesToScan.push(lineNumber);

  if (lineNumber < lines.length - 1) {
    linesToScan.push(lineNumber + 1);
  }

  const occurrences = [];
  for (let i = 0; i < linesToScan.length; i++) {
    for (let pos = start; pos < end; pos++) {
      if (lines[linesToScan[i]].charAt(pos) === "*") {
        occurrences.push({index: pos, line: linesToScan[i]});
      }
    }
  }

  occurrences.forEach(({index, line}) => {
    const coordName = `${line}x${index}`;
    if (coordinates.has(coordName)) {
      coordinates.get(coordName).push(value);
    } else {
      coordinates.set(coordName, [value]);
    }
  });
}
