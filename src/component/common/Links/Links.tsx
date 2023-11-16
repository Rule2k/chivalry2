"use client";
import { CustomButton } from "@/component/common/CustomButton/CustomButton";
import { routes } from "../../../../config/next/routes";
import styles from "./Links.module.scss";

interface Props {
  params?: {
    class?: string;
  };
}

export const Links = ({ params }: Props) => {
  const currentClass = params?.class;
  return (
    <div className={styles.links}>
      {currentClass && (
        <CustomButton href={`${routes.class}/${currentClass}`} alternativeStyle>
          {`Return to the ${currentClass.toLowerCase()} page`}
        </CustomButton>
      )}
      <CustomButton href="/" alternativeStyle>
        Return to the homepage
      </CustomButton>
    </div>
  );
};
