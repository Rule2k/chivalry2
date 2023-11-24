import Link from "next/link";
import React from "react";
import styles from "./CustomButton.module.scss";
import classNames from "classnames";

interface Props {
  href: string | null;
  alternativeStyle?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const CustomButton = ({
  href,
  alternativeStyle = false,
  children,
  className,
}: Props) => {
  return href ? (
    <Link
      href={href}
      className={classNames(
        styles.link,
        {
          [styles.alternativeLink]: alternativeStyle,
        },
        className,
      )}
    >
      {children}
    </Link>
  ) : (
    <div className={classNames(styles.link, className)}>{children}</div>
  );
};
