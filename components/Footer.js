import { contact } from "@/content";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.text}>{contact.footer}</span>
      </div>
    </footer>
  );
}
