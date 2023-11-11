import { weaponById } from "chivalry2-weapons/dist";
import { notFound } from "next/navigation";
import styles from "./WeaponsPage.module.scss";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";

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
      <div>{weapon?.name}</div>
      <CustomButton href={"/"} alternativeStyle>
        Return to the homepage
      </CustomButton>
    </main>
  );
};
