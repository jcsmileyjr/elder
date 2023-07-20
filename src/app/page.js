"use client"
import styles from './page.module.css';
import dummyData from './libs/dummyData.json';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const essentialTasks = [
  {
    "type":"Daily",
    "tasks":[
      "Medication",
      "Meals",
      "Feed and Water Pets"
    ]
  },
  {
    "type":"Weekly",
    "tasks":[
      "Yard clean up",
      "Dishes",
      "Wash and Dry Clothes"
    ]
  },
  {
    "type":"Monthly",
    "tasks":[
      "Doctor visits",
      "Pharmacy visits",
      "Sunday Church Service"
    ]
  }
]

/**
 * Componenet that displays an user's app enrty.
 * @param {object} entry = entry object added by a user to describe the event
 * @param {string} entry.date = Date of the entry in a 'MMMM Do YYYY' format.
 * @param {string} entry.message = User's activity description of the event.
 * @param {string} entry.writter = Name of the user for the event.
 * @param {string} entry.entryID = random number assign to the event.
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
  const [entries, setEntries] = useState([]); // App's state that holds an array of entries (objects)
  const [displayedContent, setDisplayedContent] = useState("interactions");

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
        <p className={styles.appTitle}><span className={styles.appNamePrimary}> Keeping </span><span className={styles.appNameSecondary}> Up </span></p>
          <p className={styles.elderName}>TJ Smiley</p>
        </div>
        <div className={styles.entryContainer}>
          <button onClick={() => router.push("/createEntry")} className={styles.entryButton} type="button">
            New Entry
            </button>
          <p className={styles.entryButtonMessage}>Add a new entry briefly describing your interaction with TJ Smiley</p>
        </div>
      </header>
      <main className={styles.main}>
        <ul className={styles.contentTitleContainer}>
          <li className={`${styles.contentTitle}`} onClick={() => {alert("Yeah"); setDisplayedContent("interactions")}}>Previous <span className={styles.titleFormatting}>Interactions</span></li>
          <li className={`${styles.contentTitle}`} onClick={() => {alert("Woohooo"); setDisplayedContent("essentials")}}>Essential <span className={styles.titleFormatting}>Tasks</span></li>
        </ul>
        <section className={styles.content}>
          {displayedContent === "interactions" &&            
            entries.map((interaction) => (              
              <Interaction key={interaction.entryID} entry={interaction} />
            )
          )}

          {displayedContent === "essentials" &&
            <>Hello World</>
          }
        </section>
      </main>
    </div>
  )
}
