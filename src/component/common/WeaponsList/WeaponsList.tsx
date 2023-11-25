"use client";
import { WeaponSummary } from "@/component/common/WeaponSummary/WeaponSummary";
import { Weapon } from "chivalry2-weapons/dist";
import styles from "./WeaponsList.module.scss";
import { useContext, useState } from "react";
import { SearchInput } from "@/component/common/WeaponsList/SearchInput/SearchInput";
import classNames from "classnames";
import { AverageMinMaxWeaponsStatsContext } from "@/context/averageMinMaxWeaponsStats/AverageMinMaxWeaponsStats";

interface Props {
  weaponsList: Weapon[];
  className?: string;
  isCompareMode?: boolean;
  selectedWeapon?: string | null;
  setSelectedWeapon?: (weapon: string) => void;
}

export const WeaponsList = ({
  weaponsList,
  className,
  isCompareMode,
  selectedWeapon,
  setSelectedWeapon,
}: Props) => {
  console.log({ selectedWeapon });
  const [filteredList, setFilteredList] = useState<Weapon[]>(weaponsList);
  const [currentSearchValue, setSearchCurrentValue] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchCurrentValue(value);
    setFilteredList(
      weaponsList.filter((weapon) =>
        weapon.name.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const { averageMinMaxWeaponsStats } = useContext(
    AverageMinMaxWeaponsStatsContext,
  );

  return (
    <div className={classNames(styles.weaponsList, className)}>
      <SearchInput
        onChange={handleSearch}
        currentValue={currentSearchValue}
        className={styles.searchInput}
        title={
          isCompareMode
            ? "Compare to a specific weapon:"
            : "Filter your weapons:"
        }
      />
      <div className={styles.weapons}>
        {filteredList.map((weapon) => (
          <WeaponSummary
            weapon={weapon}
            key={weapon.id}
            initialAverageMinMaxWeaponsStats={averageMinMaxWeaponsStats}
            className={styles.weaponSummary}
            isCompareMode={isCompareMode}
            onClick={setSelectedWeapon}
            isSelected={selectedWeapon === weapon.id}
          />
        ))}
      </div>
    </div>
  );
};
