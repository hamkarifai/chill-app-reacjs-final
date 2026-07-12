import styles from "./Button.module.css";

/**
 * @param {Object} props
 * @param {"primary"|"secondary"|"outline"|"ghost"} props.variant
 * @param {"sm"|"md"|"lg"} props.size
 * @param {string} props.icon - emoji or text icon
 * @param {boolean} props.fullWidth
 */
const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        className,
      ].join(" ")}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
