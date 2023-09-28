"use client"
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useState} from 'react';
import Image from 'next/image';
import OldCouple1 from "./elderly-couple-1.png";
import { getElder } from './libs/logIn';
import Header from "./components/header/header";
import Head from 'next/head';

// Log in page
const Home = () => {
  const router = useRouter() // Routes a user to another page

  const [logInData, setLogInData] = useState(""); // App's state to save the phone number entered by the user
  const [logInError, setLogInError] = useState(false); // App's state to show/hide the error message
  const [insufficientNumbers, setInsufficientNumbers] = useState(true);

  /**
   * When the "Load" button is press, check if the entered phone number is registered to an account. If found, 
   * then route user to the viewEntries screen. If not found, display error message.
   */
  const logIn = async () => {
    if(await getElder(logInData)) {
      setLogInError(false);
      setLogInData("");
      router.push("/viewEntries")
    } else {
      setLogInError(true);
    }
  }

  /**
   * Function to check the number of digits inputted by the user.
   * @param {number} e  - value inputted by the user in the input field
   */
  const checkSufficientNumbers = (e) => {
    if(e.target.value.length === 10){
      setInsufficientNumbers(false);
    }else {
      setInsufficientNumbers(true);
      setLogInError(false);
    }
  }

    return(
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
              <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />
            </Head>
            <Header />
            <main className={styles.main}>
                <div className={styles.logos}>
                  <Image src={OldCouple1} width={250} height={150} alt="Elderly man and woman siting on a couch with floating hearts" />
                </div>
                <div className={`${styles.phoneNumberContainer} ${styles.entryButtonBorder}`}>
                    <label htmlFor="phoneNumber" className={styles.label}>Phone Number of the Beloved</label>
                    <input type="tel" id="phoneNumber" className={styles.inputfield} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength={"10"} required placeholder="Example: 9012223333" onChange={(e)=> {setLogInData(e.target.value); checkSufficientNumbers(e)}} onInput={(e)=> e.target.value = e.target.value.replace(/[^0-9]/g, '')} ></input>
                    {!logInError && 
                      <p className={`${styles.numbersOnly} ${styles.correct}`}>Numbers Only </p>
                    }

                    {!logInError && 
                      <p className={`${styles.numbersOnly} ${insufficientNumbers ? styles.error:styles.correct}`}>{insufficientNumbers ? "Must have 10 digits" : "Correct number of digits"}</p>
                    }

                    {logInError && 
                      <p className={`${styles.numbersOnly} ${logInError ? styles.logInError:''}`}>No account Found</p>
                    }
                    <button aria-disabled={logInData.length < 10} disabled={logInData.length < 10} onClick={() => logIn()} className={` ${styles.entryButton} ${logInData === "" ? styles.disableButton : ''} `} type="button">
                        Log In
                    </button>
                    <p className={styles.loginInstructions}>Log into an existing account</p>
                </div>
                <button className={styles.accountButton} type="button" onClick={() => router.push("/accountCreation")}>Elder Account Setup</button>
                <p className={styles.emotionalMessage}>Taking care of our elders is a <b>privilege</b> and a way to stay <b>connected</b>. It's an opportunity to capture memories of their legacy. </p>
            </main>
        </div>
    )
}

export default Home;
