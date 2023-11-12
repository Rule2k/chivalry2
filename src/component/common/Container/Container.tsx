import styles from "./Container.module.scss";
import React from "react";
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: Props) => (
  <div className={classNames(styles.container, className)}>{children}</div>
);
