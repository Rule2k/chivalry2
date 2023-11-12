export const calculateRatio = (
  maximum: number,
  minimum: number,
  current: number,
): number => {
  const range = maximum - minimum;
  const relativeValue = current / 2 - minimum;

  return relativeValue / range;
};
