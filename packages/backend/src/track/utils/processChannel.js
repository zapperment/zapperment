const createMidiValueArray = require("./createMidiValueArray");
const interpolateMidiValue = require("./interpolateMidiValue");
const isControlled = require("./isControlled");
const getRandomEntry = require("./getRandomEntry");

const controllersNumbers = {
  rotary1: 71,
  rotary2: 72,
  rotary3: 73,
  rotary4: 74,
  button1: 75,
  button2: 76,
  button3: 77,
  button4: 78
};

const nodeIsIgnored = (nodeName, nodeValue) =>
  ["midi", "meta"].includes(nodeName) ||
  typeof nodeValue === "number" ||
  nodeValue === null;

/**
 * Given a channel from a track definition file with defaults set and
 * values converted to MIDI numbers, this function goes through the
 * track definition object tree and replaces parts that are controlled
 * by actual values, set by random according to the controller configuration.
 *
 * @returns {object} Object containing two properties: (1) scene – the
 *                   channel's scene, i.e. the final values for all channel
 *                   elements; (2) midiCommands – array of MIDI command
 *                   objects that can be used to dispatch MIDI controller
 *                   commands to Reason to set the channel scene
 */
module.exports = channel => {
  const controllers = {};
  const midiCommands = [];
  let scene = JSON.parse(JSON.stringify(channel));

  const walk = (parent, nodeName, nodeValue) => {
    if (nodeIsIgnored(nodeName, nodeValue)) {
      return;
    }
    if (isControlled(nodeValue)) {
      const setter = value => (parent[nodeName] = value);
      for (const [controllerName, controllerOptions] of Object.entries(
        nodeValue
      )) {
        if (controllerName.startsWith("rotary")) {
          const { min, max } = controllerOptions;
          if (min !== undefined || max !== undefined) {
            if (
              Object.keys(controllerOptions).length !== 2 ||
              min === undefined ||
              max === undefined
            ) {
              throw new Error(
                "Expected all ranged rotary controllers to have options “min” and “max” (and nothing else)"
              );
            }
            if (typeof min !== "number" || typeof max !== "number") {
              throw new Error(
                "Expected all ranged rotary controllers to have number values for “min” and “max”"
              );
            }
            if (!controllers[controllerName]) {
              controllers[controllerName] = createMidiValueArray().reduce(
                (acc, curr) => ({
                  ...acc,
                  [curr]: [() => setter(interpolateMidiValue(curr, min, max))]
                }),
                {}
              );
            } else {
              createMidiValueArray().forEach(curr => {
                controllers[controllerName][curr].push(() =>
                  setter(interpolateMidiValue(curr, min, max))
                );
              });
            }
          } else {
            if (!controllers[controllerName]) {
              controllers[controllerName] = Object.entries(
                controllerOptions
              ).reduce(
                (acc, [key, value]) => ({
                  ...acc,
                  [key]: [() => setter(value)]
                }),
                {}
              );
            } else {
              const nodeKeys = Object.keys(controllerOptions);
              if (
                Object.keys(controllers[controllerName]).length !==
                nodeKeys.length
              ) {
                throw new Error(
                  "Expected all stepped rotary controllers to have same number of options"
                );
              }
              nodeKeys.forEach(key => {
                const setters = controllers[controllerName][key];
                if (!setters) {
                  throw new Error(
                    "Expected all stepped rotary controllers to have same options for the same MIDI values"
                  );
                }
                setters.push(() => setter(nodeValue[controllerName][key]));
              });
            }
          }
        }
        if (controllerName.startsWith("button")) {
          if (
            Object.keys(controllerOptions).length !== 2 ||
            controllerOptions.on === undefined ||
            controllerOptions.off === undefined
          ) {
            throw new Error(
              "Expected all button controllers to have options “on” and “off” (and nothing else)"
            );
          }
          if (!controllers[controllerName]) {
            controllers[controllerName] = Object.entries(
              controllerOptions
            ).reduce(
              (acc, [key, value]) => ({ ...acc, [key]: [() => setter(value)] }),
              {}
            );
          } else {
            const nodeKeys = Object.keys(controllerOptions);
            nodeKeys.forEach(key => {
              const setters = controllers[controllerName][key];
              setters.push(() => setter(nodeValue[controllerName][key]));
            });
          }
        }
      }
      return;
    }
    for (const [key, value] of Object.entries(nodeValue)) {
      walk(nodeValue, key, value);
    }
  };

  walk(null, null, scene);

  for (const [controllerName, valueToSetterMap] of Object.entries(
    controllers
  )) {
    const [midiControllerValueString, setters] = getRandomEntry(
      valueToSetterMap
    );
    let midiControllerValue;
    if (controllerName.startsWith("rotary")) {
      midiControllerValue = parseInt(midiControllerValueString, 10);
    }
    if (controllerName.startsWith("button")) {
      midiControllerValue = midiControllerValueString === "on" ? 127 : 0;
    }
    setters.forEach(setter => setter());
    midiCommands.push({
      ...channel.midi,
      controller: controllersNumbers[controllerName],
      value: midiControllerValue
    });
  }

  return { midiCommands, scene };
};
