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
import { SearchInput } from "@/component/common/WeaponsList/SearchInput/SearchInput";

interface Props {
  weapon: Weapon;
  initialAverageMinMaxWeaponsStats: StatsValues[];
  isCompareMode?: boolean;
  className?: string;
}

export const WeaponSummary = ({
  weapon,
  initialAverageMinMaxWeaponsStats,
  isCompareMode = true,
  className,
}: Props) => {
  const [targetClass, setTargetClass] = useState<CharacterClass | null>(null);
  const [searchCompareTarget, setSearchCompareTarget] = useState("");
  const [currentCompareTarget, setCurrentCompareTarget] =
    useState<Weapon | null>(null);
  const [averageMinMaxWeaponsStats, setUpdatedAverageMinMaxWeaponsStats] =
    useState<StatsValues[]>(initialAverageMinMaxWeaponsStats);

  useEffect(() => {
    if (targetClass) {
      setUpdatedAverageMinMaxWeaponsStats(
        getAverageMinMaxWeaponsStats(targetClass),
      );
    }
  }, [targetClass]);

  useEffect(() => {
    const searchResults = ALL_WEAPONS.filter((weapon) =>
      weapon.name.toLowerCase().includes(searchCompareTarget.toLowerCase()),
    );
    if (searchResults.length === 1) {
      setCurrentCompareTarget(searchResults[0]);
    }
  }, [searchCompareTarget]);

  const ratios = useMemo(
    () => getWeaponRatio(weapon.id, targetClass, averageMinMaxWeaponsStats),
    [averageMinMaxWeaponsStats],
  );

  const compareTargetRatios = useMemo(() => {
    return currentCompareTarget
      ? getWeaponRatio(
          currentCompareTarget?.id,
          targetClass,
          averageMinMaxWeaponsStats,
        )
      : null;
  }, [currentCompareTarget]);

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
      {isCompareMode && (
        <div>
          <div>
            <SearchInput
              onChange={setSearchCompareTarget}
              currentValue={searchCompareTarget}
            />
          </div>
          <div className={styles.charts}>
            {compareTargetRatios && (
              <WeaponRatios ratios={compareTargetRatios} />
            )}
          </div>
        </div>
      )}
    </Container>
  );
};
