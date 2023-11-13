import Image from "next/image";
import React from "react";
import logo from "../../../../public/assets/logo.webp";
import styles from "./Header.module.scss";
import Link from "next/link";

export const Header = () => (
  <header className={styles.header}>
    <Link href="/">
      <Image
        src={logo}
        width={530}
        height={180}
        alt="Picture of the author"
        className={styles.image}
        priority
      />
    </Link>
    <h1>WEAPONS STATS</h1>
  </header>
);
