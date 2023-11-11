import { ALL_WEAPONS, CharacterSubclass } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import { routes } from "../../../../config/next/routes";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";
import styles from "./SubClassesPage.module.scss";
import { Links } from "@/component/common/Links/Links";

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
        {currentSubclassWeapons.map((weapon) => (
          <CustomButton key={weapon.id} href={`${routes.weapon}/${weapon.id}`}>
            {weapon.name}
          </CustomButton>
        ))}
      </div>
      <Links params={params} />
    </main>
  );
};
