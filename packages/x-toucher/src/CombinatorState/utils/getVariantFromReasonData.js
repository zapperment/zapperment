function getVariantFromReasonData(prevVariant, ...buttons) {
  if (
    buttons.every((button) => button === undefined) ||
    !buttons.includes(true)
  ) {
    return prevVariant;
  }
  return buttons.findIndex((button) => button === true) + 1;
}

module.exports = getVariantFromReasonData;
