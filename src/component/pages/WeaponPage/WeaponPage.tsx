import { weaponById } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";

interface Props {
  params: {
    weaponId: string;
  };
}

export const WeaponPage = ({ params: { weaponId } }: Props) => {
  const weapon = weaponById(weaponId);

  if (!weapon) {
    notFound();
  }

  return <main>{weapon?.name}</main>;
};
