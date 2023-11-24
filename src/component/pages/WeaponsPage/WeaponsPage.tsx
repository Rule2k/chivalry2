"use client";
import { weaponById } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import styles from "./WeaponsPage.module.scss";
import { Links } from "@/component/common/Links/Links";
import { WeaponSummary } from "@/component/common/WeaponSummary/WeaponSummary";
import { useContext } from "react";
import { AverageMinMaxWeaponsStatsContext } from "@/context/averageMinMaxWeaponsStats/AverageMinMaxWeaponsStats";

interface Props {
  params: {
    weaponId: string;
  };
}

export const WeaponsPage = ({ params: { weaponId } }: Props) => {
  const weapon = weaponById(weaponId);

  if (!weapon) {
    notFound();
  }

  const { averageMinMaxWeaponsStats } = useContext(
    AverageMinMaxWeaponsStatsContext,
  );

  return (
    <main className={styles.root}>
      <h2>{weapon?.name}</h2>
      <WeaponSummary
        weapon={weapon}
        initialAverageMinMaxWeaponsStats={averageMinMaxWeaponsStats}
        isCompareMode
      />
      <Links />
    </main>
  );
};
