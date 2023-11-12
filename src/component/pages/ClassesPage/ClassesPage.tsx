import {
  ALL_TARGETS,
  ALL_WEAPONS,
  CharacterClass,
  CharacterSubclass,
} from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import { routes } from "../../../../config/next/routes";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";
import styles from "./ClassesPage.module.scss";
import { Links } from "@/component/common/Links/Links";
import { Container } from "@/component/common/Container/Container";
import { WeaponsList } from "@/component/common/WeaponsList/WeaponsList";

interface Props {
  params: {
    class: keyof typeof CharacterClass;
  };
}

export const ClassesPage = ({ params: { class: classQuery } }: Props) => {
  const currentClass = ALL_TARGETS.find(
    (target) => target.characterClass === CharacterClass[classQuery],
  );
  const currentWeapons = ALL_WEAPONS.filter((weapon) =>
    weapon.classes.includes(CharacterClass[classQuery]),
  );

  if (!currentClass) {
    notFound();
  }

  const currentClassLowerCase = currentClass.characterClass.toLowerCase();

  return (
    <main className={styles.root}>
      <h2>{`Select your ${currentClassLowerCase} subclass`}</h2>
      <Container className={styles.subClasses}>
        {currentClass?.characterSubclasses.map((subClass) => {
          const subClassKey = (
            Object.keys(CharacterSubclass) as (keyof typeof CharacterSubclass)[]
          ).find(
            (key: keyof typeof CharacterSubclass) =>
              CharacterSubclass[key] === subClass,
          );

          return (
            <CustomButton
              href={`${
                routes.class
              }/${classQuery.toLowerCase()}/${subClassKey?.toLowerCase()}`}
              key={subClass}
            >
              {subClass}
            </CustomButton>
          );
        })}
      </Container>
      <WeaponsList
        weaponsList={currentWeapons}
        title={`All the ${currentClassLowerCase} weapons :`}
      />
      <Links />
    </main>
  );
};
