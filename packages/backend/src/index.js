const { setInterval, setTimeout, cancelInterval } = require("./timeout");
const start = Date.now();

console.log(Date.now() - start, "setting interval for blub");
const handle = setInterval(() => console.log(Date.now() - start, "BLUB"), 1000);
console.log(Date.now() - start, "setting timeout to cancel blub", handle);
setTimeout(
  () =>
    console.log(
      Date.now() - start,
      cancelInterval(handle) ? "cancelled" : "not cancelled",
      handle
    ),
  3500
);
