import Link from "next/link";
import React from "react";
import styles from "./CustomButton.module.scss";
import classNames from "classnames";

interface Props {
  href: string;
  alternativeStyle?: boolean;
  children: React.ReactNode;
}

export const CustomButton = ({
  href,
  alternativeStyle = false,
  children,
}: Props) => (
  <Link
    href={href}
    className={classNames(styles.link, {
      [styles.alternativeLink]: alternativeStyle,
    })}
  >
    <div>{children}</div>
  </Link>
);
