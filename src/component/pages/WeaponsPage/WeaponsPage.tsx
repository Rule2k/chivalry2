import { weaponById } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import styles from "./WeaponsPage.module.scss";
import { Links } from "@/component/common/Links/Links";

interface Props {
  params: {
    weaponId: string;
  };
}

export const WeaponsPage = ({ params: { weaponId } }: Props) => {
  const weapon = weaponById(weaponId);

  if (!weapon) {
    notFound();
  }

  return (
    <main className={styles.root}>
      <h2>{weapon?.name}</h2>
      <Links />
    </main>
  );
};
