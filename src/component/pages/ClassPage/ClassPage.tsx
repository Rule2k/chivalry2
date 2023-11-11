import {
  ALL_TARGETS,
  CharacterClass,
  CharacterSubclass,
} from "chivalry2-weapons/dist";
import Link from "next/link";
import { notFound } from "next/navigation";
import { routes } from "../../../../config/routes";

interface Props {
  params: {
    class: keyof typeof CharacterClass;
  };
}

export const ClassPage = ({ params: { class: classQuery } }: Props) => {
  const currentClass = ALL_TARGETS.find(
    (target) => target.characterClass === CharacterClass[classQuery],
  );

  if (!currentClass) {
    notFound();
  }

  return (
    <main>
      <div>{currentClass?.characterClass}</div>
      <div>
        {currentClass?.characterSubclasses.map((subClass) => {
          const subClassKey = (
            Object.keys(CharacterSubclass) as (keyof typeof CharacterSubclass)[]
          ).find(
            (key: keyof typeof CharacterSubclass) =>
              CharacterSubclass[key] === subClass,
          );

          return (
            <Link
              href={`${
                routes.class
              }/${classQuery.toLowerCase()}/${subClassKey?.toLowerCase()}`}
              key={subClass}
            >
              {subClass}
            </Link>
          );
        })}
      </div>
    </main>
  );
};
