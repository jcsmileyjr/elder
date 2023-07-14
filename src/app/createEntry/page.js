"use client"
import styles from './createEntry.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import Link from 'next/link'

const CreateEntry = () => {
    const router = useRouter()

    const [newEntry, setNewEntry] = useState({});
    const [showDoneButton, setShowDoneButton] = useState(false);
    const [newID, setNewID] = useState(200);

    useEffect(() => {
        setShowDoneButton(false)
    }, [])


    const updateDate = (e) => {
        newEntry.date = moment(e.target.value).format('MMMM Do YYYY');
        enableButton();
    }

    const updateMessage = (e) => {
        newEntry.message = e.target.value;
        enableButton();
    }

    const updateWriter = (e) => {
        newEntry.writer = e.target.value;
        enableButton();
    }

    const saveInteraction = () => {
        newEntry.entryID = uuidv4();
        let previousSavedData = localStorage.getItem("Elder-data");
        let parseSavedData = JSON.parse(previousSavedData);
        parseSavedData.unshift(newEntry);
        localStorage.setItem("Elder-data", JSON.stringify(parseSavedData));
        router.push('/')
    }

    const enableButton = () => {
        if(newEntry.date && newEntry.message && newEntry.writer){
            newEntry.entryID = newID
            setNewEntry(newEntry)
            setNewID(newID + 1);
            setShowDoneButton(true)
        }else {
            setShowDoneButton(false)
        }
    }

    return (
        <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.navbar}>
            <p className={styles.appTitle}>Keepin Up</p>
            <p className={styles.elderName}>TJ Smiley</p>
          </div>
        </header>
        <main className={styles.main}>
            <p className={styles.title}>Create New Entry</p>
            <div className={styles.section}>
                <label className={styles.label}>Date of newEntry</label>
                <input type="date" className={styles.inputfield} onChange={(e) => updateDate(e)}></input>                
            </div>
            <div className={styles.section}>
                <label className={styles.label}>Brief description of newEntry</label>
                <textarea rows={10} className={styles.inputfield} onChange={(e) =>updateMessage(e)}></textarea>
            </div>
            <div className={styles.section}>
                <label className={styles.label}>Your Name</label>
                <input type="text" className={styles.inputfield} onChange={(e) =>updateWriter(e)}></input>
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
                        <button type="button" className={styles.entryButton}> <Link className={styles.buttonLink} href={"/"}>Go back</Link></button>
                        <p className={styles.noInfoMessage}>No information has been added. Must fill out the entire form to show the <span className={styles.noBreakWord}>"DONE" button.</span> </p>
                    </div>
                }
            </div>
        </main>
      </div>
    )
}

export default CreateEntry;