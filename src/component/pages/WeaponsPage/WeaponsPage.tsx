"use client";
import { ALL_WEAPONS, weaponById } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import styles from "./WeaponsPage.module.scss";
import { Links } from "@/component/common/Links/Links";
import { WeaponSummary } from "@/component/common/WeaponSummary/WeaponSummary";
import { useContext, useState } from "react";
import { AverageMinMaxWeaponsStatsContext } from "@/context/averageMinMaxWeaponsStats/AverageMinMaxWeaponsStats";
import { WeaponsList } from "@/component/common/WeaponsList/WeaponsList";

interface Props {
  params: {
    weaponId: string;
  };
}

export const WeaponsPage = ({ params: { weaponId } }: Props) => {
  const [compareTargetWeapon, setCompareTargetWeapon] = useState<string | null>(
    null,
  );
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
      <WeaponsList
        weaponsList={ALL_WEAPONS}
        selectedWeapon={compareTargetWeapon}
        setSelectedWeapon={setCompareTargetWeapon}
        isCompareMode
      />
      <Links />
    </main>
  );
};
