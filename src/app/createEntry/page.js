import styles from './createEntry.module.css';

const CreateEntry = () => {
    return (
        <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.navbar}>
            <p className={styles.appTitle}>Keepin Up</p>
            <p className={styles.elderName}>TJ Smiley</p>
          </div>
        </header>
        <main className={styles.main}>
            <p className={styles.title}>Create New Entry</p>
            <div className={styles.section}>
                <label className={styles.label}>Date of Interaction</label>
                <input type="date" className={styles.inputfield}></input>                
            </div>
            <div className={styles.section}>
                <label className={styles.label}>Brief description of interaction</label>
                <textarea rows={10} className={styles.inputfield}></textarea>
            </div>
            <div className={styles.section}>
                <label className={styles.label}>Your Name</label>
                <input type="text" className={styles.inputfield}></input>
            </div>
        </main>
      </div>
    )
}

export default CreateEntry;