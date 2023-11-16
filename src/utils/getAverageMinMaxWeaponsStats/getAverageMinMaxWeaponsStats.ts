import {
  ALL_WEAPONS,
  CharacterClass,
  MeleeAttack,
} from "chivalry2-weapons/dist";
import { getFloorValue } from "@/utils/getAverageMinMaxWeaponsStats/getFloorValue";
import { Swing } from "chivalry2-weapons/dist/weapon";
import { targetByName } from "chivalry2-weapons/dist/all_targets";

interface ValueType<T> {
  highest: T;
  lowest: T;
}

type MeleeAttackType<T extends keyof MeleeAttack> = ValueType<MeleeAttack[T]>;
type SwingType<T extends keyof Swing> = ValueType<Swing[T]>;

interface MinMaxWeaponStats {
  damage: MeleeAttackType<"damage">;
  range: SwingType<"range"> | SwingType<"altRange">;
  staminaDamage: MeleeAttackType<"staminaDamage">;
  windup: MeleeAttackType<"windup">;
  release: MeleeAttackType<"release">;
  recovery: MeleeAttackType<"recovery">;
}

export interface StatsValues {
  name: string;
  isLowerBetter: boolean;
  type: "dmg" | "ms" | "";
  id: keyof MinMaxWeaponStats;
  highest: number;
  lowest: number;
}

const values: StatsValues[] = [
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

    values.forEach(
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
