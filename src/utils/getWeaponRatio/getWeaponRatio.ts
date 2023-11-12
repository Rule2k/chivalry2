import { ALL_WEAPONS, weaponById } from "chivalry2-weapons/dist";
import { Ratio } from "@/interfaces/ratio";

export const getWeaponRatio = (weaponId: string): null | Ratio[] => {
  const currentWeapon = weaponById(weaponId);

  if (!currentWeapon) return null;

  const getFloorValue = (
    currentValue: number,
    accumulatorValue: number,
    getMinValue?: boolean,
  ) => {
    if (getMinValue) {
      return Math.min(currentValue / 2, accumulatorValue);
    }
    return Math.max(currentValue / 2, accumulatorValue);
  };

  // get the best average numbers of all weapons
  const averageMinMaxWeaponsStats = ALL_WEAPONS.reduce(
    (previousValue, currentValue) => {
      const { average } = currentValue.attacks;

      return {
        averageLowestRange: getFloorValue(
          average.range + average.altRange,
          previousValue.averageLowestRange,
          true,
        ),
        averageHighestRange: getFloorValue(
          average.range + average.altRange,
          previousValue.averageHighestRange,
        ),
        averageLowestDamage: getFloorValue(
          average.light.damage + average.heavy.damage,
          previousValue.averageLowestDamage,
          true,
        ),
        averageHighestDamage: getFloorValue(
          average.light.damage + average.heavy.damage,
          previousValue.averageHighestDamage,
        ),
        averageLowestWindup: getFloorValue(
          average.light.windup + average.heavy.windup,
          previousValue.averageLowestWindup,
          true,
        ),
        averageHighestWindup: getFloorValue(
          average.light.windup + average.heavy.windup,
          previousValue.averageHighestWindup,
        ),
        averageLowestRelease: getFloorValue(
          average.light.release + average.heavy.release,
          previousValue.averageLowestRelease,
          true,
        ),
        averageHighestRelease: getFloorValue(
          average.light.release + average.heavy.release,
          previousValue.averageHighestRelease,
        ),
        averageLowestRecovery: getFloorValue(
          average.light.recovery + average.heavy.recovery,
          previousValue.averageLowestRecovery,
          true,
        ),
        averageHighestRecovery: getFloorValue(
          average.light.recovery + average.heavy.recovery,
          previousValue.averageHighestRecovery,
        ),
        averageLowestStamina: getFloorValue(
          average.light.staminaDamage + average.heavy.staminaDamage,
          previousValue.averageLowestStamina,
          true,
        ),
        averageHighestStamina: getFloorValue(
          average.light.staminaDamage + average.heavy.staminaDamage,
          previousValue.averageHighestStamina,
        ),
      };
    },
    {
      averageLowestRange: Infinity,
      averageHighestRange: 0,
      averageLowestDamage: Infinity,
      averageHighestDamage: 0,
      averageLowestWindup: Infinity,
      averageHighestWindup: 0,
      averageLowestRelease: Infinity,
      averageHighestRelease: 0,
      averageLowestRecovery: Infinity,
      averageHighestRecovery: 0,
      averageLowestStamina: Infinity,
      averageHighestStamina: 0,
    },
  );

  const {
    attacks: { average },
  } = currentWeapon;

  function calculateRatio(
    maximum: number,
    minimum: number,
    current: number,
  ): number {
    const range = maximum - minimum;
    const relativeValue = current / 2 - minimum;

    return relativeValue / range;
  }

  // return the ratio of the current weapon vs the highest of all weapons
  return [
    {
      name: "Range",
      value: calculateRatio(
        averageMinMaxWeaponsStats.averageHighestRange,
        averageMinMaxWeaponsStats.averageLowestRange,
        average.range + average.altRange,
      ),
    },
    {
      name: "Damage",
      value: calculateRatio(
        averageMinMaxWeaponsStats.averageHighestDamage,
        averageMinMaxWeaponsStats.averageLowestDamage,
        average.light.damage + average.heavy.damage,
      ),
    },
    {
      name: "Windup time",
      value: calculateRatio(
        averageMinMaxWeaponsStats.averageLowestWindup,
        averageMinMaxWeaponsStats.averageHighestWindup,
        average.light.windup + average.heavy.windup,
      ),
    },
    {
      name: "Release time",
      value: calculateRatio(
        averageMinMaxWeaponsStats.averageLowestRelease,
        averageMinMaxWeaponsStats.averageHighestRelease,
        average.light.release + average.heavy.release,
      ),
    },
    {
      name: "Recovery time",
      value: calculateRatio(
        averageMinMaxWeaponsStats.averageLowestRecovery,
        averageMinMaxWeaponsStats.averageHighestRecovery,
        average.light.recovery + average.heavy.recovery,
      ),
    },
    {
      name: "Stamina damage",
      value: calculateRatio(
        averageMinMaxWeaponsStats.averageHighestStamina,
        averageMinMaxWeaponsStats.averageLowestStamina,
        average.light.staminaDamage + average.heavy.staminaDamage,
      ),
    },
  ];
};
