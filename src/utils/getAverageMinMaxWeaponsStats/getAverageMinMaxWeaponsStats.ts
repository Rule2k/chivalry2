import { ALL_WEAPONS, CharacterClass } from "chivalry2-weapons/dist";
import { getFloorValue } from "@/utils/getAverageMinMaxWeaponsStats/getFloorValue";
import { targetByName } from "chivalry2-weapons/dist/all_targets";
import { StatsValues } from "@/interfaces/statsValues";

const initialMinMaxWeaponsStats: StatsValues[] = [
  {
    name: "Average damage",
    isLowerBetter: false,
    type: "dmg",
    id: "damage",
    highest: 0,
    lowest: Infinity,
  },
  {
    name: "Average range",
    isLowerBetter: false,
    type: "",
    id: "range",
    highest: 0,
    lowest: Infinity,
  },
  {
    name: "Average stamina damage",
    isLowerBetter: false,
    type: "dmg",
    id: "staminaDamage",
    highest: 0,
    lowest: Infinity,
  },
  {
    name: "Average windup time",
    isLowerBetter: true,
    type: "ms",
    id: "windup",
    highest: 0,
    lowest: Infinity,
  },
  {
    name: "Average release time",
    isLowerBetter: true,
    type: "ms",
    id: "release",
    highest: 0,
    lowest: Infinity,
  },
  {
    name: "Average recovery delay",
    isLowerBetter: true,
    type: "ms",
    id: "recovery",
    highest: 0,
    lowest: Infinity,
  },
];
export const getAverageMinMaxWeaponsStats = (targetClass?: CharacterClass) => {
  const currentTarget = targetClass && targetByName(targetClass);

  return ALL_WEAPONS.reduce((acc, weapon) => {
    const { average } = weapon.attacks;

    initialMinMaxWeaponsStats.forEach(
      ({ id, isLowerBetter, type, lowest, name, highest }, index) => {
        const currentTargetDamageMultiplier =
          id === "damage" && currentTarget
            ? currentTarget.damageMultiplier(weapon.damageType)
            : 1;

        acc[index] = {
          name,
          isLowerBetter,
          type,
          id,
          highest: getFloorValue(
            id === "range"
              ? average.range + average.altRange
              : average.heavy[id] + average.light[id],
            acc[index]?.highest || highest,
            currentTargetDamageMultiplier,
            false,
          ),
          lowest: getFloorValue(
            id === "range"
              ? average.range + average.altRange
              : average.heavy[id] + average.light[id],
            acc[index]?.lowest || lowest,
            currentTargetDamageMultiplier,
            true,
          ),
        };
      },
    );

    return acc;
  }, [] as StatsValues[]);
};
