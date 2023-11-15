"use client";
import { weaponById } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import styles from "./WeaponsPage.module.scss";
import { Links } from "@/component/common/Links/Links";
import { WeaponSummary } from "@/component/common/WeaponSummary/WeaponSummary";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectGetAverageMinMaxWeaponsStats,
  updateMinMaxWeaponsStats,
} from "@/store/features/minMaxWeaponsStats/minMaxWeaponsStats";
import { useEffect } from "react";

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

  const averageMinMaxWeaponsStats = useAppSelector(
    selectGetAverageMinMaxWeaponsStats,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!averageMinMaxWeaponsStats.length) {
      dispatch(updateMinMaxWeaponsStats({}));
    }
  }, []);

  return (
    <main className={styles.root}>
      <h2>{weapon?.name}</h2>
      <WeaponSummary
        weapon={weapon}
        averageMinMaxWeaponsStats={averageMinMaxWeaponsStats}
      />
      <Links />
    </main>
  );
};
