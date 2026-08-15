import styles from '../scss/navbar/navbar.module.css';
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link className={styles.link} href="/">Lumenery</Link>
            <Link className={styles.link} href="/ueber-uns">Über uns</Link>
            <Link className={styles.link} href="/leistungen">Leistungen</Link>
            <Link className={styles.link} href="/kontakt">Kontakt</Link>
        </nav>
    );
}
