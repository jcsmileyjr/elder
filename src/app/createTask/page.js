"use client"
import styles from './createTask.module.css';
import Header from '../components/header/header';
import { useState, useEffect} from 'react';

/**
 * TODO
 * Get data for name in the Header component - done
 * Setup useState/useEffect to get current essential tasks
 * Setup the UI to add an essential task
 * Copy and tweak from accountCreation ability to add a Daily, weekly, monthly essentail tasks with content. 
 * 
 * Documentation
 * @returns 
 */
const CreateTask = () => {
    const [entries, setEntries] = useState([]) // Get the current loved one data

    useEffect(() => {
        let previousSavedData = localStorage.getItem("Elder-data");
        const parseData = JSON.parse(previousSavedData)
        setEntries(parseData);
    }, [])

    return (
        <div className={styles.page}>
            <Header elderName={entries.elderName} />
            <main className={styles.main}>
                <h1>Hello world</h1>
            </main>
        </div>
    )
}

export default CreateTask;