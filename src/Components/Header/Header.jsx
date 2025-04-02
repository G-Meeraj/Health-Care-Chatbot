import React from "react";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai"; // Import icons
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.contact}>
        <span className={`${styles.icon} ${styles.flipIcon}`}><AiOutlinePhone /></span>
        <span>+91 6301680400</span>
        <span className={styles.icon}><AiOutlineMail /></span>
        <span>ashainfo@gmail.com</span>
      </div>

      <div className={styles.auth}>
        <button type="button" className={styles.button}>Sign In</button>
        <button type="button" className={styles.button}>Register</button>
      </div>
    </header>
  );
};
