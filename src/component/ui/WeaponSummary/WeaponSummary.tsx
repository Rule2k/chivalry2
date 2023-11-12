import { routes } from "../../../../config/next/routes";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";
import { Weapon } from "chivalry2-weapons/dist";
import { Ratio } from "@/interfaces/ratio";
import styles from "./WeaponSummary.module.scss";

interface Props {
  weapon: Weapon;
  ratios: Ratio[];
}

export const WeaponSummary = ({ weapon, ratios }: Props) => {
  return (
    <div className={styles.weaponSummary}>
      <CustomButton
        key={weapon.id}
        href={`${routes.weapon}/${weapon.id}`}
        className={styles.link}
      >
        {weapon.name}
      </CustomButton>
      <div>
        {ratios.map(({ name, value }) => {
          return (
            <div key={name}>
              <div>{name}</div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressBarValue}
                  style={{
                    width: `${Math.round(value * 100)}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
