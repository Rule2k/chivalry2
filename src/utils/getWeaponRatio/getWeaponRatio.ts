import { CharacterClass, weaponById } from "chivalry2-weapons/dist";
import { Ratio } from "@/interfaces/ratio";
import { calculateRatio } from "@/utils/getWeaponRatio/calculateRatio";
import { targetByName } from "chivalry2-weapons/dist/all_targets";
import { StatsValues } from "@/utils/getAverageMinMaxWeaponsStats/getAverageMinMaxWeaponsStats";

export const getWeaponRatio = (
  weaponId: string,
  targetClass: CharacterClass | null,
  averageMinMaxWeaponsStats: StatsValues[],
): null | Ratio[] => {
  const currentWeapon = weaponById(weaponId);
  const currentTarget = targetClass && targetByName(targetClass);

  if (!currentWeapon) return null;

  const {
    attacks: { average },
  } = currentWeapon;

  return averageMinMaxWeaponsStats.map(
    ({ id, isLowerBetter, type, lowest, name, highest }) => {
      const isRange = id === "range";
      const value1 = isRange ? average.range : average.light[id];
      const value2 = isRange ? average.altRange : average.heavy[id];
      const maxValue = isLowerBetter ? lowest : highest;
      const minValue = isLowerBetter ? highest : lowest;
      const dmgMultiplier =
        id === "damage" && currentTarget
          ? currentTarget?.damageMultiplier(currentWeapon.damageType)
          : 1;
      const averageValue = ((value1 + value2) / 2) * dmgMultiplier;

      return {
        name,
        ratio: calculateRatio(maxValue, minValue, averageValue),
        value: Math.round(averageValue),
        type,
      };
    },
  );
};
