"use client";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";
import { CharacterClass, Weapon } from "chivalry2-weapons/dist";
import styles from "./WeaponSummary.module.scss";
import { Container } from "@/component/common/Container/Container";
import { getWeaponRatio } from "@/utils/getWeaponRatio/getWeaponRatio";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { TargetSelection } from "@/component/common/WeaponSummary/components/TargetSelection/TargetSelection";
import { Hover } from "@/component/common/WeaponSummary/components/Hover/Hover";
import { useAppDispatch } from "@/store/hooks";
import { updateMinMaxWeaponsStats } from "@/store/features/minMaxWeaponsStats/minMaxWeaponsStats";
import { StatsValues } from "@/interfaces/statsValues";
import { routes } from "@/config/next/routes";

interface Props {
  weapon: Weapon;
  averageMinMaxWeaponsStats: StatsValues[];
  className?: string;
}

export const WeaponSummary = ({
  weapon,
  averageMinMaxWeaponsStats,
  className,
}: Props) => {
  const [targetClass, setTargetClass] = useState<CharacterClass | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (targetClass) {
      dispatch(updateMinMaxWeaponsStats({ targetClass }));
    }
  }, [dispatch, targetClass]);

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
        {ratios.map(({ name, value, ratio, type }, index) => {
          return (
            <div key={name} className={styles.chart}>
              <div className={styles.chartName}>{name}</div>
              <Hover
                tooltip={
                  <div className={styles.tooltip}>
                    <span className={styles.ratio}>Top {ratio}% :</span>{" "}
                    <span className={styles.value}>
                      {value} {type}
                    </span>
                  </div>
                }
                direction={index >= ratios.length / 2 ? "right" : "left"}
              >
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressBarValue}
                    style={{
                      width: `${ratio}%`,
                    }}
                  />
                </div>
              </Hover>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
