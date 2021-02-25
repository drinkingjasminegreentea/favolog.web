import { useMsal } from "@azure/msal-react"
import Dropdown from 'react-bootstrap/Dropdown'
import commonStyles from '../../styles/CommonStyles.module.css'

const Settings = () => {    
    const { instance } = useMsal();

    return (<Dropdown>
      <Dropdown.Toggle as='a' bsPrefix='custom'>
        <img className={commonStyles.button} src={'/icons/settings.svg'}/>
      </Dropdown.Toggle>
      
      <Dropdown.Menu>
        <Dropdown.Item href='/'>Edit Profile</Dropdown.Item>
        <Dropdown.Item onClick={()=>{instance.logout()}}>Sign out</Dropdown.Item>        
      </Dropdown.Menu>
    </Dropdown> 
    )
  }
  
  export default Settings
  