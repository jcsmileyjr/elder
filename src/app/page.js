import Image from 'next/image'
import styles from './page.module.css'
import List from '../../public/list-icon.png'
import dummyData from './libs/dummyData.json'

const Interaction = ({entry}) => {
  console.log(entry)
  return (
    <div className={styles.interactions}>
      <p className={styles.interactionDate}>{entry.date}</p>
      <p>{entry.message}</p>
      <p className={styles.writerName}>{entry.writer}</p>
      <h1/>
    </div>
  )
}

export default function Home() {
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
            New Entry
            </button>
          <p className={styles.entryButtonMessage}>Add a new entry briefly describing your interaction with TJ Smiley</p>
        </div>
      </header>
      <main className={styles.main}>
        <p className={styles.contentTitle}>Previous Interactions</p>
        <section>
          {            
            dummyData.map((interaction) => (              
              <Interaction entry={interaction} />
            )
          )}
        </section>
      </main>
    </div>
  )
}
