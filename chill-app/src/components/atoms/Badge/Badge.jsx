import styles from "./Badge.module.css";

/**
 * @param {Object} props
 * @param {string} props.text
 * @param {"red"|"gray"|"blue"} props.color
 */
const Badge = ({ text, color = "red" }) => {
  return (
    <span className={[styles.badge, styles[color]].join(" ")}>
      {text}
    </span>
  );
};

export default Badge;
