import { ALL_WEAPONS, CharacterSubclass } from "chivalry2-weapons/dist";
import Link from "next/link";

interface Props {
  params: {
    subclass: keyof typeof CharacterSubclass;
  };
}

export const SubclassPage = ({ params: { subclass } }: Props) => {
  const currentSubclass = CharacterSubclass[subclass];
  const currentSubclassWeapons = ALL_WEAPONS.filter((weapon) =>
    weapon.subclasses.includes(currentSubclass),
  );
  return (
    <main>
      <div>{currentSubclass}</div>
      <div>
        {currentSubclassWeapons.map((weapon) => (
          <Link key={weapon.id} href={`/weapons/${weapon.id}`}>
            {weapon.name}
          </Link>
        ))}
      </div>
    </main>
  );
};
