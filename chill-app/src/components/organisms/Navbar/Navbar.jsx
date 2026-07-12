import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../atoms/Logo";
import { NAV_LINKS } from "../../../data/movies";
import styles from "./Navbar.module.css";

/**
 * @param {Object} props
 * @param {Object} props.user - { username, avatar }
 * @param {() => void} [props.onOpenFavorites]
 * @param {() => void} [props.onAddMovie]
 */
const Navbar = ({ user, onOpenFavorites, onAddMovie }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setProfileOpen(false);
    navigate("/login");
  };

  const handleFavoriteClick = () => {
    setProfileOpen(false);
    onOpenFavorites?.();
  };

  const handleAddClick = () => {
    setProfileOpen(false);
    onAddMovie?.();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Logo />
        <div className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <span key={link} className={styles.navItem}>{link}</span>
          ))}
          {onOpenFavorites && (
            <button type="button" className={styles.navItemButton} onClick={handleFavoriteClick}>
              ❤️ Favorit
            </button>
          )}
          {onAddMovie && (
            <button type="button" className={styles.addButton} onClick={handleAddClick}>
              + Tambah Film
            </button>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <div
          className={styles.avatar}
          onClick={() => setProfileOpen((o) => !o)}
        >
          {user?.avatar ?? "M"}
        </div>

        {profileOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownItem}>👤 Ubah Profil</div>
            <div className={[styles.dropdownItem, styles.logout].join(" ")} onClick={handleLogout}>
              🚪 Keluar
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
