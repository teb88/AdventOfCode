const path = require("path");
const input = require("fs").readFileSync(
  path.join(__dirname, "../input.txt"),
  "utf-8"
);

type RangeMap = {sourceStart: number; destinationStart: number; range: number};
enum MapType {
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
}

type Maps = {[key in MapType]: Array<RangeMap>};

const lines = input.split("\n");

function run() {
  const seeds = getSeeds();
  const maps = getMaps();
  const locations = seeds.map((seed) => testSeed(seed, maps));
  console.log(Math.min(...locations));
}

function testSeed(seed: number, maps: Maps): number {
  let value = seed;
  for (const ranges of Object.values(maps)) {
    value = traverseMap(value, ranges);
  }
  return value;
}

function traverseMap(value: number, ranges: Array<RangeMap>) {
  let minDistanceForThisMap = Infinity;
  for (const {destinationStart, sourceStart, range} of ranges) {
    // check if doesnt map
    if (value < sourceStart || sourceStart + range < value) {
      continue;
    }

    const candidateDestination = destinationStart + (value - sourceStart);
    minDistanceForThisMap = Math.min(
      minDistanceForThisMap,
      candidateDestination
    );
  }

  return minDistanceForThisMap === Infinity ? value : minDistanceForThisMap;
}

function getSeeds(): Array<number> {
  const firstLine = lines[0];
  const seedList = firstLine
    .replace("seeds:", "")
    .trim()
    .split(" ")
    .map((val: string) => parseInt(val));

  return seedList;
}

function getMaps(): Maps {
  const maps = {};
  let currentMap = 0;
  for (let i = 2; i < lines.length; i++) {
    if (!lines[i]) {
      continue;
    }

    if (lines[i].includes("map:")) {
      currentMap++;
      continue;
    }

    const [destinationStart, sourceStart, range] = lines[i]
      .split(" ")
      .map((val: string) => parseInt(val));

    maps[currentMap] ||= [];
    maps[currentMap].push({
      destinationStart,
      sourceStart,
      range,
    });
  }

  return maps as Maps;
}

run();
