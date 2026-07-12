import Logo from "../../atoms/Logo";
import { GENRES, BANTUAN } from "../../../data/movies";
import styles from "./Footer.module.css";

const Footer = () => {
  const genreColumns = [
    GENRES.slice(0, 4),
    GENRES.slice(4, 8),
    GENRES.slice(8, 12),
    GENRES.slice(12),
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.copy}>@2023 Chill All Rights Reserved.</p>
        </div>

        <div className={styles.genreSection}>
          <h4 className={styles.heading}>Genre</h4>
          <div className={styles.genreColumns}>
            {genreColumns.map((col, i) => (
              <ul key={i} className={styles.colList}>
                {col.map((g) => (
                  <li key={g} className={styles.item}>{g}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className={styles.helpSection}>
          <h4 className={styles.heading}>Bantuan</h4>
          <ul className={styles.colList}>
            {BANTUAN.map((b) => (
              <li key={b} className={styles.item}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
