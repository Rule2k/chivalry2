"use client";
import { routes } from "../../../../config/next/routes";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";
import { ALL_WEAPONS, CharacterClass, Weapon } from "chivalry2-weapons/dist";
import styles from "./WeaponSummary.module.scss";
import { Container } from "@/component/common/Container/Container";
import { getWeaponRatio } from "@/utils/getWeaponRatio/getWeaponRatio";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { TargetSelection } from "@/component/common/WeaponSummary/components/TargetSelection/TargetSelection";
import {
  getAverageMinMaxWeaponsStats,
  StatsValues,
} from "@/utils/getAverageMinMaxWeaponsStats/getAverageMinMaxWeaponsStats";
import { WeaponRatios } from "@/component/common/WeaponSummary/components/WeaponRatios/WeaponRatios";
import { WeaponsList } from "@/component/common/WeaponsList/WeaponsList";
import classNames from "classnames";

interface Props {
  weapon: Weapon;
  initialAverageMinMaxWeaponsStats: StatsValues[];
  isCompareMode?: boolean;
  compareModeChild?: boolean;
  className?: string;
  onClick?: (weapon: string) => void;
}

export const WeaponSummary = ({
  weapon,
  initialAverageMinMaxWeaponsStats,
  isCompareMode = false,
  compareModeChild = false,
  className,
}: Props) => {
  const [targetClass, setTargetClass] = useState<CharacterClass | null>(null);
  useState<Weapon | null>(null);
  const [averageMinMaxWeaponsStats, setUpdatedAverageMinMaxWeaponsStats] =
    useState<StatsValues[]>(initialAverageMinMaxWeaponsStats);
  const [compareTargetWeapon, setCompareTargetWeapon] = useState<string | null>(
    null,
  );

  console.log(compareTargetWeapon);

  useEffect(() => {
    if (targetClass) {
      setUpdatedAverageMinMaxWeaponsStats(
        getAverageMinMaxWeaponsStats(targetClass),
      );
    }
  }, [targetClass]);

  const ratios = useMemo(
    () => getWeaponRatio(weapon.id, targetClass, averageMinMaxWeaponsStats),
    [averageMinMaxWeaponsStats],
  );

  if (!ratios) {
    notFound();
  }

  return (
    <div className={classNames(styles.root, className)}>
      <Container
        {...(compareModeChild
          ? { onClick: () => setCompareTargetWeapon(weapon.id) }
          : {})}
        {...(compareModeChild ? { className: styles.compareModeChild } : {})}
      >
        <CustomButton
          key={weapon.id}
          {...(compareModeChild
            ? { href: null }
            : { href: `${routes.weapon}/${weapon.id}` })}
          className={styles.link}
        >
          {weapon.name}
        </CustomButton>
        {!compareModeChild && (
          <TargetSelection
            onClick={setTargetClass}
            currentTarget={targetClass}
            className={styles.targetSelection}
          />
        )}
        <div className={styles.charts}>
          <WeaponRatios ratios={ratios} />
        </div>
      </Container>
      {isCompareMode && (
        <WeaponsList weaponsList={ALL_WEAPONS} compareModeChild />
      )}
    </div>
  );
};
