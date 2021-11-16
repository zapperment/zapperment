const XToucher = require("./XToucher");
const { writeFile } = require("fs");
const { join } = require("path");

const xToucher = new XToucher();
xToucher.start();

const dumpPath = join(__dirname, "../../../xtoucher.json");
const dumpInterval = 1000;
let lastDumpTime = Date.now();
let lastDump = null;

function run() {
  if (Date.now() > lastDumpTime + dumpInterval) {
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
