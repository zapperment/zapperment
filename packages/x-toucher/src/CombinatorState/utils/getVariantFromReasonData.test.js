const getVariantFromReasonData = require("./getVariantFromReasonData");

test.each`
  prevVariant | button1      | button2      | button3      | expected
  ${0}        | ${true}      | ${false}     | ${false}     | ${1}
  ${0}        | ${false}     | ${true}      | ${false}     | ${2}
  ${0}        | ${false}     | ${false}     | ${true}      | ${3}
  ${0}        | ${false}     | ${false}     | ${false}     | ${0}
  ${0}        | ${undefined} | ${undefined} | ${undefined} | ${0}
  ${1}        | ${undefined} | ${undefined} | ${undefined} | ${1}
  ${2}        | ${undefined} | ${undefined} | ${undefined} | ${2}
  ${3}        | ${undefined} | ${undefined} | ${undefined} | ${3}
  ${0}        | ${true}      | ${undefined} | ${undefined} | ${1}
  ${0}        | ${undefined} | ${true}      | ${undefined} | ${2}
  ${0}        | ${undefined} | ${undefined} | ${true}      | ${3}
  ${1}        | ${false}     | ${undefined} | ${undefined} | ${1}
  ${1}        | ${undefined} | ${false}     | ${undefined} | ${1}
  ${1}        | ${undefined} | ${undefined} | ${false}     | ${1}
`(
  "For prevVariant=$prevVariant, b1=$button1, b2=$button2, b3=$button3 returns variant $expected",
  ({ prevVariant, button1, button2, button3, expected }) => {
    expect(
      getVariantFromReasonData(prevVariant, button1, button2, button3)
    ).toBe(expected);
  }
);
