const getControlNameAndOptions = require("./getControlNameAndOptions");
const createMidiValueArray = require("./createMidiValueArray");
const interpolateMidiValue = require("./interpolateMidiValue");
const isControlled = require("./isControlled");
const getRandomEntry = require("./getRandomEntry");

const nodeIsIgnored = (nodeName, nodeValue) =>
  ["trackNumber", "meta"].includes(nodeName) ||
  typeof nodeValue === "number" ||
  nodeValue === null;

/**
 * Given a track from a composition definition file with defaults set and
 * values converted to MIDI numbers, this function goes through the
 * track definition object tree and replaces parts that are controlled
 * by actual values, set by random according to the controller configuration.
 *
 * @returns {object} Object containing two properties: (1) scene – the
 *                   track's scene, i.e. the final values for all channel
 *                   elements; (2) commands – objects that can be used to
 *                   dispatch MIDI controller commands to Reason to set the
 *                   track scene
 */
module.exports = (track, errorInfo) => {
  errorInfo.track = { name: track.meta.name };
  const controllers = {};
  const commands = {};
  let scene = JSON.parse(JSON.stringify(track));

  const walk = (parent, nodeName, nodeValue, errorInfo) => {
    if (nodeIsIgnored(nodeName, nodeValue)) {
      return;
    }
    if (isControlled(nodeValue)) {
      const setter = value => {
        return (parent[nodeName] = value);
      };
      errorInfo.track.property = nodeName;
      const [controlName, controlOptions] = getControlNameAndOptions(nodeValue);
      if (controlName.startsWith("rotary") || controlName.startsWith("macro")) {
        const [, controlType] = controlName.match(/^([a-z]+).+$/);
        const { min, max } = controlOptions;
        if (min !== undefined || max !== undefined) {
          if (
            Object.keys(controlOptions).length !== 2 ||
            min === undefined ||
            max === undefined
          ) {
            throw new Error(
              `Expected all ranged ${controlType} controllers to have options “min” and “max” (and nothing else)`
            );
          }
          if (typeof min !== "number" || typeof max !== "number") {
            throw new Error(
              `Expected all ranged ${controlType} controllers to have number values for “min” and “max”`
            );
          }
          if (!controllers[controlName]) {
            controllers[controlName] = createMidiValueArray().reduce(
              (acc, curr) => ({
                ...acc,
                [curr]: [() => setter(interpolateMidiValue(curr, min, max))]
              }),
              {}
            );
          } else {
            createMidiValueArray().forEach(curr => {
              controllers[controlName][curr].push(() =>
                setter(interpolateMidiValue(curr, min, max))
              );
            });
          }
        } else {
          if (!controllers[controlName]) {
            controllers[controlName] = Object.entries(controlOptions).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: [() => setter(value)]
              }),
              {}
            );
          } else {
            const nodeKeys = Object.keys(controlOptions);
            if (
              Object.keys(controllers[controlName]).length !== nodeKeys.length
            ) {
              throw new Error(
                `Expected all stepped ${controlType} controllers to have same number of options`
              );
            }
            nodeKeys.forEach(key => {
              const setters = controllers[controlName][key];
              if (!setters) {
                throw new Error(
                  `Expected all stepped ${controlType} controllers to have same options for the same MIDI values`
                );
              }
              setters.push(() => setter(nodeValue[key]));
            });
          }
        }
      }
      if (controlName === "slice") {
        if (!controllers[controlName]) {
          controllers[controlName] = Object.entries(controlOptions).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: [() => setter(value)]
            }),
            {}
          );
        } else {
          const nodeKeys = Object.keys(controlOptions);
          if (
            Object.keys(controllers[controlName]).length !== nodeKeys.length
          ) {
            throw new Error(
              "Expected all slice controllers to have same number of options"
            );
          }
          nodeKeys.forEach(key => {
            const setters = controllers[controlName][key];
            if (!setters) {
              throw new Error(
                "Expected all slice controllers to have same options for the same MIDI values"
              );
            }
            setters.push(() => setter(nodeValue[key]));
          });
        }
      }
      if (controlName.startsWith("button")) {
        if (
          Object.keys(controlOptions).length !== 2 ||
          controlOptions.on === undefined ||
          controlOptions.off === undefined
        ) {
          throw new Error(
            "Expected all button controllers to have options “on” and “off” (and nothing else)"
          );
        }
        if (!controllers[controlName]) {
          controllers[controlName] = Object.entries(controlOptions).reduce(
            (acc, [key, value]) => ({ ...acc, [key]: [() => setter(value)] }),
            {}
          );
        } else {
          const nodeKeys = Object.keys(controlOptions);
          nodeKeys.forEach(key => {
            const setters = controllers[controlName][key];
            setters.push(() => setter(nodeValue[key]));
          });
        }
      }
      return;
    }
    for (const [key, value] of Object.entries(nodeValue)) {
      walk(nodeValue, key, value, errorInfo);
    }
  };

  walk(null, null, scene, errorInfo);

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
    commands[controllerName] = midiControllerValue;
  }

  return { commands, scene };
};
