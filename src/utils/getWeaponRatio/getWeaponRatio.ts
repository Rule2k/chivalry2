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

type Values =
  | "range"
  | "damage"
  | "windup"
  | "release"
  | "recovery"
  | "staminaDamage";

interface MinMaxWeaponStats {
  lowest_range: Swing["range"];
  highest_range: Swing["range"];
  lowest_damage: MeleeAttack["damage"];
  highest_damage: MeleeAttack["damage"];
  lowest_windup: MeleeAttack["windup"];
  highest_windup: MeleeAttack["windup"];
  lowest_release: MeleeAttack["release"];
  highest_release: MeleeAttack["release"];
  lowest_recovery: MeleeAttack["recovery"];
  highest_recovery: MeleeAttack["recovery"];
  lowest_staminaDamage: MeleeAttack["staminaDamage"];
  highest_staminaDamage: MeleeAttack["staminaDamage"];
}

export const getWeaponRatio = (
  weaponId: string,
  targetClass: CharacterClass,
): null | Ratio[] => {
  const currentWeapon = weaponById(weaponId);
  const currentTarget = targetByName(targetClass);

  if (!currentWeapon || !currentTarget) return null;
  // get the best average numbers of all weapons
  const averageMinMaxWeaponsStats: MinMaxWeaponStats = ALL_WEAPONS.reduce(
    (acc: MinMaxWeaponStats, weapon) => {
      const values: Values[] = [
        "range",
        "damage",
        "windup",
        "release",
        "recovery",
        "staminaDamage",
      ];

      const floorTypes = ["lowest_", "highest_"];

      const { average } = weapon.attacks;

      values.forEach((value) => {
        floorTypes.forEach((floorType) => {
          const key = `${floorType}${value}`;
          acc[key as keyof MinMaxWeaponStats] = getFloorValue(
            value === "range"
              ? average.range + average.altRange
              : average.heavy[value] + average.light[value],
            acc[key as keyof MinMaxWeaponStats],
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
      lowest_range: Infinity,
      highest_range: 0,
      lowest_damage: Infinity,
      highest_damage: 0,
      lowest_windup: Infinity,
      highest_windup: 0,
      lowest_release: Infinity,
      highest_release: 0,
      lowest_recovery: Infinity,
      highest_recovery: 0,
      lowest_staminaDamage: Infinity,
      highest_staminaDamage: 0,
    },
  );

  const {
    attacks: { average },
  } = currentWeapon;

  const currentWeaponDamageMultiplier = currentTarget.damageMultiplier(
    currentWeapon.damageType,
  );

  // return the ratio of the current weapon vs the highest of all weapons
  return [
    {
      name: "Range",
      value: calculateRatio(
        averageMinMaxWeaponsStats.highest_range,
        averageMinMaxWeaponsStats.lowest_range,
        average.range + average.altRange,
      ),
    },
    {
      name: "Damage",
      value: calculateRatio(
        averageMinMaxWeaponsStats.highest_damage,
        averageMinMaxWeaponsStats.lowest_damage,
        average.light.damage + average.heavy.damage,
        currentWeaponDamageMultiplier,
      ),
    },
    {
      name: "Windup time",
      value: calculateRatio(
        averageMinMaxWeaponsStats.lowest_windup,
        averageMinMaxWeaponsStats.highest_windup,
        average.light.windup + average.heavy.windup,
      ),
    },
    {
      name: "Release time",
      value: calculateRatio(
        averageMinMaxWeaponsStats.lowest_release,
        averageMinMaxWeaponsStats.highest_release,
        average.light.release + average.heavy.release,
      ),
    },
    {
      name: "Recovery time",
      value: calculateRatio(
        averageMinMaxWeaponsStats.lowest_recovery,
        averageMinMaxWeaponsStats.highest_recovery,
        average.light.recovery + average.heavy.recovery,
      ),
    },
    {
      name: "Stamina damage",
      value: calculateRatio(
        averageMinMaxWeaponsStats.highest_staminaDamage,
        averageMinMaxWeaponsStats.lowest_staminaDamage,
        average.light.staminaDamage + average.heavy.staminaDamage,
      ),
    },
  ];
};
