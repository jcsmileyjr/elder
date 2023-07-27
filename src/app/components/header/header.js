"use client"
import styles from './header.module.css';
import Link from 'next/link';


const Header = ({elderName="Broken Account", children}) => {
    return(
        <header className={styles.header}>
          <div className={styles.navbar}>
          <p className={styles.appTitle}><Link className={styles.link} href="/"><span className={styles.appNamePrimary}> Keeping </span><span className={styles.appNameSecondary}> Up </span></Link></p>
            <p className={styles.elderName}>{elderName}</p>
          </div>
          {children}
        </header>
    )
}

export default Header;