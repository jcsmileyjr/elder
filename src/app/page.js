"use client"
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useState} from 'react';
import Image from 'next/image';
import OldCouple1 from "./elderly-couple-1.png";
import { getElder } from './libs/logIn';
import Header from "./components/header/header";

// Log in page
const Home = () => {
  const router = useRouter() // Routes a user to another page

  const [logInData, setLogInData] = useState(""); // App's state to save the phone number entered by the user
  const [logInError, setLogInError] = useState(false); // App's state to show/hide the error message

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

    return(
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <div className={styles.logos}>
                  <Image src={OldCouple1} width={250} height={150} alt="Elderly man and woman siting on a couch with floating hearts" />
                </div>
                <div className={`${styles.phoneNumberContainer} ${styles.entryButtonBorder}`}>
                    <label htmlFor="phoneNumber" className={styles.label}>Phone Number of the Beloved</label>
                    <input type="tel" id="phoneNumber" className={styles.inputfield} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength={"10"} required placeholder="Example: 9012223333" onChange={(e)=> setLogInData(e.target.value)} onInput={(e)=> e.target.value = e.target.value.replace(/[^0-9]/g, '')} ></input>
                    {!logInError && 
                      <p className={styles.numbersOnly}>Numbers Only </p>
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
