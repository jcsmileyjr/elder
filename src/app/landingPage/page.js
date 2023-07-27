"use client"
import styles from './landingPage.module.css';
import Link from 'next/link'

const LandingPage = () => {
    return(
        <div className={styles.page}>
            <header className={styles.header}>
            <div className={styles.navbar}>
                <h1 className={styles.appTitle}><Link href="/"></Link><span className={styles.appNamePrimary}> Keeping </span><span className={styles.appNameSecondary}> Up </span></h1>
            </div>
            </header>
            <main className={styles.main}>
                <p className={styles.CTAMessage}>We care for the Beloved</p>
                <div className={styles.phoneNumberContainer}>
                    <label htmlFor="phoneNumber" className={styles.label}>Phone Number of the Beloved</label>
                    <input type="tel" id="phoneNumber" className={styles.inputfield}></input>
                    <button onClick={() => router.push("/")} className={styles.entryButton} type="button">
                        Load
                    </button>
                </div>

                <p className={styles.emotionalMessage}>Taking care of our elders is a privilage and a way to stay conneccted. It's an opportunity to capture memories of their legacy. </p>
            </main>
        </div>
    )
}

export default LandingPage;