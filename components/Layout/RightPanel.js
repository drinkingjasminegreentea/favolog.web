import Link from 'next/link'
import { useMsal } from "@azure/msal-react";
import styles from '../../styles/RightPanel.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'

const UsernameLink = ({name}) => {
    return <Link href='/user'><h3 className={commonStyles.button}> {name} </h3></Link> 
}

const LoggedInUser = ({account}) => {    

    return (
    <>
            {account && <UsernameLink name={account.name}/>} 
            <img className={commonStyles.button}  src={'/icons/settings.svg'}/>
            <Link href="/catalog/add">
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
    console.log("accounts",accounts[0])
    return (
        <div className={styles.rightBar}>
            {isAuthenticated ? <LoggedInUser account={accounts[0]}/> : <AnonymousUser/>}
        </div>
    )
  }
  
  export default RightPanel
  