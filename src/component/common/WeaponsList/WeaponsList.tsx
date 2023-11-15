"use client";
import { WeaponSummary } from "@/component/common/WeaponSummary/WeaponSummary";
import { Weapon } from "chivalry2-weapons/dist";
import styles from "./WeaponsList.module.scss";
import { useEffect, useState } from "react";
import { SearchInput } from "@/component/common/WeaponsList/SearchInput/SearchInput";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectGetAverageMinMaxWeaponsStats,
  updateMinMaxWeaponsStats,
} from "@/store/features/minMaxWeaponsStats/minMaxWeaponsStats";

interface Props {
  weaponsList: Weapon[];
  className?: string;
}

export const WeaponsList = ({ weaponsList, className }: Props) => {
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
    <div className={classNames(styles.weaponsList, className)}>
      <SearchInput
        onChange={handleSearch}
        currentValue={currentSearchValue}
        className={styles.searchInput}
      />
      <div className={styles.weapons}>
        {filteredList.map((weapon) => (
          <WeaponSummary
            weapon={weapon}
            key={weapon.id}
            averageMinMaxWeaponsStats={averageMinMaxWeaponsStats}
            className={styles.weaponSummary}
          />
        ))}
      </div>
    </div>
  );
};
