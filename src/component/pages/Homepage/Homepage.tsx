import { CharacterClass } from "chivalry2-weapons";
import { routes } from "../../../../config/next/routes";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";
import styles from "./Homepage.module.scss";
import { Container } from "@/component/common/Container/Container";

export const Homepage = () => (
  <main className={styles.root}>
    <h2>Select your class</h2>
    <Container className={styles.classes}>
      {Object.entries(CharacterClass).map(([key, value]) => {
        if (value !== CharacterClass.AVERAGE) {
          return (
            <CustomButton
              href={`${routes.class}/${key.toLowerCase()}`}
              key={key}
            >
              {value}
            </CustomButton>
          );
        }
      })}
    </Container>
  </main>
);
