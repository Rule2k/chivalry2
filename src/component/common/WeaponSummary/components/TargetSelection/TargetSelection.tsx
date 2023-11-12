import { CharacterClass } from "chivalry2-weapons/dist";
import styles from "./TargetSelection.module.scss";
import classNames from "classnames";

interface Props {
  onClick: (character: CharacterClass) => void;
  currentTarget: CharacterClass;
  className?: string;
}

export const TargetSelection = ({
  onClick,
  currentTarget,
  className,
}: Props) => (
  <div className={classNames(styles.targetSelection, className)}>
    <div>Select the targeted class :</div>
    <div className={styles.targets}>
      {Object.values(CharacterClass).map((character: CharacterClass) => {
        if (character !== CharacterClass.AVERAGE) {
          return (
            <div
              key={character}
              onClick={() => onClick(character)}
              className={classNames(styles.target, {
                [styles.selected]: currentTarget === character,
              })}
            >
              {character}
            </div>
          );
        }
      })}
    </div>
  </div>
);
