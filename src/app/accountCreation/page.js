"use client"
import styles from './accountCreation.module.css';
import Header from '../components/header/header';
import { useRouter } from 'next/navigation';
import { useState, useEffect} from 'react';
import { updateDatabase } from '../libs/updateDatabase';
import { ifDuplicatePhoneNumber } from '../libs/duplicatePhoneNumber';

const AccountCreation = () => {
    const router = useRouter() //  Use to relocate user to another page

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [duplicateNumberError, setDuplicateNumberError] = useState(false);

    // Creates a new elder account and relocate the user to the viewEntries page
    const createAccount = () => {
        const newElder = {
            "elderName": name,
            "phoneNumber" : phoneNumber,
            "activities" : [],
            "essentialTasks" : []
        }

        // Check if the number is already use. If so, throw an error. If not, proceed to save in app state and the pretend database
        if (ifDuplicatePhoneNumber(phoneNumber)) {
            setDuplicateNumberError(true);
            setPhoneNumber("");
            return;
        } else {
            setDuplicateNumberError(false);
            localStorage.setItem("Elder-data", JSON.stringify(newElder)); // Save for current use in app
    
            // Get the pretend database (Elder-test-data), add the new account, and save it.
            updateDatabase(newElder);
    
            setName("");
            setPhoneNumber("");
            router.push('/viewEntries')
        }

    }

    // Disable the Done button if there isn't 10 numbers for the phone number and at least one for name
    const enabledDoneButton = () => {
        if(phoneNumber.length === 10 && name.length > 1){
            return false;
        } else {
            return true;
        }
    }

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <div className={styles.section}>
                    <label htmlFor='nameInput' className={styles.label}>Elder's name</label>
                    <input onChange={(e) => setName(e.target.value)} className={styles.inputfield} id='nameInput' type="text" />
                    <p className={styles.informationText}>Display's the elder's name at the top</p>
                </div>
                <div className={styles.section}>
                    <label htmlFor='phoneNumberInput' className={styles.label}>Elder's phone number</label>
                    <input value={phoneNumber} className={styles.inputfield} id='phoneNumberInput' type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength={"10"} required placeholder="Example: 9012223333" onChange={(e)=> setPhoneNumber(e.target.value)} onInput={(e)=> e.target.value = e.target.value.replace(/[^0-9]/g, '')} />
                    {!duplicateNumberError &&
                        <>
                            <p className={styles.informationText}>Used to load the account.</p>
                            <p className={styles.informationText}>Numbers only.</p>                        
                        </>
                    }
                    {duplicateNumberError &&
                        <p className={`${styles.informationText} ${styles.errorMessage}`}>Number already used. Choose another</p>
                    }
                </div>
                <div className={styles.doneButtonContainer}>
                    <button type="button" className={`${styles.entryButton} ${styles.goBackLink}`} onClick={() => router.push("/")}> Go back</button>
                    <button onClick={() => createAccount()} disabled={enabledDoneButton()} className={`${styles.entryButton} ${styles.doneButtonStyle}`} type='button'>Continue</button>
                </div>
            </main>
        </div>
    )
}

export default AccountCreation;