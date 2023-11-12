import { ALL_WEAPONS, weaponById } from "chivalry2-weapons/dist";

export const getWeaponRatio = (weaponId: string) => {
  const currentWeapon = weaponById(weaponId);

  if (!currentWeapon) return;

  const bestAverageNumbers = ALL_WEAPONS.reduce(
    (previousValue, currentValue) => {
      const { average } = currentValue.attacks;
      let {
        highestAverageRange,
        highestAverageHeavyDamage,
        lowestAverageHeavyWindup,
        lowestAverageHeavyRelease,
        lowestAverageHeavyRecovery,
        highestAverageLightDamage,
        lowestAverageLightWindup,
        lowestAverageLightRelease,
        lowestAverageLightRecovery,
      } = previousValue;

      highestAverageRange =
        highestAverageRange > average.range
          ? highestAverageRange
          : average.range;
      highestAverageHeavyDamage =
        highestAverageHeavyDamage > average.heavy.damage
          ? highestAverageHeavyDamage
          : average.heavy.damage;
      lowestAverageHeavyWindup =
        lowestAverageHeavyWindup < average.heavy.windup
          ? lowestAverageHeavyWindup
          : average.heavy.windup;
      lowestAverageHeavyRelease =
        lowestAverageHeavyRelease < average.heavy.release
          ? lowestAverageHeavyRelease
          : average.heavy.release;
      lowestAverageHeavyRecovery =
        lowestAverageHeavyRecovery < average.heavy.recovery
          ? lowestAverageHeavyRecovery
          : average.heavy.recovery;
      highestAverageLightDamage =
        highestAverageLightDamage > average.light.damage
          ? highestAverageLightDamage
          : average.light.damage;
      lowestAverageLightWindup =
        lowestAverageLightWindup < average.light.windup
          ? lowestAverageLightWindup
          : average.light.windup;
      lowestAverageLightRelease =
        lowestAverageLightRelease < average.light.release
          ? lowestAverageLightRelease
          : average.light.release;
      lowestAverageLightRecovery =
        lowestAverageLightRecovery < average.light.recovery
          ? lowestAverageLightRecovery
          : average.light.recovery;

      return {
        highestAverageRange,
        highestAverageHeavyDamage,
        lowestAverageHeavyWindup,
        lowestAverageHeavyRelease,
        lowestAverageHeavyRecovery,
        highestAverageLightDamage,
        lowestAverageLightWindup,
        lowestAverageLightRelease,
        lowestAverageLightRecovery,
      };
    },
    {
      highestAverageRange: 0,
      highestAverageHeavyDamage: 0,
      lowestAverageHeavyWindup: Infinity,
      lowestAverageHeavyRelease: Infinity,
      lowestAverageHeavyRecovery: Infinity,
      highestAverageLightDamage: 0,
      lowestAverageLightWindup: Infinity,
      lowestAverageLightRelease: Infinity,
      lowestAverageLightRecovery: Infinity,
    },
  );

  const {
    attacks: { average },
  } = currentWeapon;

  return {
    rangeRatio: average.range / bestAverageNumbers.highestAverageRange,
    heavyDamageRatio:
      average.heavy.damage / bestAverageNumbers.highestAverageHeavyDamage,
    heavyWindupRatio:
      bestAverageNumbers.lowestAverageHeavyWindup / average.heavy.windup,
    heavyReleaseRatio:
      bestAverageNumbers.lowestAverageHeavyRelease / average.heavy.release,
    heavyRecoveryRatio:
      bestAverageNumbers.lowestAverageHeavyRecovery / average.heavy.recovery,
    lightDamageRatio:
      average.light.damage / bestAverageNumbers.highestAverageLightDamage,
    lightWindupRatio:
      bestAverageNumbers.lowestAverageLightWindup / average.light.windup,
    lightReleaseRatio:
      bestAverageNumbers.lowestAverageLightRelease / average.light.release,
    lightRecoveryRatio:
      bestAverageNumbers.lowestAverageLightRecovery / average.light.recovery,
  };
};
