"use client"
import styles from './accountCreation.module.css';
import Header from '../components/header/header';
import { useRouter } from 'next/navigation';
import { useState, useEffect} from 'react';
import { updateDatabase } from '../libs/updateDatabase';
import { ifDuplicatePhoneNumber } from '../libs/duplicatePhoneNumber';
import Image from 'next/image';
import PlusSign from '../plus-sign.png';

const AccountCreation = () => {
    const router = useRouter() //  Use to relocate user to another page

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [duplicateNumberError, setDuplicateNumberError] = useState(false);
    const [dailyTasks, setDailyTasks] = useState([]);
    const [currentDailyTasks, setCurrentDailyTasks] = useState("");
    const [weeklyTasks, setWeeklyTasks] = useState([]);
    const [currentWeeklyTasks, setCurrentWeeklyTasks] = useState("");
    const [monthlyTasks, setMonthlyTasks] = useState([]);
    const [currentMonthlyTasks, setCurrentMonthlyTasks] = useState("");


    // Creates a new elder account and relocate the user to the viewEntries page
    const createAccount = async () => {
        const newElder = {
            "elderName": name,
            "phoneNumber" : phoneNumber,
            "_type": "elder",
            "activities" : [],
            "essentialTasks" : [
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
        }

        // Check if the number is already use. If so, throw an error. If not, proceed to save in app state and the pretend database
        if (await ifDuplicatePhoneNumber(phoneNumber)) {
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
            <Header />
            <main className={styles.main}>
                <button type="button" className={`${styles.entryButton} ${styles.goBackButonSyle}`} onClick={() => router.push("/")}> Go back</button>
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
                            <p className={styles.informationText}>Used to log into the account.</p>
                            <p className={styles.informationText}>Numbers only.</p>                        
                        </>
                    }
                    {duplicateNumberError &&
                        <p className={`${styles.informationText} ${styles.errorMessage}`}>Number already used. Choose another</p>
                    }
                </div>
                <div className={styles.section}>
                    <h3 className={styles.tasksTitle}>Essential Tasks</h3>
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

export default AccountCreation;