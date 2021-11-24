const { readFileSync } = require("fs");
const { join } = require("path");

const readPath = join(__dirname, "../../../xtoucher.json");
const readInterval = 1000;
let prevReadTime = Date.now();
let prevData = null;

function run() {
  if (Date.now() > prevReadTime + readInterval) {
    const nextData = readFileSync(readPath, { encoding: "utf8" });
    prevReadTime = Date.now();
    if (nextData !== prevData) {
      const { currentCombinatorName, combinators } = JSON.parse(nextData);
      if (currentCombinatorName) {
        const { currentSceneNumber, scenes } =
          combinators[currentCombinatorName];
        const { variantA } = scenes[currentSceneNumber - 1];
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Variant A: ${variantA}`);
      }
      prevData = nextData;
    }
  }
  setImmediate(run);
}
setTimeout(run, 100);
