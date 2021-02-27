import styles from '../../styles/CatalogStyles.module.css'
import CatalogCard from '../../components/CatalogCard'
import { useEffect, useState, useContext } from 'react'
import {UserContext} from '../../src/UserContext'
import ProfileInfo from '../../components/ProfileInfo'

export default function Page() {
  const { user } = useContext(UserContext)
  const [catalogs, setCatalogs] = useState([])
  
  useEffect(() => {
    if (user){
      fetch(`http://localhost/favolog.service/api/user/${user.username}/catalogs`)
        .then(response => response.json())
        .then(data => setCatalogs(data))      
    }    
  }, [user])

  return <>
    {user && <ProfileInfo user={user}/> }
    <div className={styles.catalog}>
      {catalogs && catalogs.map((catalog) => (
        <CatalogCard key={catalog.id} catalog={catalog}/>
      ))}
    </div>
  </>
}  

