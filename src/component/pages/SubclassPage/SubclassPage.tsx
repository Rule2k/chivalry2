import { ALL_WEAPONS, CharacterSubclass } from "chivalry2-weapons/dist";
import Link from "next/link";
import { notFound } from "next/navigation";
import { routes } from "../../../../config/routes";

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

  if (!currentSubclass || currentSubclassWeapons.length < 0) {
    notFound();
  }

  return (
    <main>
      <div>{currentSubclass}</div>
      <div>
        {currentSubclassWeapons.map((weapon) => (
          <Link key={weapon.id} href={`${routes.weapon}/${weapon.id}`}>
            {weapon.name}
          </Link>
        ))}
      </div>
    </main>
  );
};
