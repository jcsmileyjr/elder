"use client"
import styles from './viewEntries.module.css';
import Header from '../components/header/header';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment'; // NPM module that converts date objects to strings
import Footer from '../components/footer/page';
import Image from 'next/image';
import Plus from '../plus.png';
import Minus from '../minus.png';
import List from '../list-icon.png';
import Head from 'next/head';

/**
 * Componenet that displays an user's app enrty.
 * @param {object} entry = entry object added by a user to describe the event
 * @param {string} entry.date = Date of the entry in a 'MMMM Do YYYY' format.
 * @param {string} entry.message = User's activity description of the event.
 * @param {string} entry.writter = Name of the user for the event.
 * @param {string} entry.entryID = random number assign to the event.
*/
const Interaction = ({entry}) => {
  const router = useRouter() // Routes a user to another page
  
  const editEntry = (selected) => { 
    localStorage.setItem("Elder-edit-entry", JSON.stringify(selected.entryID));
    router.push("/editEntry");
  }

  return (
    <div className={styles.interactions}>
      <div className={`${styles.labelColumn} ${entry.label==='Interaction'? styles.interactionColor: entry.label === 'Appointment'? styles.appointmentColor : styles.medicationColor}`}>

      </div>
      <div className={styles.interactionContent}>
        <p className={styles.interactionDate}>{entry.date}</p>
        {entry.label === "Appointment" &&
          <p className={styles.labelText}>{entry.label}</p>
        }
        {entry.label === "Medication" &&
          <p className={styles.labelText}>{entry.label} Given</p>
        }
        <p>{entry.message}</p>
        <p className={styles.writerName}>{entry.writer}</p>
        <h1/>
      </div>
      <button type='button'className={styles.editButtonContainer} onClick={() => editEntry(entry)}>
        <Image className={styles.editIconStyle} src={List} width={20} height={20} alt="Edit entry button" />
        Edit
      </button>
    </div>
  )
}


/**
 * After a user's log in, displays a list of past entries/essential tasks and a button to add another entry. 
 */
