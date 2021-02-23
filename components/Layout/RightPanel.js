import Link from 'next/link'
import { useMsal } from "@azure/msal-react";
import styles from '../../styles/RightPanel.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import Settings from './Settings'
import {useState} from 'react'
import AddCatalog from '../AddCatalog';

const UsernameLink = ({name}) => {
    return <Link href='/user'><h3 className={commonStyles.button}> {name} </h3></Link> 
}

const LoggedInUser = ({account}) => {    
    const firstName = account.idTokenClaims.given_name
    const [showModal, setShowModal] = useState(false);

    function toggleModalWindow(){
        setShowModal(!showModal)
      }
    
    return (
    <>
            {account && <UsernameLink name={firstName}/>} 
            <Settings/>            
            <div role='button' 
                className={styles.addButton + " " + commonStyles.button}
                onClick={toggleModalWindow}>
                <img src='/icons/add.png'/>
            </div>
            <AddCatalog show={showModal} parentAction={(toggleModalWindow)}/>
    </>
    )
};

const AnonymousUser = () => {
    const { instance } = useMsal();
    function login(){
        instance.loginPopup()
            .then(()=> {console.log('success')})
            .catch(()=>{console.log('error')})
    }

    return (
        <span className={commonStyles.button} 
        onClick={login}> Sign In</span> 
    )
};

const RightPanel = () => {    
    const { accounts } = useMsal();
    const isAuthenticated = accounts.length > 0;    
    
    return (
        <div className={styles.rightBar}>
            {isAuthenticated ? <LoggedInUser account={accounts[0]}/> : <AnonymousUser/>}
        </div>
    )
  }
  
  export default RightPanel
  