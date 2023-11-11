import { ALL_WEAPONS, CharacterSubclass } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import { routes } from "../../../../config/next/routes";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";
import styles from "./SubClassesPage.module.scss";

interface Props {
  params: {
    class: string;
    subclass: keyof typeof CharacterSubclass;
  };
}

export const SubClassesPage = ({
  params: { subclass, class: currentClass },
}: Props) => {
  const currentSubclass = CharacterSubclass[subclass];
  const currentSubclassWeapons = ALL_WEAPONS.filter((weapon) =>
    weapon.subclasses.includes(currentSubclass),
  );

  if (!currentSubclass || currentSubclassWeapons.length < 0) {
    notFound();
  }

  return (
    <main className={styles.root}>
      <div>{currentSubclass}</div>
      <div className={styles.subClasses}>
        {currentSubclassWeapons.map((weapon) => (
          <CustomButton key={weapon.id} href={`${routes.weapon}/${weapon.id}`}>
            {weapon.name}
          </CustomButton>
        ))}
      </div>
      <CustomButton href={`${routes.class}/${currentClass}`} alternativeStyle>
        {`Return to the ${currentClass.toLowerCase()} page`}
      </CustomButton>
      <CustomButton href={`${routes.class}/${currentClass}`} alternativeStyle>
        Return to the homepage
      </CustomButton>
    </main>
  );
};
