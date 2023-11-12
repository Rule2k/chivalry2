import { ALL_WEAPONS, CharacterSubclass } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import styles from "./SubClassesPage.module.scss";
import { Links } from "@/component/common/Links/Links";
import { WeaponSummary } from "@/component/common/WeaponSummary/WeaponSummary";
import { Explanation } from "@/component/pages/SubClassesPage/components/Explanation/Explanation";

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
      <h2>{`Select your ${currentSubclass} weapon`}</h2>
      <Explanation />
      <div className={styles.weapons}>
        {currentSubclassWeapons.map((weapon) => {
          return <WeaponSummary weapon={weapon} key={weapon.id} />;
        })}
      </div>
      <Links params={params} />
    </main>
  );
};
