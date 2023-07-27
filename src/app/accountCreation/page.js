"use client"
import styles from './accountCreation.module.css';
import Header from '../components/header/header';
import { useRouter } from 'next/navigation'

const AccountCreation = () => {
    const router = useRouter() //  Use to relocate user to another page

    return (
        <div className={styles.page}>
            <Header />
            <main>
                <div className={styles.section}>
                    <label htmlFor='nameInput' className={styles.label}>Elder's name</label>
                    <input className={styles.inputfield} id='nameInput' type="text" />
                    <p className={styles.informationText}>Display's the elder's name at the top</p>
                </div>
                <div className={styles.section}>
                    <label htmlFor='phoneNumberInput' className={styles.label}>Elder's phone number</label>
                    <input className={styles.inputfield} id='phoneNumberInput' type="tel" />
                    <p className={styles.informationText}>Used to load the account.</p>
                </div>
                <div className={styles.doneButtonContainer}>
                    <button type="button" className={`${styles.entryButton} ${styles.goBackLink}`} onClick={() => router.push("/")}> Go back</button>
                    <button className={`${styles.entryButton} ${styles.doneButtonStyle}`} type='button'>Continue</button>
                </div>
            </main>
        </div>
    )
}

export default AccountCreation;