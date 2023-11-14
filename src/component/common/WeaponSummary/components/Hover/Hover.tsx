import React, { useState } from "react";
import styles from "./Hover.module.scss";
import classNames from "classnames";

interface Props {
  tooltip: React.ReactNode;
  children: React.ReactNode;
  direction?: "left" | "right";
}

export const Hover = ({ children, tooltip, direction }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className={styles.tooltip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div
          className={classNames(styles.tooltipContent, {
            [styles.leftPosition]: direction === "left",
            [styles.rightPosition]: direction === "right",
          })}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};
