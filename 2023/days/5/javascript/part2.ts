const input = await Bun.file("../input.txt").text();

type RangeMap = {sourceStart: number; destinationStart: number; range: number};

type Maps = {[key: number]: Array<RangeMap>};

const lines = input.split("\n");

async function run() {
  const seeds = getSeeds();
  const maps = getMaps();

  let minLocation = Infinity;

  for await (const seed of seeds) {
    const location = testSeed(seed, maps);
    minLocation = Math.min(minLocation, location);
  }

  console.log("Min location for seed:", minLocation);
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

function* getSeeds(): Generator<number> {
  const firstLine = lines[0];
  const seedList = firstLine
    .replace("seeds:", "")
    .trim()
    .split(" ")
    .map((val: string) => parseInt(val));

  let baseNumber = 0;
  for (let i = 0; i < seedList.length; i++) {
    if (i % 2 === 0) {
      baseNumber = seedList[i];
      yield baseNumber;
    } else {
      const start = baseNumber;
      const range = seedList[i];

      for (let j = 1; j <= range; j++) {
        yield start + j;
      }
    }
  }
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

console.time("run");
run();
console.timeEnd("run");
