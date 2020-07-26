const getNestedProperty = require("./getNestedProperty");

describe("When I get a nested property", () => {
  describe("from an object without arrays", () => {
    const data = { foo: { bar: "BAR" } };
    const path = "foo.bar";
    describe("the result", () => {
      let result;
      beforeEach(() => (result = getNestedProperty(data, path)));
      it("is the value of the nested property", () => {
        expect(result).toEqual("BAR");
      });
    });
  });
  describe("from an array of objects", () => {
    const data = [{ foo: { bar: "BAR1" } }, { foo: { bar: "BAR2" } }];
    const path = "foo.bar";
    describe("the result", () => {
      let result;
      beforeEach(() => (result = getNestedProperty(data, path)));
      it("is an array of values of the nested properties", () => {
        expect(result).toEqual(["BAR1", "BAR2"]);
      });
    });
  });
  describe("from an object that contains arrays with objects", () => {
    const data = { foo: [{ bar: "BAR1" }, { bar: "BAR2" }] };
    const path = "foo.bar";
    describe("the result", () => {
      let result;
      beforeEach(() => (result = getNestedProperty(data, path)));
      it("is an array of values of the nested properties", () => {
        expect(result).toEqual(["BAR1", "BAR2"]);
      });
    });
  });
  describe("from an object that contains arrays with objects", () => {
    describe("and the nested properties are arrays", () => {
      const data = {
        foo: [{ bar: ["BAR1", "BAR2"] }, { bar: ["BAR3", "BAR4"] }]
      };
      const path = "foo.bar";
      describe("the result", () => {
        let result;
        beforeEach(() => (result = getNestedProperty(data, path)));
        it("is an array of values of the nested properties", () => {
          expect(result).toEqual(["BAR1", "BAR2", "BAR3", "BAR4"]);
        });
      });
    });
  });
  describe("from an object that contains arrays with objects", () => {
    describe("and the nested properties are sometimes array, sometimes plain values", () => {
      const data = { foo: [{ bar: ["BAR1", "BAR2"] }, { bar: "BAR3" }] };
      const path = "foo.bar";
      describe("the result", () => {
        let result;
        beforeEach(() => (result = getNestedProperty(data, path)));
        it("is an array of values of the nested properties", () => {
          expect(result).toEqual(["BAR1", "BAR2", "BAR3"]);
        });
      });
    });
  });
});
