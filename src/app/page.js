"use client"
import Image from 'next/image';
import styles from './page.module.css';
import List from '../../public/list-icon.png';
import dummyData from './libs/dummyData.json';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Componenet that displays an user's app enrty.
 * @param {object} entry = object with properties: date, writer, message, and entryID
 */
const Interaction = ({entry}) => {
  return (
    <div className={styles.interactions}>
      <p className={styles.interactionDate}>{entry.date}</p>
      <p>{entry.message}</p>
      <p className={styles.writerName}>{entry.writer}</p>
      <h1/>
    </div>
  )
}

/**
 * First page the user sees that displays a list of past entries and a button to add another entry.
 * @returns 
 */
export default function Home() {
  const router = useRouter() // Routes a user to another page
  const [entries, setEntries] = useState([]); // App's state that holds an array of entries

  useEffect(() => {
    // Load either past enter actions or dummy data (testing)
    const loadPastInteractions = () => {
      let previousSavedData = localStorage.getItem("Elder-data");
      if(previousSavedData === null){
        setEntries(dummyData);
        localStorage.setItem("Elder-data", JSON.stringify(dummyData));
      } else {
        const parseData = JSON.parse(previousSavedData)
        setEntries(parseData);
      }
    }

    loadPastInteractions();
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <p className={styles.appTitle}>Keepin Up</p>
          <p className={styles.elderName}>TJ Smiley</p>
        </div>
        <div className={styles.entryContainer}>
          <button onClick={() => router.push("/createEntry")} className={styles.entryButton} type="button">
            <Image className={styles.entryButtonImageStyle} src={List} alt="list icon" ></Image>
            New Entry
            </button>
          <p className={styles.entryButtonMessage}>Add a new entry briefly describing your interaction with TJ Smiley</p>
        </div>
      </header>
      <main className={styles.main}>
        <p className={styles.contentTitle}>Previous Interactions</p>
        <section className={styles.content}>
          {            
            entries.map((interaction) => (              
              <Interaction key={interaction.entryID} entry={interaction} />
            )
          )}
        </section>
      </main>
    </div>
  )
}
