import {
  ALL_TARGETS,
  CharacterClass,
  CharacterSubclass,
} from "chivalry2-weapons/dist";
import Link from "next/link";

interface Props {
  params: {
    class: keyof typeof CharacterClass;
  };
}

export const ClassPage = ({ params: { class: classQuery } }: Props) => {
  const currentClass = ALL_TARGETS.find(
    (target) => target.characterClass === CharacterClass[classQuery],
  );
  return (
    <main>
      <div>{currentClass?.characterClass}</div>
      <div>
        {currentClass?.characterSubclasses.map((subClass) => {
          const subClassQuery = (
            Object.keys(CharacterSubclass) as (keyof typeof CharacterSubclass)[]
          ).find(
            (key: keyof typeof CharacterSubclass) =>
              CharacterSubclass[key] === subClass,
          );

          return (
            <Link
              href={`/class/${classQuery.toLowerCase()}/${subClassQuery?.toLowerCase()}`}
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
