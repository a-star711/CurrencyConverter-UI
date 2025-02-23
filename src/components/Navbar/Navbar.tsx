import styles from "./Navbar.module.css";
import { ReactNode } from "react"; // ✅ Import ReactNode

type NavbarProps = {
  children: ReactNode;
};

function Navbar({ children }: NavbarProps): ReactNode {
  return (
    <div className="navbar-container">
      <header className={styles.header}>FX rates</header>
      {children}
    </div>
  );
}

export default Navbar;
