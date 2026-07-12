import { useState } from "react";
import styles from "./InputField.module.css";

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {"text"|"password"|"email"} props.type
 * @param {string} props.placeholder
 * @param {string} props.value
 * @param {function} props.onChange
 */
const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          name={name}
          type={isPassword && showPass ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.input}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setShowPass((p) => !p)}
            aria-label={showPass ? "Sembunyikan sandi" : "Tampilkan sandi"}
          >
            {showPass ? "🙈" : "👁"}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
