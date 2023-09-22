"use client"
import styles from './createTask.module.css';
import Header from '../components/header/header';
import { useState, useEffect} from 'react';
import { updateDatabase} from '../libs/updateDatabase';
import { useRouter } from 'next/navigation'
import PlusSign from '../plus-sign.png';
import Image from 'next/image';

/**
 * TODO
 * Get data for name in the Header component - done
 * Setup useState/useEffect to get current essential tasks - done
 * Setup the UI to add an essential task - done
 * Copy and tweak from accountCreation ability to add a Daily, weekly, monthly essentail tasks with content. - done
 * Find a way to update the database with the old and new content
 * 
 * Documentation: remove unused information, console.logs, add comments, etc.
 * @returns 
 */
const CreateTask = () => {
    const router = useRouter() //  Use to relocate user to another page

    const [entries, setEntries] = useState([]) // Get the current loved one data
    const [essentialTasks, setessentialTasks] = useState([]) // Current essential tasks for the love one
    const [dailyTasks, setDailyTasks] = useState([]);
    const [currentDailyTasks, setCurrentDailyTasks] = useState("");
    const [weeklyTasks, setWeeklyTasks] = useState([]);
    const [currentWeeklyTasks, setCurrentWeeklyTasks] = useState("");
    const [monthlyTasks, setMonthlyTasks] = useState([]);
    const [currentMonthlyTasks, setCurrentMonthlyTasks] = useState("");
    const [oldDailyTasks, setOldDailyTasks] = useState([])
    const [oldWeeklyTasks, setOldWeeklyTasks] = useState([])
    const [oldMonthlyTasks, setOldMonthlyTasks] = useState([])
    
    useEffect(() => {
        let previousSavedData = localStorage.getItem("Elder-data");
        const parseData = JSON.parse(previousSavedData)
        setEntries(parseData); // Need this to get the name of the care one
        
        let previousDailyTasks = parseData.essentialTasks.find(grouping => grouping.type === "Daily")
        //setDailyTasks([...dailyTasks, previousDailyTasks.tasks]);
        setDailyTasks(previousDailyTasks.tasks);

        let previousWeeklyTasks = parseData.essentialTasks.find(grouping => grouping.type === "Weekly")
        setWeeklyTasks(previousWeeklyTasks.tasks);

        let previousMonthlyTasks = parseData.essentialTasks.find(grouping => grouping.type === "Monthly")
        setMonthlyTasks(previousMonthlyTasks.tasks);
    }, [])

    // Disable the Done button if there isn't 10 numbers for the phone number and at least one for name
    const enabledDoneButton = () => {
        //console.log("works")
    }

    //Add text to a array of Essential daily tasks
    const addDailyTask = () => {
        if(currentDailyTasks !== "") {
            setDailyTasks([...dailyTasks, currentDailyTasks]);
            setCurrentDailyTasks("");
            console.log(dailyTasks);
        }
    }

        //Add text to a array of Essential weekly tasks
    const addWeeklyTask = () => {
        if(currentWeeklyTasks !== "") {
            setWeeklyTasks([...weeklyTasks, currentWeeklyTasks]);
            setCurrentWeeklyTasks("");
            console.log(weeklyTasks);
        }
    }

        //Add text to a array of Essential monthly tasks
    const addMonthlyTask = () => {
        if(currentMonthlyTasks !== "") {
            setMonthlyTasks([...monthlyTasks, currentMonthlyTasks]);
            setCurrentMonthlyTasks("");
            console.log(monthlyTasks);
        }
    }

    /**
     * TODO
     * Get the current elder
     * Create an array of tasks
     * Update the elder essenetial tasks
     * Save the elder
     * Move back to viewEntries page
     * 
     * Assign the elder a new array of tasks objects
     */
    const updateTasks = () => {
        // Get the current elder info
        let previousSavedData = localStorage.getItem("Elder-data");
        let parseSavedData = JSON.parse(previousSavedData);

        // let newEssentialTasksArray = [];
        // newEssentialTasksArray.push(dailyTasks);
        // newEssentialTasksArray.push(weeklyTasks);
        // newEssentialTasksArray.push(monthlyTasks);

        let newEssentialTasksArray = [
            {
                "type":"Daily",
                "_type": "essentialTasks",
                "tasks": dailyTasks,
            },
            {
                "type":"Weekly",
                "_type": "essentialTasks",
                "tasks": weeklyTasks,
            },
            {
                "type":"Monthly",
                "_type": "essentialTasks",
                "tasks": monthlyTasks,
            }
        ]

        parseSavedData.essentialTasks = newEssentialTasksArray;

        console.log(newEssentialTasksArray);

        // Update the current elder information
        localStorage.setItem("Elder-data", JSON.stringify(parseSavedData));

        // Update the pretend database (Elder-test-data) with the now updated current elder
        updateDatabase(parseSavedData);
        router.push('/viewEntries')
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

                <ul>
                    {dailyTasks.length > 0 &&                            
                        dailyTasks.map( (tasks, index) => (
                            <li className={styles.taskStyles} key={index + 'dailytask'}>Task: {tasks}</li>
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

                <ul>
                    {weeklyTasks.length > 0 &&                            
                        weeklyTasks.map( (tasks, index) => (
                            <li className={styles.taskStyles} key={index + 'weeklytask'}>{tasks}</li>
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

                <ul>
                    {monthlyTasks.length > 0 &&                            
                        monthlyTasks.map( (tasks, index) => (
                            <li className={styles.taskStyles} key={index + 'monthlytask'}>{tasks}</li>
                        ))
                    }
                </ul>
            </div>
            <div className={styles.doneButtonContainer}>
                <button onClick={() => updateTasks()} disabled={enabledDoneButton()} className={`${styles.entryButton} ${styles.doneButtonStyle}`} type='button'>Continue</button>
            </div>                    
                
            </main>
        </div>
    )
}

export default CreateTask;