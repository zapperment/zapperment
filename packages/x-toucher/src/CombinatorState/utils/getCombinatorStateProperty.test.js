const getCombinatorStateProperty = require("./getCombinatorStateProperty");

describe("When I get a Combinator state property", () => {
  describe("and the specified property is not set on the provided data object", () => {
    describe("the resulting value", () => {
      let result;
      beforeEach(
        () => (result = getCombinatorStateProperty("foo", {}, { foo: "FOO" }))
      );
      it("is the property's value from the previous Combinator", () => {
        expect(result).toBe("FOO");
      });
    });
  });
  describe("and the specified property is set to a non-zero number on the provided data object", () => {
    describe("the resulting value", () => {
      let result;
      beforeEach(
        () =>
          (result = getCombinatorStateProperty("foo", { foo: 666 }, { foo: "FOO" }))
      );
      it("is the property's value from the data object", () => {
        expect(result).toBe(666);
      });
    });
  });
  describe("and the specified property is set to 0 on the provided data object", () => {
    describe("the resulting value", () => {
      let result;
      beforeEach(
        () =>
          (result = getCombinatorStateProperty("foo", { foo: 0 }, { foo: "FOO" }))
      );
      it("is 0", () => {
        expect(result).toBe(0);
      });
    });
  });
  describe("and the specified property is set to boolean true on the provided data object", () => {
    describe("the resulting value", () => {
      let result;
      beforeEach(
        () =>
          (result = getCombinatorStateProperty(
            "foo",
            { foo: true },
            { foo: "FOO" }
          ))
      );
      it("is boolean true", () => {
        expect(result).toBe(true);
      });
    });
  });
  describe("and the specified property is set to boolean false on the provided data object", () => {
    describe("the resulting value", () => {
      let result;
      beforeEach(
        () =>
          (result = getCombinatorStateProperty(
            "foo",
            { foo: false },
            { foo: "FOO" }
          ))
      );
      it("is boolean false", () => {
        expect(result).toBe(false);
      });
    });
  });
});
