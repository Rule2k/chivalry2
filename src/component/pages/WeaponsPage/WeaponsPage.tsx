import { weaponById } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import styles from "./WeaponsPage.module.scss";
import { Links } from "@/component/common/Links/Links";
import { WeaponSummary } from "@/component/common/WeaponSummary/WeaponSummary";
import { useMemo } from "react";
import { getAverageMinMaxWeaponsStats } from "@/utils/getAverageMinMaxWeaponsStats/getAverageMinMaxWeaponsStats";

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

  const averageMinMaxWeaponsStats = useMemo(
    () => getAverageMinMaxWeaponsStats(),
    [],
  );

  return (
    <main className={styles.root}>
      <h2>{weapon?.name}</h2>
      <WeaponSummary
        weapon={weapon}
        initialAverageMinMaxWeaponsStats={averageMinMaxWeaponsStats}
      />
      <Links />
    </main>
  );
};
