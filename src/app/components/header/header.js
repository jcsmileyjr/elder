"use client"
import styles from './header.module.css';
import Link from 'next/link';
import Head from 'next/head';

const Header = ({elderName="Broken Account", children}) => {
    return(
        <header className={styles.header}>
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
          <div className={styles.navbar}>
            {elderName !== "Broken Account" &&
              <>
                <p className={styles.appTitle}><Link className={styles.link} href="/viewEntries"><span className={styles.appNamePrimary}> Keeping </span><span className={styles.appNameSecondary}> Up </span></Link></p>
                <p className={styles.elderName}>{elderName}</p>              
              </>
            }

            {elderName === "Broken Account" &&
              <h1 className={styles.appTitle}><Link className={styles.link} href="/"><span className={styles.appNamePrimary}> Keeping </span><span className={styles.appNameSecondary}> Up </span></Link></h1>
            }
          </div>
          {children}
        </header>
    )
}

export default Header;