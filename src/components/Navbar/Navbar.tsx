import styles from "./Navbar.module.css";
import { ReactNode } from "react"; // ✅ Import ReactNode

type NavbarProps = {
  children: ReactNode;
};

function Navbar({ children }: NavbarProps): ReactNode {
  return (
    <header>
      <div className={styles.header}>
        <h3>FX rates</h3>
      </div>
      {children}
    </header>
  );
}

export default Navbar;
