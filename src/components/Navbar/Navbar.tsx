import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <h3 className={styles.title}>FX Rates</h3>
    </header>
  );
};

export default Navbar;
