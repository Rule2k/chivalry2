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

interface MeleeAttackType<T extends keyof MeleeAttack> {
  highest: MeleeAttack[T];
  lowest: MeleeAttack[T];
}

interface SwingType<T extends keyof Swing> {
  highest: Swing[T];
  lowest: Swing[T];
}

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

  const values: (keyof MinMaxWeaponStats)[] = [
    "range",
    "damage",
    "windup",
    "release",
    "recovery",
    "staminaDamage",
  ];

  // get the best average numbers of all weapons
  const averageMinMaxWeaponsStats: MinMaxWeaponStats = ALL_WEAPONS.reduce(
    (acc: MinMaxWeaponStats, weapon) => {
      const floorTypes: (keyof SwingType<any>)[] = ["lowest", "highest"];

      const { average } = weapon.attacks;

      values.forEach((value) => {
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

  const valueNameAndValueType: Record<
    keyof MinMaxWeaponStats,
    { name: string; isLowerBetter: boolean }
  > = {
    damage: {
      name: "Damage",
      isLowerBetter: false,
    },
    range: {
      name: "Range",
      isLowerBetter: false,
    },
    staminaDamage: {
      name: "Stamina damage",
      isLowerBetter: false,
    },
    windup: {
      name: "Windup time",
      isLowerBetter: true,
    },
    release: {
      name: "Release time",
      isLowerBetter: true,
    },
    recovery: {
      name: "Recovery delay",
      isLowerBetter: true,
    },
  };

  return values.map((key) => {
    if (key === "range") {
      return {
        name: "Range",
        ratio: calculateRatio(
          averageMinMaxWeaponsStats.range.highest,
          averageMinMaxWeaponsStats.range.lowest,
          average.range + average.altRange,
        ),
        value: Math.round((average.range + average.altRange) / 2),
      };
    }

    return {
      name: valueNameAndValueType[key].name,
      ratio: calculateRatio(
        valueNameAndValueType[key].isLowerBetter
          ? averageMinMaxWeaponsStats[key].lowest
          : averageMinMaxWeaponsStats[key].highest,
        valueNameAndValueType[key].isLowerBetter
          ? averageMinMaxWeaponsStats[key].highest
          : averageMinMaxWeaponsStats[key].lowest,
        average.light[key] + average.heavy[key],
        key === "damage" ? currentWeaponDamageMultiplier : 1,
      ),
      value: Math.round((average.light[key] + average.heavy[key]) / 2),
    };
  });
};
