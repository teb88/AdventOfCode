const MAX_BOX_CONSTRAINS = {
  red: 12,
  green: 13,
  blue: 14,
};

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

function isGamePossible(gameDataSet) {
  if (Array.isArray(gameDataSet[0])) {
    const results = [];
    for (const subGameDataSet of gameDataSet) {
      results.push(isGamePossible(subGameDataSet));
    }
    return results.every((res) => res === true);
  }

  const result = gameDataSet.every((boxesData) => {
    return Object.entries(boxesData).every(([color, amount]) => {
      return amount <= MAX_BOX_CONSTRAINS[color];
    });
  });

  return result;
}

const path = require("path");
const input = require("fs").readFileSync(path.join(__dirname, "../input.txt"), {
  encoding: "utf-8",
});

const result = input.split("\n").reduce((acc, line) => {
  const gameId = parseInt(line.split(":")[0].replace("Game ", ""));
  const gameDataSet = parseLineToGame(line);

  const isPossible = isGamePossible(gameDataSet);
  console.log(
    `Game ${gameId} ${isPossible ? "is possible" : "is NOT possible"}`
  );
  return isPossible ? acc + gameId : acc;
}, 0);

console.log("RESULT");
console.log(result);
