"use client"
import Image from 'next/image';
import styles from './page.module.css';
import List from '../../public/list-icon.png';
import dummyData from './libs/dummyData.json';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';

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
console.log("here and now and then and when and back again and test")
export default function Home() {  
  const searchParams = useSearchParams();    // Get the params from other pages
  let newEntry = searchParams.get('text');    // Get the params from the createEntry page
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const isValidInteraction = (newEntry) => {
      if(newEntry === null ) return false;
      let entry = JSON.parse(newEntry) // Convert the string into an object
      let interactions;
      if(entries.length === 0){
        interactions = dummyData;
      } else {
        interactions = entries;
      }
      
      let match = true
      interactions.forEach((interaction) => {
        if(interaction.entryID === entry.entryID){
          match = false;
          return;
        }
      })
      return match
    }

    console.log(isValidInteraction(newEntry));

    if(newEntry !== "" && newEntry !== null && newEntry !== undefined && isValidInteraction){
      dummyData.unshift(JSON.parse(newEntry));
    }

    setEntries(dummyData);
  }, [])

  console.log(entries)
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <p className={styles.appTitle}>Keepin Up</p>
          <p className={styles.elderName}>TJ Smiley</p>
        </div>
        <div className={styles.entryContainer}>
          <button className={styles.entryButton} type="button">
            <Image className={styles.entryButtonImageStyle} src={List} alt="list icon" ></Image>
            <Link className={styles.buttonLink} href="/createEntry" prefetch={false}>New Entry</Link>
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
