import Logo from "../../atoms/Logo";
import styles from "./AuthCard.module.css";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {React.ReactNode} props.children
 */
const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
