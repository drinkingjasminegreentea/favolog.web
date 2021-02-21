import Link from 'next/link'
import { useMsal } from "@azure/msal-react";
import styles from '../styles/LeftPanel.module.css'
import commonStyles from '../styles/CommonStyles.module.css'

const LeftPanel = () => {    
    const { accounts } = useMsal();
    const isAuthenticated = accounts.length > 0;

    return (
        <div className={styles.sideBar}>
        <div className={styles.logo}>
            <Link href="/">
            <h1 className={commonStyles.button}>
                Favolog
            </h1>                  
            </Link>            
        </div>
        {isAuthenticated && <div className={styles.profileInfo}>
                <img src={'/images/profile.jpg'} ></img>
                <h1>{accounts[0].idTokenClaims.given_name}</h1>
                <p>Inventor</p>            
            </div>
        }        
    </div>
    )
  }
  
  export default LeftPanel
  