export const getFloorValue = (
  currentValue: number,
  accumulatorValue: number,
  damageMultiplier: number,
  getMinValue?: boolean,
) => {
  if (getMinValue) {
    return Math.min((currentValue / 2) * damageMultiplier, accumulatorValue);
  }
  return Math.max((currentValue / 2) * damageMultiplier, accumulatorValue);
};
