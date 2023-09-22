"use client"
import styles from './editEntry.module.css';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {v4 as uuidv4} from 'uuid'; // NPM module that creates a random ID number
import moment from 'moment'; // NPM module that converts date objects to strings
import Header from '../components/header/header';
import { updateDatabase} from '../libs/updateDatabase';

/**
 * Page use to create an entry. When finished, the user is relocated to the main page
 * @returns 
 */
const EditEntry = () => {
    const router = useRouter(); //  Use to relocate user to another page

    const [newEntry, setNewEntry] = useState({}); // Object to be updated and added to the array of objects displayed on the main page
    const [showDoneButton, setShowDoneButton] = useState(false); // Boolean to display either the "Done" button or "Not Completed" button
    const [entries, setEntries] = useState([]); // App's state that holds an array of entries (objects)
    const [activityToEdit, setActivityToEdit]  = useState({});
    const [message, setMessage] = useState("");
    const [writerName, setWriterName] = useState("");

    useEffect(() => {
        let previousSavedData = localStorage.getItem("Elder-data");
        const parseData = JSON.parse(previousSavedData)
        setEntries(parseData);

        let activityID = JSON.parse(localStorage.getItem("Elder-edit-entry"));
        let activityIndex = parseData.activities.findIndex((data) => {
            return data.entryID === activityID
        })

        setActivityToEdit(parseData.activities[activityIndex]);
        setMessage(parseData.activities[activityIndex].message);
        setWriterName(parseData.activities[activityIndex].writer);
    }, [])

    // Updates the date property of the user's new entry from a input field
    const updateDate = (e) => {
        newEntry.date = moment(e.target.value).format('MMMM DD YYYY');
        enableButton();
    }

    const updateLabel = (e = "Interaction") => {
        newEntry.label = e.target.value;
        enableButton();
    }

    // Updates the message property of the user's new entry from the textbox field
    const updateMessage = (e) => {
        setMessage(e.target.value);
        newEntry.message = e.target.value;

        const regexTest = new RegExp(/[a-zA-Z]/);
        if (regexTest.test(newEntry.message)) {
            enableButton();
        } else {
            setShowDoneButton(false)
        }
    }

    // Updates the writer property of the user's new entry from a input field
    const updateWriter = (e) => {
        setWriterName(e.target.value)
        newEntry.writer = e.target.value;
        enableButton();
    }

    // Save the user enter interation to the current elder object in localstorage
    const saveInteraction = () => {
        // new random ID
        const randomID = uuidv4();
        newEntry.entryID = randomID;
        newEntry._id = randomID;
        newEntry._type = "activities";
        newEntry.message = message;
        newEntry.writer = writerName;

        if(!newEntry.hasOwnProperty("label")){
            newEntry.label = "Interaction"
        }

        // Get the current elder info
        let previousSavedData = localStorage.getItem("Elder-data");
        let parseSavedData = JSON.parse(previousSavedData);

        // Add the interaction to the activities property (array) for the current elder
        parseSavedData.activities.unshift(newEntry);

        // Remove the old version of this activity
        let activityID = JSON.parse(localStorage.getItem("Elder-edit-entry"));
        let activityIndex = parseSavedData.activities.findIndex((data) => {
            return data.entryID === activityID
        })
        parseSavedData.activities.splice(activityIndex, 1);


        // Update the current elder information
        localStorage.setItem("Elder-data", JSON.stringify(parseSavedData));

        // Update the pretend database (Elder-test-data) with the now updated current elder
        updateDatabase(parseSavedData);
        router.push('/viewEntries')
    }

    // Check if all require properties of the new entry object is fill before enableing the "Done" button
    const enableButton = () => {
        if(newEntry.date){
            setShowDoneButton(true)
        }else {
            setShowDoneButton(false)
        }
    }


    return (
        <div className={styles.page}>
            <Header elderName={entries.elderName} />
            <main className={styles.main}>
                <button type="button" className={`${styles.entryButton} ${styles.goBackButonSyle} ${styles.goBackButtonFullWidth}`} onClick={() => router.push("/viewEntries")}> Go back</button>
                <p className={styles.title}>Edit Entry</p>
                <p className={`${styles.informationText}`}>Communicate to others "what you did today for/with your love one".</p>

                <div className={styles.section}>
                    <label htmlFor="inputDate" className={styles.label}>Date of new Entry</label>
                    <input id="inputDate" type="date" className={styles.inputfield} onChange={(e) => updateDate(e)} ></input>
                    <p className={`${styles.informationText}`}>Previous Date: {activityToEdit.date}</p>              
                </div>
                <div className={styles.section}>
                    <label htmlFor="inputLabel" className={styles.label}>Type of Entry</label>
                    <select id="inputLabel" className={styles.inputfield} onChange={(e) => updateLabel(e)}>
                        <option key="label1" selected={activityToEdit.label === "Interaction"}>Interaction</option>
                        <option key="label2" selected={activityToEdit.label === "Appointment"}>Appointment</option>
                        <option key="label3" selected={activityToEdit.label === "Medication"}>Medication</option>
                    </select>                
                </div>
                <div className={styles.section}>
                    <label htmlFor="inputMessage" className={styles.label}>Brief description of new Entry</label>
                    <textarea id="inputMessage" rows={10} className={styles.inputfield} value={message} onChange={(e) =>updateMessage(e)}></textarea>
                </div>
                <div className={styles.section}>
                    <label htmlFor="inputWriter" className={styles.label}>Your Name</label>
                    <input id="inputWriter" type="text" className={styles.inputfield} value={writerName} onChange={(e) =>updateWriter(e)}></input>
                </div>
                <div className={styles.section}>
                    {!showDoneButton &&
                        <div className={styles.backButtonContainer}>                            
                            <p className={styles.noInfoMessage}>No information has been added. Must fill out the entire form to show the <span className={styles.noBreakWord}><span className={styles.doneWord}>"DONE"</span> button.</span> </p>
                        </div>
                    }

                    {showDoneButton &&
                        <div className={styles.doneButtonContainer}>                            
                            <button onClick={() => saveInteraction()} type="button" className={`${styles.entryButton} ${styles.doneButtonStyle}`}>DONE</button>
                            <label className={styles.doneLabel}>Click <span className={styles.entrybuttonMessage}>DONE</span> when Finished</label>
                        </div>
                    }    
                </div>
            </main>
        </div>
    )
}

export default EditEntry;