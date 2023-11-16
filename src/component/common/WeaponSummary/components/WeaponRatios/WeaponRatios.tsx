import { Hover } from "@/component/common/WeaponSummary/components/Hover/Hover";
import { Ratio } from "@/interfaces/ratio";
import styles from "./WeaponRatios.module.scss";

interface Props {
  ratios: Ratio[];
}

export const WeaponRatios = ({ ratios }: Props) =>
  ratios.map(({ name, value, ratio, type }, index) => {
    return (
      <div key={name} className={styles.chart}>
        <div className={styles.chartName}>{name}</div>
        <Hover
          tooltip={
            <div className={styles.tooltip}>
              <span className={styles.ratio}>Top {ratio}% :</span>{" "}
              <span className={styles.value}>
                {value} {type}
              </span>
            </div>
          }
          direction={index >= ratios.length / 2 ? "right" : "left"}
        >
          <div className={styles.progressBar}>
            <div
              className={styles.progressBarValue}
              style={{
                width: `${ratio}%`,
              }}
            />
          </div>
        </Hover>
      </div>
    );
  });
