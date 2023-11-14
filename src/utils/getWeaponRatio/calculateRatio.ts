export const calculateRatio = (
  maximum: number,
  minimum: number,
  current: number,
): number => {
  const range = maximum - minimum;
  const relativeValue = current - minimum;

  return Math.round((relativeValue / range) * 100);
};
