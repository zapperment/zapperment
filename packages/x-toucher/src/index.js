const XToucher = require("./XToucher");
const { writeFile, readFileSync, existsSync } = require("fs");
const { join } = require("path");

const dumpPath = join(__dirname, "../../../xtoucher.json");

let xToucher;
if (existsSync(dumpPath)) {
  const dump = readFileSync(dumpPath, { encoding: "utf8" });
  xToucher = new XToucher(JSON.parse(dump));
} else {
  xToucher = new XToucher();
}
xToucher.start();

const dumpInterval = 1000;
let lastDumpTime = Date.now();
let lastDump = null;

function run() {
  if (Date.now() > lastDumpTime + dumpInterval&&xToucher.reasonIsReady) {
    const dump = xToucher.toString();
    if (dump !== lastDump) {
      writeFile(dumpPath, dump, () => {});
    }
    lastDumpTime = Date.now();
    lastDump = dump;
  }
  setImmediate(run);
}
setTimeout(run, 100);
