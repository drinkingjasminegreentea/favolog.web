import commonStyles from '../../styles/CommonStyles.module.css'
import styles from '../../styles/Settings.module.css'
import {useEffect, useState, useRef} from 'react'
import {Link} from 'next/link'
import { useMsal } from "@azure/msal-react";

const Settings = () => {    
    const { instance } = useMsal();
    const [showDropdown, setShowDropdown] = useState(false);
    // create a React ref for the dropdown element
    const dropdown = useRef(null);

    useEffect(() => {
        // only add the event listener when the dropdown is opened
        if (!showDropdown) return;
        function handleClick(event) {
          if (dropdown.current && !dropdown.current.contains(event.target)) {
            setShowDropdown(false);
          }
        }
        window.addEventListener("click", handleClick);
        // clean up
        return () => window.removeEventListener("click", handleClick);
      }, [showDropdown]);

    return (<div>
        <img className={commonStyles.button} 
         src={'/icons/settings.svg'}
         onClick={() => setShowDropdown(b => !b)}/>
        {showDropdown && <div ref={dropdown} className={styles.dropdownContent}>
            <div className={styles.menuItems}>         
                <span className={commonStyles.button} >Edit Profile</span>
                <span className={commonStyles.button} 
                    onClick={()=>{instance.logout()}}> Sign out</span>
            </div>
        </div>}
    </div>        
    )
  }
  
  export default Settings
  