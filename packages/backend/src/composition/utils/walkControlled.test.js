const walkControlled = require("./walkControlled");
const walkControlledByButton = require("./walkControlledByButton");
const walkControlledByClip = require("./walkControlledByClip");
const walkControlledByRotaryOrMacro = require("./walkControlledByRotaryOrMacro");

jest.mock("./walkControlledByButton");
jest.mock("./walkControlledByClip");
jest.mock("./walkControlledByRotaryOrMacro");

const definitionNode = "DEFINITION_NODE";
const errorInfo = "ERROR_INFO";

describe("The “walkControlled” function", () => {
  describe("given a button control", () => {
    it("calls the “walkControlledByButton” function", () => {
      walkControlled(
        definitionNode,
        "foo",
        "bar",
        {
          control: "button1",
          on: true,
          off: false
        },
        errorInfo
      );
      expect(walkControlledByButton).toHaveBeenCalledWith(
        "DEFINITION_NODE",
        "foo.bar.button1",
        "button1",
        { button1: { on: true, off: false } },
        "ERROR_INFO"
      );
    });
  });
  describe("given a rotary control", () => {
    it("calls the “walkControlledByRotaryOrMacro function", () => {
      walkControlled(
        definitionNode,
        "foo",
        "bar",
        {
          control: "rotary1",
          min: 0,
          max: 127
        },
        errorInfo
      );
      expect(walkControlledByRotaryOrMacro).toHaveBeenCalledWith(
        "DEFINITION_NODE",
        "foo.bar.rotary1",
        "rotary1",
        { rotary1: { min: 0, max: 127 } },
        "ERROR_INFO"
      );
    });
  });
  describe("given a macro control", () => {
    it("calls the “walkControlledByRotaryOrMacro function", () => {
      walkControlled(
        definitionNode,
        "foo",
        "bar",
        {
          control: "macro8",
          min: 0,
          max: 127
        },
        errorInfo
      );
      expect(walkControlledByRotaryOrMacro).toHaveBeenCalledWith(
        "DEFINITION_NODE",
        "foo.bar.macro8",
        "macro8",
        { macro8: { min: 0, max: 127 } },
        "ERROR_INFO"
      );
    });
  });
  describe("given a clip control", () => {
    it("calls the “walkControlledByClip function", () => {
      walkControlled(
        definitionNode,
        "foo",
        "bar",
        {
          control: "clip",
          "1": 0,
          "2": 127
        },
        errorInfo
      );
      expect(walkControlledByClip).toHaveBeenCalledWith(
        "DEFINITION_NODE",
        "foo.bar.clip",
        "clip",
        { clip: { "1": 0, "2": 127 } },
        "ERROR_INFO"
      );
    });
  });
  describe("given an invalid control", () => {
    it("throw an error", () => {
      expect(() =>
        walkControlled(
          definitionNode,
          "foo",
          "bar",
          {
            control: "blafasel1",
            min: 0,
            max: 127
          },
          errorInfo
        )
      ).toThrow(
        "Illegal control type at foo.bar: expected button or rotary, received blafasel1"
      );
    });
  });
  afterEach(() => jest.clearAllMocks());
});
