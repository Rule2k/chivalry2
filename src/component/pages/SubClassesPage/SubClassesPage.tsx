import { ALL_WEAPONS, CharacterSubclass } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import styles from "./SubClassesPage.module.scss";
import { Links } from "@/component/common/Links/Links";
import { WeaponsList } from "@/component/common/WeaponsList/WeaponsList";

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

  const currentSubclassLowerCase = currentSubclass.toLowerCase();

  return (
    <main className={styles.root}>
      <WeaponsList
        weaponsList={currentSubclassWeapons}
        className={styles.weaponsList}
      />
      <Links params={params} />
    </main>
  );
};
