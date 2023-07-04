import Image from 'next/image'
import styles from './page.module.css'
import List from '../../public/list-icon.png'

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
            <Image className={styles.entryButtonImageStyle} src={List} ></Image>
            New Entry
            </button>
          <p className={styles.entryButtonMessage}>Add a new entry briefly describing your interaction with TJ Smiley</p>
        </div>
      </header>
      <main className={styles.main}>
        <p className={styles.contentTitle}>Previous Interactions</p>
        <section>
          <div className={styles.interactions}>
            <p className={styles.interactionDate}>6/1/2023</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <p className={styles.writerName}>Abraham Lincoln</p>
            <h1/>
          </div>
        </section>
      </main>
    </div>
  )
}
