import React from "react";
import { Button } from "@/components/atoms/Button";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      Hello
      <Button />
    </div>
  );
}
