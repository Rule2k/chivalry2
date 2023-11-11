import styles from "./NotFound.module.scss";
import { Links } from "@/component/common/Links/Links";

export const NotFound = () => (
  <div className={styles.root}>
    <div>Not found</div>
    <Links />
  </div>
);
