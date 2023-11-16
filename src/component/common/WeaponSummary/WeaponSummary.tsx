"use client";
import { routes } from "../../../../config/next/routes";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";
import { CharacterClass, Weapon } from "chivalry2-weapons/dist";
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

interface Props {
  weapon: Weapon;
  initialAverageMinMaxWeaponsStats: StatsValues[];
  className?: string;
}

export const WeaponSummary = ({
  weapon,
  initialAverageMinMaxWeaponsStats,
  className,
}: Props) => {
  const [targetClass, setTargetClass] = useState<CharacterClass | null>(null);
  const [averageMinMaxWeaponsStats, setUpdatedAverageMinMaxWeaponsStats] =
    useState<StatsValues[]>(initialAverageMinMaxWeaponsStats);

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
    <Container className={className}>
      <CustomButton
        key={weapon.id}
        href={`${routes.weapon}/${weapon.id}`}
        className={styles.link}
      >
        {weapon.name}
      </CustomButton>
      <TargetSelection
        onClick={setTargetClass}
        currentTarget={targetClass}
        className={styles.targetSelection}
      />
      <div className={styles.charts}>
        <WeaponRatios ratios={ratios} />
      </div>
    </Container>
  );
};
