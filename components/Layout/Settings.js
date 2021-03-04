import Link from 'next/link'
import styles from '../../styles/Layout.module.css'
import {useContext} from 'react'
import {UserContext} from '../../src/UserContext'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react'

const SettingsMenu = ({signOut}) => {    
    return (<Dropdown className={styles.settingsIcon} >
        <Dropdown.Toggle as='a' bsPrefix='custom'>
            <img className='button' src={'/icons/settings.svg'}/>
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
            <Dropdown.Item href='/settings'>Edit Profile</Dropdown.Item>
            <Dropdown.Item href='/privacypolicy'>Privacy Policy</Dropdown.Item>
            <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>        
        </Dropdown.Menu>
    </Dropdown> 
    )
}

export default function Settings() {
    const { user, signIn, signOut } = useContext(UserContext)    

    return <div className={styles.settings}>
    <AuthenticatedTemplate>
        {user && <Link href={`/user/${user.username}`}><span className='button'> {user.username} </span></Link>}
        <SettingsMenu signOut={signOut}/>
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate><span className='button' onClick={signIn}> Sign In</span></UnauthenticatedTemplate>
    </div>   
}
