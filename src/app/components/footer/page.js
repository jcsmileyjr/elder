"use client"
import styles from './footer.module.css';
import { useRouter } from 'next/navigation';

const Footer = () => {
    const router = useRouter() // Routes a user to another page
    const logUserOff = () => {
        localStorage.removeItem("Elder-data");
        router.push("/");
    }
    return (
        <footer className={styles.footer}>
            <button type="button" className={`${styles.entryButton} ${styles.logOff}`} onClick={() => logUserOff()}> Log Off</button>
        </footer>
    )
}

export default Footer;