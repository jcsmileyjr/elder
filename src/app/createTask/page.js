"use client"
import styles from './createTask.module.css';
import Header from '../components/header/header';
import { useState, useEffect} from 'react';
import PlusSign from '../plus-sign.png';
import Image from 'next/image';

/**
 * TODO
 * Get data for name in the Header component - done
 * Setup useState/useEffect to get current essential tasks - done
 * Setup the UI to add an essential task
 * Copy and tweak from accountCreation ability to add a Daily, weekly, monthly essentail tasks with content. 
 * 
 * Documentation
 * @returns 
 */
const CreateTask = () => {
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
        setEntries(parseData);
        
        let previousDailyTasks = parseData.essentialTasks.find(grouping => grouping.type === "Daily")
        setDailyTasks([...dailyTasks, previousDailyTasks.tasks]);

        let previousWeeklyTasks = parseData.essentialTasks.find(grouping => grouping.type === "Weekly")
        setWeeklyTasks(previousWeeklyTasks.tasks);

        let previousMonthlyTasks = parseData.essentialTasks.find(grouping => grouping.type === "Monthly")
        setMonthlyTasks(previousMonthlyTasks.tasks);


        // let test1 = parseData.essentialTasks.find(grouping => {if(grouping.type === "Daily"){return grouping.tasks}})
        // setOldDailyTasks(test1.tasks) ;
        // let test2 = parseData.essentialTasks.find(grouping => grouping.type === "Weekly")
        // setOldWeeklyTasks(test2.tasks);
        // let test3 = parseData.essentialTasks.find(grouping => grouping.type === "Monthly")
        // setOldMonthlyTasks(test2.tasks);
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
        }
    }

        //Add text to a array of Essential weekly tasks
    const addWeeklyTask = () => {
        if(currentWeeklyTasks !== "") {
            setWeeklyTasks([...weeklyTasks, currentWeeklyTasks]);
            setCurrentWeeklyTasks("");
        }
    }

        //Add text to a array of Essential monthly tasks
    const addMonthlyTask = () => {
        if(currentMonthlyTasks !== "") {
            setMonthlyTasks([...monthlyTasks, currentMonthlyTasks]);
            setCurrentMonthlyTasks("");
        }
    }

    return (
        <div className={styles.page}>
            <Header elderName={entries.elderName} />
            <main className={styles.main}>                
                <div className={styles.section}>
                <h3 className={styles.tasksTitle}>Create Essential Tasks</h3>
                <p className={`${styles.informationText} ${styles.taskInformation} ${styles.firstReminder} ${styles.specialInstruction}`}>Write a reminder and then click the "Plus" icon to add it. <Image src={PlusSign}  width={15} height={15} alt="" /></p> 
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

                {/* {oldDailyTasks.length > 0 &&
                    <>
                        <ul>
                            {
                                oldDailyTasks.map((task, index) => (
                                    <li className={styles.taskStyles} key={index + 'olddailytask'}>{task}</li>
                                ))                        

                            }
                        </ul>
                    </>
                } */}
                <ul>
                    {dailyTasks.length > 0 &&                            
                        dailyTasks.map( (tasks, index) => (
                            <li className={styles.taskStyles} key={index + 'dailytask'}>{tasks}</li>
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
                <button onClick={() => createAccount()} disabled={enabledDoneButton()} className={`${styles.entryButton} ${styles.doneButtonStyle}`} type='button'>Continue</button>
            </div>                    
                
            </main>
        </div>
    )
}

export default CreateTask;