import {
  ALL_TARGETS,
  CharacterClass,
  CharacterSubclass,
} from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import { routes } from "../../../../config/next/routes";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";
import styles from "./ClassesPage.module.scss";
import { Links } from "@/component/common/Links/Links";

interface Props {
  params: {
    class: keyof typeof CharacterClass;
  };
}

export const ClassesPage = ({ params: { class: classQuery } }: Props) => {
  const currentClass = ALL_TARGETS.find(
    (target) => target.characterClass === CharacterClass[classQuery],
  );

  if (!currentClass) {
    notFound();
  }

  return (
    <main className={styles.root}>
      <h2>{currentClass?.characterClass}</h2>
      <div className={styles.subClasses}>
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
      </div>
      <Links />
    </main>
  );
};
