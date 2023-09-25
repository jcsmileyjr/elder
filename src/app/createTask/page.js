"use client"
import styles from './createTask.module.css';
import Header from '../components/header/header';
import PlusSign from '../plus-sign.png';
import Image from 'next/image';
import { useState, useEffect} from 'react';
import { updateDatabase} from '../libs/updateDatabase';
import { useRouter } from 'next/navigation'
import {v4 as uuidv4} from 'uuid'; // NPM module that creates a random ID number
import moment from 'moment'; // NPM module that converts date objects to strings

/**
 * App functionality to update an account's essential tasks
 * @returns 
 */
const CreateTask = () => {
    const router = useRouter() //  Use to relocate user to another page

    const [entries, setEntries] = useState([]) // Get the current loved one data
    const [dailyTasks, setDailyTasks] = useState([]); // Array of daily tasks
    const [currentDailyTasks, setCurrentDailyTasks] = useState(""); // UI content enter by the author for daily tasks
    const [weeklyTasks, setWeeklyTasks] = useState([]); // Array of weekly tasks
    const [currentWeeklyTasks, setCurrentWeeklyTasks] = useState(""); // UI content enter by the author for weekly tasks
    const [monthlyTasks, setMonthlyTasks] = useState([]); // Array of monthly tasks
    const [currentMonthlyTasks, setCurrentMonthlyTasks] = useState(""); // UI content enter by the author for monthly tasks
    const [medications, setMedications] = useState([]);
    const [currentMedicationName, setCurrentMedicationName]  = useState("");
    const [currentMedicationNote, setCurrentMedicationNote]  = useState("");
    const [currentMedicationRefillDate, setCurrentMedicationRefillDate]  = useState("");
    const [isNewTasks, setIsNewTasks] = useState(false);
    const [isNewMed, setIsNewMed] = useState(false);
    
    useEffect(() => {
        // Get the current elder data
        let previousSavedData = localStorage.getItem("Elder-data");
        const parseData = JSON.parse(previousSavedData)
        setEntries(parseData); // Need this to get the name of the care one
        
        // Loads the current elder's previous tasks to be viewable by the author
        let previousDailyTasks = parseData.essentialTasks.find(grouping => grouping.type === "Daily")
        setDailyTasks(previousDailyTasks.tasks);

        let previousWeeklyTasks = parseData.essentialTasks.find(grouping => grouping.type === "Weekly")
        setWeeklyTasks(previousWeeklyTasks.tasks);

        let previousMonthlyTasks = parseData.essentialTasks.find(grouping => grouping.type === "Monthly")
        setMonthlyTasks(previousMonthlyTasks.tasks);

        setMedications(parseData.medications);
    }, [])

    //Add a new task to a array of Essential daily tasks
    const addDailyTask = () => {
        if(currentDailyTasks !== "") {
            setDailyTasks([...dailyTasks, currentDailyTasks]);
            setCurrentDailyTasks("");
            setIsNewTasks(true);
        }
    }

    //Add a new task to a array of Essential weekly tasks
    const addWeeklyTask = () => {
        if(currentWeeklyTasks !== "") {
            setWeeklyTasks([...weeklyTasks, currentWeeklyTasks]);
            setCurrentWeeklyTasks("");
            setIsNewTasks(true);
        }
    }

    //Add a new task to a array of Essential monthly tasks
    const addMonthlyTask = () => {
        if(currentMonthlyTasks !== "") {
            setMonthlyTasks([...monthlyTasks, currentMonthlyTasks]);
            setCurrentMonthlyTasks("");
            setIsNewTasks(true);
        }
    }

    // Add a new medication object to an array of Essential Medication tasks
    const addMedication = () => {
        const medicationID = uuidv4();
        if(currentMedicationName !== "" && currentMedicationNote !== "" && currentMedicationRefillDate !== "") {
            let medication = {
                medicationName : currentMedicationName,
                medicationNote : currentMedicationNote,
                medicationRefillDate : currentMedicationRefillDate,
                _key : medicationID,
            }                      
            setMedications([...medications, medication])
            setIsNewMed(true);
        }
    }

    // Updates the date property of the medication refill date
    const updateDate = (e) => {
        let date = moment(e.target.value).format('MMMM DD YYYY');
        setCurrentMedicationRefillDate(date);
    }    

    // Assign the elder a new array of tasks objects
    const updateTasks = () => {        
        if(isNewTasks === false) {
            // Move author to previous screen without updating the database
            router.push('/viewEntries');
            return;
        } else {
            // Get the current elder info
            let previousSavedData = localStorage.getItem("Elder-data");
            let parseSavedData = JSON.parse(previousSavedData);
    
            // Create a new array of essential tasks objects and add to the current elder data
            const dailyTaskID = uuidv4();
            const weeklyTaskID = uuidv4();
            const monthlyTaskID = uuidv4();
            let newEssentialTasksArray = [
                {
                    "type":"Daily",
                    "_type": "essentialTasks",
                    "tasks": dailyTasks,
                    "_key":  dailyTaskID,
                },
                {
                    "type":"Weekly",
                    "_type": "essentialTasks",
                    "tasks": weeklyTasks,
                    "_key":  weeklyTaskID,
                },
                {
                    "type":"Monthly",
                    "_type": "essentialTasks",
                    "tasks": monthlyTasks,
                    "_key":  monthlyTaskID,
                }
            ]
    
            parseSavedData.essentialTasks = newEssentialTasksArray;

            if(isNewMed) {
                parseSavedData.medications = medications;
            }
    
            // Update the current elder information within local storeage for direct app useage
            localStorage.setItem("Elder-data", JSON.stringify(parseSavedData));
    
            // Update the database with the now updated current elder
            updateDatabase(parseSavedData);
            router.push('/viewEntries');
            setIsNewTasks(false);
        }        
    }

    return (
        <div className={styles.page}>
            <Header elderName={entries.elderName} />
            <main className={styles.main}>                
                <div className={styles.section}>
                <h3 className={styles.tasksTitle}>Create Essential Tasks</h3>
                <p className={`${styles.informationText} ${styles.taskInformation} ${styles.firstReminder} ${styles.specialInstruction}`}>Write a recurring task and then click the "Plus" icon to add it. <Image src={PlusSign}  width={15} height={15} alt="" /></p> 
                <p className={`${styles.informationText} ${styles.taskInformation} ${styles.firstReminder}`}>Create reminders for others to use as a guide when visiting the beloved.</p>
                <p className={`${styles.informationText} ${styles.taskInformation} `}>Keeping it short and to the point is always better.</p>

                {/* Daily Essential Tasks */}
                <h4 className={styles.tasksTime}>Daily</h4>
                <div className={styles.inputContainer}>
                    <button className={styles.buttonImage} onClick={() => addDailyTask() }>
                        <Image src={PlusSign}  width={30} height={30} alt="Plus icon to add text" />
                    </button>
                    <textarea type="text" value={currentDailyTasks} onChange={(e) => setCurrentDailyTasks(e.target.value)} className={`${styles.inputfield} ${styles.taskInputs}`} />
                </div>
                {currentDailyTasks.length > 0 &&
                        <p className={styles.plusSignError}>Click the "Plus Sign" to add the task</p>
                    }
                <ul>
                    {dailyTasks.length > 0 &&                            
                        dailyTasks.map( (tasks, index) => (
                            <li className={styles.taskStyles} key={index + 'dailytask'}><span className={styles.label}>Task:</span> {tasks}</li>
                        ))
                    }
                </ul>

                {/* Weekly Essential Tasks */}
                <h4 className={styles.tasksTime}>Weekly</h4>
                <div className={styles.inputContainer}>
                    <button className={styles.buttonImage} onClick={() => addWeeklyTask() }>
                        <Image src={PlusSign}  width={30} height={30} alt="Plus icon to add text" />
                    </button>
                    <textarea type="text" value={currentWeeklyTasks} onChange={(e) => setCurrentWeeklyTasks(e.target.value)} className={`${styles.inputfield} ${styles.taskInputs}`} />
                </div>
                {currentWeeklyTasks.length > 0 &&
                        <p className={styles.plusSignError}>Click the "Plus Sign" to add the task</p>
                }
                <ul>
                    {weeklyTasks.length > 0 &&                            
                        weeklyTasks.map( (tasks, index) => (
                            <li className={styles.taskStyles} key={index + 'weeklytask'}><span className={styles.label}>Task:</span> {tasks}</li>
                        ))
                    }
                </ul>

                {/* Monthly Essential Tasks */}
                <h4 className={styles.tasksTime}>Monthly</h4>
                <div className={styles.inputContainer}>
                    <button className={styles.buttonImage} onClick={() => addMonthlyTask() }>
                        <Image src={PlusSign}  width={30} height={30} alt="Plus icon to add text" />
                    </button>
                    <textarea type="text" value={currentMonthlyTasks} onChange={(e) => setCurrentMonthlyTasks(e.target.value)} className={`${styles.inputfield} ${styles.taskInputs}`} />
                </div>
                {currentMonthlyTasks.length > 0 &&
                        <p className={styles.plusSignError}>Click the "Plus Sign" to add the task</p>
                }
                <ul>
                    {monthlyTasks.length > 0 &&                            
                        monthlyTasks.map( (tasks, index) => (
                            <li className={styles.taskStyles} key={index + 'monthlytask'}><span className={styles.label}>Task:</span> {tasks}</li>
                        ))
                    }
                </ul>

                {/* Medication Essential Tasks */}
                <h4 className={styles.tasksTime}>Medication</h4>
                <div className={styles.inputContainer}>
                    <button className={styles.buttonImage} onClick={() => addMedication() }>
                        <Image src={PlusSign}  width={30} height={30} alt="Plus icon to add text" />
                    </button>
                    <div className={styles.medicationContainer}>
                        <>
                            <label htmlFor="medicationName" className={styles.label}>Name of Medication <span className={styles.redAsterisk}>*</span></label>
                            <input type="text" id="medicationName" value={currentMedicationName} onChange={(e) => setCurrentMedicationName(e.target.value)} className={`${styles.inputfield} ${styles.taskInputs}`} />
                        </>
                        <>
                            <label htmlFor="refillDate" className={styles.label}>Refill Date</label>
                            <input id="refillDate" type="date" className={styles.inputfield} onChange={(e) => updateDate(e)}></input>                             
                        </>
                        <>
                            <label htmlFor="medicationNotes" className={styles.label}>Notes <span className={styles.redAsterisk}>*</span></label>
                            <textarea id="medicationNotes" type="text" value={currentMedicationNote} onChange={(e) => setCurrentMedicationNote(e.target.value)} className={`${styles.inputfield} ${styles.taskInputs}`} />
                        </>
                    
                    </div>
                </div> 
                {currentMedicationName.length > 0 && currentMedicationNote.length > 0 &&
                        <p className={styles.plusSignError}>Click the "Plus Sign" to add the task</p>
                }
                <ul>
                    {medications.length > 0 &&                            
                        medications.map( (med, index) => (
                            <li className={styles.taskStyles} key={index + 'medtask'}><span className={styles.medTitle}>Medication Name </span> {med.medicationName}</li>
                        ))
                    }
                </ul>                 
            </div>

            {/* Continue Button */}
            <div className={styles.doneButtonContainer}>
                <button onClick={() => updateTasks()} className={`${styles.entryButton} ${styles.doneButtonStyle}`} type='button'>Done</button>
            </div>                    
                
            </main>
        </div>
    )
}

export default CreateTask;