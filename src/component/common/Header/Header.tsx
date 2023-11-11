import Image from "next/image";
import React from "react";
import logo from "../../../../public/assets/logo.webp";
import styles from "./Header.module.scss";

export const Header = () => (
  <header className={styles.header}>
    <Image
      src={logo}
      width={530}
      height={180}
      alt="Picture of the author"
      className={styles.image}
    />
    <h1>WEAPONS STATS</h1>
  </header>
);
