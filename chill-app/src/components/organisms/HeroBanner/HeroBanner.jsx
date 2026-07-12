import Badge from "../../atoms/Badge";
import Button from "../../atoms/Button";
import styles from "./HeroBanner.module.css";

/**
 * @param {Object} props
 * @param {Object} props.data - { title, description, img, ageRating }
 */
const HeroBanner = ({ data }) => {
  return (
    <div
      className={styles.hero}
      style={{ backgroundImage: `url(${data.img})` }}
    >
      <div className={styles.content}>
        <div className={styles.badges}>
          <Badge text={data.ageRating} color="gray" />
        </div>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.description}>{data.description}</p>
        <div className={styles.actions}>
          <Button size="md" icon="▶">Mulai</Button>
          <Button variant="secondary" size="md" icon="ℹ">Selengkapnya</Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
