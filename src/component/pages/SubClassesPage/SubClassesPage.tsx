import { ALL_WEAPONS, CharacterSubclass } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import styles from "./SubClassesPage.module.scss";
import { Links } from "@/component/common/Links/Links";
import { getWeaponRatio } from "@/utils/getWeaponRatio/getWeaponRatio";
import { WeaponSummary } from "@/component/ui/WeaponSummary/WeaponSummary";
import { Ratio } from "@/interfaces/ratio";

interface Props {
  params: {
    class: string;
    subclass: string;
  };
}

export const SubClassesPage = ({ params }: Props) => {
  const subclass = params.subclass;
  const currentSubclass =
    CharacterSubclass[subclass as keyof typeof CharacterSubclass];
  const currentSubclassWeapons = ALL_WEAPONS.filter((weapon) =>
    weapon.subclasses.includes(currentSubclass),
  );

  if (!currentSubclass || currentSubclassWeapons.length < 0) {
    notFound();
  }

  return (
    <main className={styles.root}>
      <h2>{currentSubclass}</h2>
      <div className={styles.weapons}>
        {currentSubclassWeapons.map((weapon) => {
          const ratios = getWeaponRatio(weapon.id);
          return (
            <WeaponSummary
              weapon={weapon}
              ratios={ratios as Ratio[]}
              key={weapon.id}
            />
          );
        })}
      </div>
      <Links params={params} />
    </main>
  );
};
