import styles from "./NotFound.module.scss";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";

export const NotFound = () => (
  <div className={styles.root}>
    <div>Not found</div>
    <CustomButton href={"/"} alternativeStyle>
      Return to the homepage
    </CustomButton>
  </div>
);
