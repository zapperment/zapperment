const XToucher = require('./XToucher')

const xToucher = new XToucher();
xToucher.start();

function run() {
  setImmediate(run);
}
setTimeout(run, 100);
