"use client"
import styles from './createEntry.module.css';
import { useState} from 'react';
import { useRouter } from 'next/navigation'
import {v4 as uuidv4} from 'uuid'; // NPM module that creates a random ID number
import moment from 'moment'; // NPM module that converts date objects to strings
import Link from 'next/link'

/**
 * Page use to create an entry. When finished, the user is relocated to the main page
 * @returns 
 */
const CreateEntry = () => {
    const router = useRouter() //  Use to relocate user to another page

    const [newEntry, setNewEntry] = useState({}); // Object to be updated and added to the array of objects displayed on the main page
    const [showDoneButton, setShowDoneButton] = useState(false); // Boolean to display either the "Done" button or "Not Completed" button

    // Updates the date property of the user's new entry from a input field
    const updateDate = (e) => {
        newEntry.date = moment(e.target.value).format('MMMM Do YYYY');
        enableButton();
    }

    // Updates the message property of the user's new entry from the textbox field
    const updateMessage = (e) => {
        newEntry.message = e.target.value;
        enableButton();
    }

    // Updates the writer property of the user's new entry from a input field
    const updateWriter = (e) => {
        newEntry.writer = e.target.value;
        enableButton();
    }

    // Adds a random ID to the entryID property, saves the "entry" object to the database (array of entries), then relocate the user to the main page
    const saveInteraction = () => {
        newEntry.entryID = uuidv4();
        let previousSavedData = localStorage.getItem("Elder-data");
        let parseSavedData = JSON.parse(previousSavedData);
        parseSavedData.unshift(newEntry);
        localStorage.setItem("Elder-data", JSON.stringify(parseSavedData));
        router.push('/')
    }

    // Check if all require properties of the new entry object is fill before enableing the "Done" button
    const enableButton = () => {
        if(newEntry.date && newEntry.message && newEntry.writer){
            setShowDoneButton(true)
        }else {
            setShowDoneButton(false)
        }
    }

    return (
        <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.navbar}>
            <p className={styles.appTitle}><span className={styles.appNamePrimary}> Keeping </span><span className={styles.appNameSecondary}> Up </span></p>
            <p className={styles.elderName}>TJ Smiley</p>
          </div>
        </header>
        <main className={styles.main}>
            <p className={styles.title}>Create New Entry</p>
            <div className={styles.section}>
                <label for="inputDate" className={styles.label}>Date of newEntry</label>
                <input id="inputDate" type="date" className={styles.inputfield} onChange={(e) => updateDate(e)}></input>                
            </div>
            <div className={styles.section}>
                <label for="inputMessage" className={styles.label}>Brief description of newEntry</label>
                <textarea id="inputMessage" rows={10} className={styles.inputfield} onChange={(e) =>updateMessage(e)}></textarea>
            </div>
            <div className={styles.section}>
                <label for="inputWriter" className={styles.label}>Your Name</label>
                <input id="inputWriter" type="text" className={styles.inputfield} onChange={(e) =>updateWriter(e)}></input>
            </div>
            <div className={styles.section}>
                {showDoneButton &&
                    <div className={styles.doneButtonContainer}>
                        <button onClick={() => saveInteraction()} type="button" className={`${styles.entryButton} ${styles.doneButtonStyle}`}>DONE</button>
                        <label className={styles.doneLabel}>Click when Finished</label>
                    </div>
                }

                {!showDoneButton &&
                    <div className={styles.doneButtonContainer}>
                        <button type="button" className={styles.entryButton} onClick={() => router.push("/")}> Go back</button>
                        <p className={styles.noInfoMessage}>No information has been added. Must fill out the entire form to show the <span className={styles.noBreakWord}>"DONE" button.</span> </p>
                    </div>
                }
            </div>
        </main>
      </div>
    )
}

export default CreateEntry;