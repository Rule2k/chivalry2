import styles from "./SearchInput.module.scss";
import classNames from "classnames";

interface Props {
  onChange: (value: string) => void;
  currentValue: string;
  className?: string;
}

export const SearchInput = ({ onChange, currentValue, className }: Props) => {
  return (
    <div className={classNames(styles.searchInput, className)}>
      <h2>Filter your weapons:</h2>
      <div>
        <input
          type="text"
          name="name"
          onChange={(event) => onChange(event.target.value)}
          value={currentValue}
          className={styles.input}
        />
        <button onClick={() => onChange("")} className={styles.button}>
          Reset
        </button>
      </div>
    </div>
  );
};
