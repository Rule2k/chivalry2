"use client";
import { WeaponSummary } from "@/component/common/WeaponSummary/WeaponSummary";
import { Weapon } from "chivalry2-weapons/dist";
import styles from "./WeaponsList.module.scss";
import { Explanation } from "@/component/common/WeaponsList/Explanation/Explanation";
import { useState } from "react";
import { SearchInput } from "@/component/common/WeaponsList/SearchInput/SearchInput";

interface Props {
  weaponsList: Weapon[];
  title?: string;
}

export const WeaponsList = ({ weaponsList, title }: Props) => {
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

  return (
    <div className={styles.weaponsList}>
      <h2>{title}</h2>
      <Explanation />
      <SearchInput
        onChange={handleSearch}
        currentValue={currentSearchValue}
        className={styles.searchInput}
      />
      <div className={styles.weapons}>
        {filteredList.map((weapon) => {
          return <WeaponSummary weapon={weapon} key={weapon.id} />;
        })}
      </div>
    </div>
  );
};
