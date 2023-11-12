export const getFloorValue = (
  currentValue: number,
  accumulatorValue: number,
  getMinValue?: boolean,
) => {
  if (getMinValue) {
    return Math.min(currentValue / 2, accumulatorValue);
  }
  return Math.max(currentValue / 2, accumulatorValue);
};
