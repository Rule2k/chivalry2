import type { Metadata } from "next";
import React from "react";
import styles from "./global.module.scss";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={styles.root}>
      <body>{children}</body>
    </html>
  );
}
