import Link from 'next/link'
import { useMsal } from "@azure/msal-react";
import styles from '../styles/RightPanel.module.css'
import commonStyles from '../styles/CommonStyles.module.css'

const LoggedInUser = () => {
    const { instance } = useMsal();
    return (
    <>
        <button onClick={()=>{instance.logout()}}>Sign Out</button>            
            <img src={'/icons/settings.svg'}></img>
            <Link href="/catalog-add">
            <div role='button' 
                className={styles.addButton + " " + commonStyles.button}>
                <span>+</span>
            </div>
            </Link>
    </>
    )
};

const AnonymousUser = () => {
    const { instance } = useMsal();
    return (
        <button onClick={()=>{instance.loginPopup()}}>Sign In</button> 
    )
};

const RightPanel = () => {    
    const { accounts } = useMsal();
    const isAuthenticated = accounts.length > 0;

    return (
        <div className={styles.rightBar}>
            {isAuthenticated ? <LoggedInUser/> : <AnonymousUser/>}
        </div>
    )
  }
  
  export default RightPanel
  