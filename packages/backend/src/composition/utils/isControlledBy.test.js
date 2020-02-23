const isControlledBy = require("./isControlledBy");

describe("The “isControlledBy” function", () => {
  describe("given a button control type", () => {
    let isControlledByFunc;
    beforeEach(() => (isControlledByFunc = isControlledBy("button")));
    describe("and a null value node", () => {
      it("returns false", () => {
        expect(isControlledByFunc(null)).toBeFalsy();
      });
    });
    describe("and an undefined value node", () => {
      it("returns false", () => {
        expect(isControlledByFunc()).toBeFalsy();
      });
    });
    describe("and an array value node", () => {
      it("returns false", () => {
        expect(isControlledByFunc([])).toBeFalsy();
      });
    });
    describe("and a string value node", () => {
      it("returns false", () => {
        expect(isControlledByFunc("foo")).toBeFalsy();
      });
    });
    describe("and a number value node", () => {
      it("returns false", () => {
        expect(isControlledByFunc(666)).toBeFalsy();
      });
    });
    describe("and a boolean value node", () => {
      it("returns false", () => {
        expect(isControlledByFunc(true)).toBeFalsy();
      });
    });
    describe("and an object value node that is not a control node", () => {
      it("returns false", () => {
        expect(isControlledByFunc({})).toBeFalsy();
      });
    });
    describe("and a button control value node", () => {
      it("returns true", () => {
        expect(
          isControlledByFunc({
            control: "button1",
            on: true,
            off: false
          })
        ).toBeTruthy();
      });
    });
    describe("and a rotary control value node", () => {
      it("returns false", () => {
        expect(
          isControlledByFunc({
            control: "rotary1",
            min: 0,
            max: 127
          })
        ).toBeFalsy();
      });
    });
    describe("and a clip control value node", () => {
      it("returns false", () => {
        expect(
          isControlledByFunc({
            control: "clip",
            "1": 0,
            "2": 127
          })
        ).toBeFalsy();
      });
    });
    describe("and a macro control value node", () => {
      it("returns false", () => {
        expect(
          isControlledByFunc({
            control: "macro1",
            min: 0,
            max: 127
          })
        ).toBeFalsy();
      });
    });
    describe("and an invalid control value node", () => {
      it("returns false", () => {
        expect(
          isControlledByFunc({
            control: "blafasel",
            foo: 0,
            bar: 127
          })
        ).toBeFalsy();
      });
    });
  });
  describe("given a rotary control type", () => {
    let isControlledByFunc;
    beforeEach(() => (isControlledByFunc = isControlledBy("rotary")));
    describe("and an array value node", () => {
      it("returns false", () => {
        expect(isControlledByFunc([])).toBeFalsy();
      });
    });
    describe("and a rotary control value node", () => {
      it("returns true", () => {
        expect(
          isControlledByFunc({
            control: "rotary1",
            min: 0,
            max: 127
          })
        ).toBeTruthy();
      });
    });
    describe("and an invalid rotary control value node", () => {
      it("returns false", () => {
        expect(
          isControlledByFunc({
            control: "rotary5",
            min: 0,
            max: 127
          })
        ).toBeFalsy();
      });
    });
  });
  describe("given a macro control type", () => {
    let isControlledByFunc;
    beforeEach(() => (isControlledByFunc = isControlledBy("macro")));
    describe("and a macro control value node", () => {
      it("returns true", () => {
        expect(
          isControlledByFunc({
            control: "macro8",
            min: 0,
            max: 127
          })
        ).toBeTruthy();
      });
    });
    describe("and an invalid macro control value node", () => {
      it("returns true", () => {
        expect(
          isControlledByFunc({
            control: "macro16",
            min: 0,
            max: 127
          })
        ).toBeFalsy();
      });
    });
  });
  describe("given a clip control type", () => {
    let isControlledByFunc;
    beforeEach(() => (isControlledByFunc = isControlledBy("clip")));
    describe("and a clip control value node", () => {
      it("returns true", () => {
        expect(
          isControlledByFunc({
            control: "clip",
            "1": 0,
            "2": 127
          })
        ).toBeTruthy();
      });
    });
  });
});
