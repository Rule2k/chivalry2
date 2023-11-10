import { weaponById } from "chivalry2-weapons/dist";

interface Props {
  params: {
    weaponId: string;
  };
}

export const WeaponPage = ({ params: { weaponId } }: Props) => {
  const weapon = weaponById(weaponId);
  return <main>{weapon?.name}</main>;
};
