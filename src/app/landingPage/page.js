"use client"
import styles from './landingPage.module.css';

const LandingPage = () => {
    return(
        <div className={styles.page}>
            <header className={styles.header}>
            <div className={styles.navbar}>
                <h1 className={styles.appTitle}><span className={styles.appNamePrimary}> Keeping </span><span className={styles.appNameSecondary}> Up </span></h1>
            </div>
            </header>
            <main className={styles.main}>
                <p>We care for the Beloved</p>
                <div>
                    <label for="phoneNumber">Phone Number of the Beloved</label>
                    <input type="tel" id="phoneNumber"></input>
                </div>

                <p>Taking care of our elders is a privilage and a way to stay conneccted. It's an opportunity to capture memories of their legacy. </p>
            </main>
        </div>
    )
}

export default LandingPage;