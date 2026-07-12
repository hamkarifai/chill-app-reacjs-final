import styles from "./StarRating.module.css";

/**
 * @param {Object} props
 * @param {number} props.rating - number like 4.2
 */
const StarRating = ({ rating }) => {
  return (
    <span className={styles.rating}>
      ★ {rating}
    </span>
  );
};

export default StarRating;
