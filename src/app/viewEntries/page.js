"use client"
import styles from './viewEntries.module.css';
import dummyData from '../libs/dummyData.json';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const essentialTasks = [
  {
    "type":"Daily",
    "tasks":[
      "Medication: high blood pressure, gout, Prozac",
      "Meals: lactose intolerance, alcohol & excessive sugar inflames gout",
      "Feed and Water: dog food is on shelf in backyard shed"
    ]
  },
  {
    "type":"Weekly",
    "tasks":[
      "Yard clean up: lawn mower, weeding, flower bed, sweep porch",
      "Dishes",
      "Wash and Dry Clothes"
    ]
  },
  {
    "type":"Monthly",
    "tasks":[
      "Doctor visits",
      "Pharmacy visits: Walgreens on Shelby and Dodge Bullets street",
      "Sunday Church Service (keep her away from Sister Johnson, they fight)"
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
export default function ViewEntries() {
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

  console.log(essentialTasks);
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.navbar}>
        <p className={styles.appTitle}><Link className={styles.link} href="/"><span className={styles.appNamePrimary}> Keeping </span><span className={styles.appNameSecondary}> Up </span></Link></p>
          <p className={styles.elderName}>TJ Smiley</p>
        </div>
        {displayedContent === "interactions" &&
          <div className={styles.entryContainer}>
            <button onClick={() => router.push("/createEntry")} className={styles.entryButton} type="button">
              New Entry
            </button>
            <p className={styles.entryButtonMessage}>Add a new entry briefly describing your interaction with TJ Smiley</p>
          </div>
        }
      </header>
      <main className={styles.main}>
        <ul className={styles.contentTitleContainer}>
          <li className={`${styles.contentTitle} ${displayedContent=== 'interactions'? styles.highlight:''}`} onClick={() => {setDisplayedContent("interactions")}}>Previous <span className={styles.titleFormatting}>Interactions</span></li>
          <li className={`${styles.contentTitle} ${displayedContent=== 'essentials'? styles.highlight:''}`} onClick={() => {setDisplayedContent("essentials")}}>Essential <span className={styles.titleFormatting}>Tasks</span></li>
        </ul>
        <section className={styles.content}>
          {displayedContent === "interactions" &&            
            entries.map((interaction) => (              
              <Interaction key={interaction.entryID} entry={interaction} />
            )
          )}

          {displayedContent === "essentials" &&
            essentialTasks.map( (frequncy) => (
              <div className={styles.essentials}>
                <p className={styles.taskHeader}>{frequncy.type}</p>
                <ul>
                  {
                    frequncy.tasks.map((task) => (
                      <li className={styles.tasks}>{task}</li>
                    ))
                  }
                </ul>
              </div>
            ))            
          }
        </section>
      </main>
    </div>
  )
}
