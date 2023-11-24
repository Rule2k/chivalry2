import styles from "./Container.module.scss";
import React from "react";
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Container = ({ children, onClick, className }: Props) => (
  <div className={classNames(styles.container, className)} onClick={onClick}>
    {children}
  </div>
);
