import type { Metadata } from "next";
import React from "react";
import styles from "./Layout.module.scss";
import { Volkhov } from "next/font/google";
import classNames from "classnames";
import { Header } from "@/component/common/Header/Header";
import { Footer } from "@/component/common/Footer/Footer";
import { Providers } from "@/store/Providers";

const volkhov = Volkhov({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Chivalry 2 - Weapon stats",
  description: "Weapon stats for Chivalry 2",
};

export const Layout = ({
  children,
}: {
  children: React.ReactNode;
  params: string;
}) => {
  return (
    <html lang="en" className={classNames(styles.root, volkhov.className)}>
      <body className={styles.body}>
        <Header />
        <Providers>
          <div className={styles.content}>{children}</div>
        </Providers>
        <Footer className={styles.footer} />
      </body>
    </html>
  );
};
