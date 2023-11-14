import {
  ALL_WEAPONS,
  CharacterClass,
  MeleeAttack,
  weaponById,
} from "chivalry2-weapons/dist";
import { Ratio } from "@/interfaces/ratio";
import { Swing } from "chivalry2-weapons/dist/weapon";
import { calculateRatio } from "@/utils/getWeaponRatio/calculateRatio";
import { getFloorValue } from "@/utils/getWeaponRatio/getFloorValue";
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

export const getWeaponRatio = (
  weaponId: string,
  targetClass: CharacterClass,
): null | Ratio[] => {
  const currentWeapon = weaponById(weaponId);
  const currentTarget = targetByName(targetClass);

  if (!currentWeapon || !currentTarget) return null;

  const valueNameAndValueType: Record<
    keyof MinMaxWeaponStats,
    { name: string; isLowerBetter: boolean; type: string }
  > = {
    damage: {
      name: "Average damage",
      isLowerBetter: false,
      type: "dmg",
    },
    range: {
      name: "Average range",
      isLowerBetter: false,
      type: "",
    },
    staminaDamage: {
      name: "Average stamina damage",
      isLowerBetter: false,
      type: "dmg",
    },
    windup: {
      name: "Average windup time",
      isLowerBetter: true,
      type: "ms",
    },
    release: {
      name: "Average release time",
      isLowerBetter: true,
      type: "ms",
    },
    recovery: {
      name: "Average recovery delay",
      isLowerBetter: true,
      type: "ms",
    },
  };

  // get the best average numbers of all weapons
  const averageMinMaxWeaponsStats: MinMaxWeaponStats = ALL_WEAPONS.reduce(
    (acc: MinMaxWeaponStats, weapon) => {
      const floorTypes: (keyof ValueType<any>)[] = ["lowest", "highest"];

      const { average } = weapon.attacks;

      (
        Object.keys(valueNameAndValueType) as (keyof MinMaxWeaponStats)[]
      ).forEach((value) => {
        floorTypes.forEach((floorType) => {
          acc[value][floorType] = getFloorValue(
            value === "range"
              ? average.range + average.altRange
              : average.heavy[value] + average.light[value],
            acc[value][floorType],
            value === "damage"
              ? currentTarget.damageMultiplier(weapon.damageType)
              : 1,
            floorType === floorTypes[0],
          );
        });
      });

      return acc;
    },
    {
      range: {
        highest: 0,
        lowest: Infinity,
      },
      damage: {
        highest: 0,
        lowest: Infinity,
      },
      windup: {
        highest: 0,
        lowest: Infinity,
      },
      release: {
        highest: 0,
        lowest: Infinity,
      },
      recovery: {
        highest: 0,
        lowest: Infinity,
      },
      staminaDamage: {
        highest: 0,
        lowest: Infinity,
      },
    },
  );

  const {
    attacks: { average },
  } = currentWeapon;

  const currentWeaponDamageMultiplier = currentTarget.damageMultiplier(
    currentWeapon.damageType,
  );

  return (
    Object.keys(valueNameAndValueType) as (keyof MinMaxWeaponStats)[]
  ).map((key) => {
    const isRange = key === "range";
    const lowestAverageValue = isRange
      ? averageMinMaxWeaponsStats.range.lowest
      : averageMinMaxWeaponsStats[key].lowest;
    const highestAverageValue = isRange
      ? averageMinMaxWeaponsStats.range.highest
      : averageMinMaxWeaponsStats[key].highest;
    const value1 = isRange ? average.range : average.light[key];
    const value2 = isRange ? average.altRange : average.heavy[key];
    const value = (value1 + value2) / 2;

    return {
      name: valueNameAndValueType[key].name,
      ratio: calculateRatio(
        valueNameAndValueType[key].isLowerBetter
          ? lowestAverageValue
          : highestAverageValue,
        valueNameAndValueType[key].isLowerBetter
          ? highestAverageValue
          : lowestAverageValue,
        value,
        key === "damage" ? currentWeaponDamageMultiplier : 1,
      ),
      value: Math.round(value),
      type: valueNameAndValueType[key].type,
    };
  });
};
