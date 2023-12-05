function getValueFromLine(entry) {
  const spelledNumbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const numbersRegex = new RegExp(/\d/, "g");
  const numbersMatches = entry.matchAll(numbersRegex);
  const numberMatchesIndexes = Array.from(numbersMatches).map((m) => [
    m.index,
    m[0],
  ]);

  const queued = numberMatchesIndexes.reduce((acc, [index, value]) => {
    acc[index] = parseInt(value);
    return acc;
  }, {});

  spelledNumbers.forEach((name, i) => {
    const numberNamesRegex = new RegExp(name, "g");
    const numberNameMatches = entry.matchAll(numberNamesRegex);
    const numberNamesMatchesIndexes = Array.from(numberNameMatches).map(
      (m) => m.index
    );
    numberNamesMatchesIndexes.forEach((index) => {
      queued[index] = i + 1;
    });
  });

  const sortedQueued = Object.entries(queued).sort((a, b) => {
    a[0] - b[0];
  });
  const digit = `${sortedQueued[0][1]}${
    sortedQueued[sortedQueued.length - 1][1]
  }`;
  return digit;
}

function main() {
  /**
   * read input file
   */
  const path = require("path");
  const input = require("fs").readFileSync(
    path.join(__dirname, "../input.txt"),
    {encoding: "utf-8"}
  );

  console.time("run");
  /**
   * process lines
   */
  const result = input.split("\n").reduce((acc, line) => {
    const value = getValueFromLine(line);
    return acc + parseInt(value);
  }, 0);
  console.log("result: ", result);
  console.timeEnd("run");
}

main();
