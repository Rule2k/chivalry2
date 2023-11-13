"use client";
import { routes } from "../../../../config/next/routes";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";
import { CharacterClass, Weapon } from "chivalry2-weapons/dist";
import styles from "./WeaponSummary.module.scss";
import { Container } from "@/component/common/Container/Container";
import { getWeaponRatio } from "@/utils/getWeaponRatio/getWeaponRatio";
import { notFound } from "next/navigation";
import { useState } from "react";
import { TargetSelection } from "@/component/common/WeaponSummary/components/TargetSelection/TargetSelection";
import { Hover } from "@/component/common/WeaponSummary/components/Hover/Hover";

interface Props {
  weapon: Weapon;
}

export const WeaponSummary = ({ weapon }: Props) => {
  const [targetClass, setTargetClass] = useState<CharacterClass>(
    CharacterClass.ARCHER,
  );
  const ratios = getWeaponRatio(weapon.id, targetClass);

  if (!ratios) {
    notFound();
  }

  return (
    <Container>
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
        {ratios.map(({ name, value }) => {
          return (
            <div key={name} className={styles.chart}>
              <div className={styles.chartName}>{name}</div>
              <Hover tooltipText={`${Math.round(value * 100)}%`}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressBarValue}
                    style={{
                      width: `${Math.round(value * 100)}%`,
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
