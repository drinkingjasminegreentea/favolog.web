import Link from 'next/link'
import styles from '../../styles/RightPanel.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import {useState, useContext} from 'react'
import AddCatalog from '../AddCatalog'
import {UserContext} from '../../src/UserContext'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'

const SettingsMenu = () => {    
    const { signOut } = useContext(UserContext)

    return (<Dropdown className={styles.settingsIcon} >
        <Dropdown.Toggle as='a' bsPrefix='custom'>
            <img className={commonStyles.button} src={'/icons/settings.svg'}/>
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
            <Dropdown.Item href='/settings'>Edit Profile</Dropdown.Item>
            <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>        
        </Dropdown.Menu>
    </Dropdown> 
    )
}

const LoggedInUser = ({user}) => {    
    const [showModal, setShowModal] = useState(false);

    function toggleModalWindow(){
        setShowModal(!showModal)
    }

    return (
    <>
        <div>
            <Link href='/user'><span className={commonStyles.button}> {user.username} </span></Link>
            <SettingsMenu/>                        
        </div>
        <div role='button' 
            className={styles.addButton + " " + commonStyles.button}
            onClick={toggleModalWindow}>
            <img src='/icons/add.png'/>
        </div>
        <AddCatalog show={showModal} parentAction={(toggleModalWindow)}/>
    </>
    )
}

const AnonymousUser = () => {
    const { signIn } = useContext(UserContext)
    
    return (
        <span className={commonStyles.button} 
        onClick={signIn}> Sign In</span> 
    )
}

const RightPanel = () => {    
    const { user } = useContext(UserContext)    
    const isAuthenticated = user !== null && user !== undefined

    return (
        <div className={styles.rightBar}>
            {isAuthenticated ? <LoggedInUser user={user}/> : <AnonymousUser/>}
        </div>
    )
  }
  
  export default RightPanel
  