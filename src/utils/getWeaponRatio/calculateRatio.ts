export const calculateRatio = (
  maximum: number,
  minimum: number,
  current: number,
  currentWeaponDamageMultiplier: number = 1,
): number => {
  const range = maximum - minimum;
  const relativeValue = (current / 2) * currentWeaponDamageMultiplier - minimum;

  return relativeValue / range;
};
