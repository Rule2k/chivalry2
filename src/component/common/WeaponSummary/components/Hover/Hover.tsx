import React, { useState } from "react";
import styles from "./Hover.module.scss";

interface Props {
  tooltipText: string;
  children: React.ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
}

export const Hover = ({ children, tooltipText, direction }: Props) => {
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
      <div>{children}</div>
      {showTooltip && (
        <div className={styles.tooltipContent}>{tooltipText}</div>
      )}
    </div>
  );
};
