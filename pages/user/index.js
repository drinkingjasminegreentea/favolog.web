import styles from '../../styles/CatalogStyles.module.css'
import CatalogCard from '../../components/CatalogCard'
import { useEffect, useState, useContext } from 'react'
import {UserContext} from '../../src/UserContext'
import ProfileInfo from '../../components/ProfileInfo'

export default function Page() {
  const { user } = useContext(UserContext)
  const [userProfile, setUserProfile] = useState()
  
  useEffect(() => {
    if (user){
      fetch(`http://localhost/favolog.service/api/user/${user.username}/profile`)
        .then(response => response.json())
        .then(data => setUserProfile(data))      
    }    
  }, [user])
  
  return <>
    {userProfile && <ProfileInfo user={userProfile.user}
      totalFollowing={userProfile.totalFollowing} totalFollowers={userProfile.totalFollowers}/> }
    <div className={styles.catalog}>
      {userProfile && userProfile.catalogs.map((catalog) => (
        <CatalogCard key={catalog.id} catalog={catalog}/>
      ))}
    </div>
  </>
}  

