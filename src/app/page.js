"use client"
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import OldCouple1 from "./elderly-couple-1.png";

const Home = () => {
  const router = useRouter() // Routes a user to another page
    return(
        <div className={styles.page}>
            <header className={styles.header}>
            <div className={styles.navbar}>
                <h1 className={styles.appTitle}><span className={styles.appNamePrimary}> Keeping </span><span className={styles.appNameSecondary}> Up </span></h1>
            </div>
            </header>
            <main className={styles.main}>
                <div className={styles.logos}>
                  <Image src={OldCouple1} width={250} height={150} alt="Smiley Face with hearts" />
                </div>
                <div className={styles.phoneNumberContainer}>
                    <label htmlFor="phoneNumber" className={styles.label}>Phone Number of the Beloved</label>
                    <input type="tel" id="phoneNumber" className={styles.inputfield}></input>
                    <button onClick={() => router.push("/viewEntries")} className={styles.entryButton} type="button">
                        Load
                    </button>
                </div>
                <p className={styles.emotionalMessage}>Taking care of our elders is a privilage and a way to stay conneccted. It's an opportunity to capture memories of their legacy. </p>
            </main>
        </div>
    )
}

export default Home;
