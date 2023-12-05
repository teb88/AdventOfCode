function parseLineToGame(line) {
  return line
    .split(":")[1]
    .trim()
    .split(";")
    .map((subGameString) => {
      return subGameString.split(",").map((boxInfoString) => {
        const [boxAmount, color] = boxInfoString.trim().split(" ");
        return {[color]: parseInt(boxAmount)};
      });
    });
}

function getMinRequiredCubes(gameDataSet) {
  const maxFoundCubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const subGameDataSet of gameDataSet) {
    for (const boxesData of subGameDataSet) {
      for (const [color, amount] of Object.entries(boxesData)) {
        if (maxFoundCubes[color] < amount) {
          maxFoundCubes[color] = amount;
        }
      }
    }
  }

  return (
    (maxFoundCubes.red || 1) *
    (maxFoundCubes.blue || 1) *
    (maxFoundCubes.green || 1)
  );
}
const path = require("path");
const input = require("fs").readFileSync(path.join(__dirname, "../input.txt"), {
  encoding: "utf-8",
});

const result = input.split("\n").reduce((acc, line) => {
  const gameDataSet = parseLineToGame(line);
  return acc + getMinRequiredCubes(gameDataSet);
}, 0);

console.log("RESULT");
console.log(result);