export default function ViewEntries() {
  const router = useRouter() // Routes a user to another page
  const [entries, setEntries] = useState([]); // App's state that holds an array of entries (objects)
  const [activities, setActivities] = useState([]); // App's state that holds a sorted array of date strings
  const [displayedContent, setDisplayedContent] = useState("interactions"); // App's state to display either interactions or essential tasks
  const [essentialShowDaily, setEssentialShowDaily] = useState(true); // App's state to collaspe the essential daily tasks section
  const [essentialShowWeekly, setEssentialShowWeekly] = useState(false); // App's state to collaspe the essential weekly tasks section
  const [essentialShowMonthly, setEssentialShowMonthly] = useState(false); // App's state to collaspe the essential monthly tasks section
  const [essentialShowMedication, setEssentialShowMedication] = useState(true); // App's state to collaspe the essential task's Medication section

  useEffect(() => {
    // Load either the log in account's data or route the user back to the logIn screen
    const loadPastInteractions = () => {
      let previousSavedData = localStorage.getItem("Elder-data");
      if(previousSavedData === null){
        router.push("/")
      } else {
        const parseData = JSON.parse(previousSavedData)
        setEntries(parseData);
        setActivities(sortEntriesByDate(parseData.activities)); 
console.log(parseData)          
      }
    }

    loadPastInteractions();
  }, [])

  /**
   * Function to sort the activities data by date
   * @param {array of date strings} unsorted data
   * @returns array of date strings sorted data
   */
  const sortEntriesByDate = (unsortedData) => {
    let sortedData = unsortedData.sort((a, b) => {
      return moment(b.date, 'MMMM DD YYYY') - moment(a.date, 'MMMM DD YYYY');
    })
    return sortedData
  }

  /**
   * Set true or false if an Essenial frequncy section should be collapse
   * @param {string} frequncy : Either daily, weekly, monnthly
   */
  const collapseEssentialTaskFrequency = (frequncy) => {
    if(frequncy === "Daily") setEssentialShowDaily(!essentialShowDaily);
    if(frequncy === "Weekly") setEssentialShowWeekly(!essentialShowWeekly);
    if(frequncy === "Monthly") setEssentialShowMonthly(!essentialShowMonthly);
    if(frequncy === "Medication") setEssentialShowMedication(!essentialShowMedication);
  }

  /**
   * Either hides or shows an Essenial frequncy section and icon
   * @param {string} frequncy : Either daily, weekly, monnthly
   * @returns true/false
   */
  const isCollapse = (frequncy) => {
    if(frequncy === "Daily") return essentialShowDaily;
    if(frequncy === "Weekly") return essentialShowWeekly;
    if(frequncy === "Monthly") return essentialShowMonthly;
    if(frequncy === "Medication") return essentialShowMedication;
  }

  /**
   * 
   * @param {boolean} showHide : True or False  
   * @returns Returns an Image of a show or minus icon to represent a possbile collaspe section of the UI
   */
  const CollaspeIcon = ({showHide}) => {
    if(showHide){
      return (
        <span className={styles.expand}>Click to Hide <Image className={styles.cheveonStyle} src={Minus} width={15} height={15} alt="test" /></span>
        )
      }else {
        return (
          <span className={styles.expand}>Click to Expand<Image className={styles.cheveonStyle} src={Plus} width={15} height={15} alt="test" /></span>
      )
    }
  }

  return (
    <div className={styles.page}>
      <Head>
        <meta name="application-name" content="Keeping Up" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Keeping Up" />
        <meta name="description" content="An app that allows multiple people to contribute to the care of a loved one." />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#1CB5E0" />

        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        <meta name="twitter:card" content="An app that allows multiple people to contribute to the care of a loved one." />
        <meta name="twitter:url" content="https://elder-two.vercel.app/" />
        <meta name="twitter:title" content="Keeping Up" />
        <meta name="twitter:description" content="An app that allows multiple people to contribute to the care of a loved one." />
        <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@JCSmiley4" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Keeping UP" />
        <meta property="og:description" content="An app that allows multiple people to contribute to the care of a loved one." />
        <meta property="og:site_name" content="Keeping Up" />
        <meta property="og:url" content="https://elder-two.vercel.app/" />
        <meta property="og:image" content="https://elder-two.vercel.app/icons/apple-touch-icon.png" />
      </Head>      
      <Header elderName={entries.elderName}>
        {displayedContent === "interactions" &&
          <div className={styles.entryContainer}>
            <button onClick={() => router.push("/createEntry")} className={styles.entryButton} type="button">
              New Entry
            </button>
            <p className={styles.entryButtonMessage}>Add a new entry briefly describing your interaction with {entries.elderName}</p>
          </div>
        }
        {displayedContent === "essentials" &&
          <div className={styles.entryContainer}>
            <button onClick={() => router.push("/createTask")} className={`${styles.entryButton} ${displayedContent=== 'essentials' && styles.essentialTasksButtonStyle}`} type="button">
              New Essenial Task
            </button>
            <p className={styles.entryButtonMessage}>Add a new essential task to help everyone be on the same page in taking care of {entries.elderName}</p>
          </div>
        }        
      </Header>
      <main className={styles.main}>
        <ul className={styles.contentTitleContainer}>
          <li className={`${styles.contentTitle} ${displayedContent=== 'interactions'? styles.highlight:''}`} onClick={() => {setDisplayedContent("interactions")}}>Previous <span className={styles.titleFormatting}>Interactions</span></li>
          <li className={`${styles.contentTitle} ${displayedContent=== 'essentials'? styles.highlight:''}`} onClick={() => {setDisplayedContent("essentials")}}>Essential <span className={styles.titleFormatting}>Tasks</span></li>
        </ul>
        <section className={styles.content}>
          {entries === undefined &&
            <h1>Loading</h1>
          }

          {displayedContent === "interactions" && activities.length === 0 && 
            <div className={styles.blnkFormContainer}>
              <p className={styles.blankFormHeader}>Start caring for your love one</p>
              <p className={styles.blankFormStyle}><span className={styles.blankFormHighlightedWord}>Step 1:</span> Click on the words <span className={styles.blankFormHighlightedText}>"Essential Tasks"</span> to learn about anything important to do or know right now!</p>
              <p className={styles.blankFormStyle}><span className={styles.blankFormHighlightedWord}>Step 2:</span> Click on the words <span className={styles.blankFormHighlightedText}>"New Entry"</span> to share & document with others your interaction with the loved one.</p>
              <p className={styles.blankFormStyle}>Examples are: you gave a specific medication, y'all went to the park, you cleaned their home, you share a future doctor appointment, etc.</p>
            </div>
          }

          {displayedContent === "interactions" &&       
            activities.map((interaction) => (              
              <Interaction key={interaction.entryID} entry={interaction} />
            )
          )}

          {displayedContent === "essentials" &&            
            entries.essentialTasks.map( (frequncy, index) =>
             (
              <div key={index} className={styles.essentials}>
                <p className={styles.taskHeader} onClick={() => collapseEssentialTaskFrequency(frequncy.type)}>
                  {frequncy.type} 
                  <span className={styles.expand}><CollaspeIcon showHide={isCollapse(frequncy.type)} /></span>
                   
                  </p>
                {isCollapse(frequncy.type) &&
                  <ul>
                    {
                      frequncy.tasks.map((task, index) => (
                        <li key={index}  className={styles.tasks}>{task}</li>
                      ))
                    }
                  </ul>
                }
              </div>
            ))            
          }

          {displayedContent === "essentials" &&
            <div className={styles.essentials}>
                <p className={`${styles.medsHeader}`} onClick={() => collapseEssentialTaskFrequency("Medication")}>
                  {"Medication"} 
                  <span className={styles.expand}><CollaspeIcon showHide={isCollapse("Medication")} /></span>
                   
                </p>
                {isCollapse("Medication") &&                                        
                    entries.medications.map((med, index) => (
                      <>
                        <div className={` ${styles.mobileMedicationDisplay}`} key={'med' + index}>
                          <p className={styles.meds}><span className={styles.medTitle}>Medication Name:</span> {med.medicationName}</p>
                          <p className={styles.medsNote}><span className={styles.medTitle}>Medication Refill Date: </span><span className={styles.nowrap}>{med.medicationRefillDate}</span> </p>
                        </div>
                        <p className={styles.medsNote}><span className={styles.medTitle}>Notes:</span> {med.medicationNote}</p>
                        <h1 className={styles.medBorder}/>
                      </>
                    ))
                  
                }
            </div>
          }
        </section>
      </main>
      <Footer />
    </div>
  )
}
