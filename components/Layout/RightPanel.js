import Link from 'next/link'
import { useMsal } from "@azure/msal-react";
import styles from '../../styles/RightPanel.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import Settings from './Settings'

const UsernameLink = ({name}) => {
    return <Link href='/user'><h3 className={commonStyles.button}> {name} </h3></Link> 
}

const LoggedInUser = ({account}) => {    
    const firstName = account.idTokenClaims.given_name

    return (
    <>
            {account && <UsernameLink name={firstName}/>} 
            <Settings/>
            <Link href="/catalog/add">
            <div role='button' 
                className={styles.addButton + " " + commonStyles.button}>
                <img src='/icons/add.png'/>
            </div>
            </Link>
    </>
    )
};

const AnonymousUser = () => {
    const { instance } = useMsal();
    return (
        <span className={commonStyles.button} 
        onClick={()=>{instance.loginPopup()}}>Sign In</span> 
    )
};

const RightPanel = () => {    
    const { accounts } = useMsal();
    const isAuthenticated = accounts.length > 0;    
    console.log("accounts",accounts[0])
    return (
        <div className={styles.rightBar}>
            {isAuthenticated ? <LoggedInUser account={accounts[0]}/> : <AnonymousUser/>}
        </div>
    )
  }
  
  export default RightPanel
  