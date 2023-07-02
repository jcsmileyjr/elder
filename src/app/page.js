import Image from 'next/image'
import styles from './page.module.css'
import List from '../../public/list-icon.png'

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <p>Keepin Up</p>
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
        <p>content</p>
      </main>
    </div>
  )
}
