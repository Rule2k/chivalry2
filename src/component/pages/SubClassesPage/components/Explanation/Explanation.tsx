import styles from "./Explanation.module.scss";

export const Explanation = () => (
  <p className={styles.root}>
    Values are compared to the best and worst statistics among all weapons.
    <br />
    <br />
    You can also choose a specific target class to display the damage values of
    the selected weapon in comparison to all other weapons targeting the same
    class.
    <br />
    <br />
    Since these values are relative to all other weapons, a weapon might have
    maximum damage against a specific target but lower stats against another
    target, as other weapons excel in dealing damage to that particular target.
  </p>
);
